# Integration Guide: Sentry.io + Galileo.ai

## Overview

This guide explains how to integrate **Sentry.io** (error monitoring) and **Galileo.ai** (LLM observability) into your Autonomous UX Experimentation Platform.

---

## 🚨 Sentry.io Integration

### What is Sentry?
**Sentry** is an error monitoring and performance tracking platform that provides:
- Real-time error tracking
- Performance monitoring (APM)
- Release tracking
- User context and breadcrumbs
- Alerts and notifications

### Why Integrate Sentry Into This Project?

Your project has multiple failure points:
1. **Daytona sandbox creation** - Can timeout or fail
2. **Browser automation** - Can crash or get stuck
3. **Claude Code agents** - Can fail to implement changes
4. **AI API calls** - Can fail or return invalid responses
5. **Background jobs (Inngest)** - Long-running, can fail at any step

**Sentry helps you:**
- Track all failures with full context
- Monitor job performance and duration
- Get alerted when experiments fail
- Debug issues with stack traces and breadcrumbs

---

## 📊 Sentry Integration Implementation

### Step 1: Install Sentry SDKs

```bash
# Backend (Bun/Node.js)
cd api
bun add @sentry/node @sentry/bun

# Frontend (Next.js)
cd web
npm install @sentry/nextjs
```

### Step 2: Backend Configuration

Create `api/src/lib/sentry.ts`:

```typescript
import * as Sentry from '@sentry/bun';
import { env } from './env';

export const initializeSentry = () => {
  Sentry.init({
    dsn: env.SENTRY_DSN,
    environment: env.NODE_ENV || 'development',
    
    // Set sample rate for performance monitoring
    tracesSampleRate: env.NODE_ENV === 'production' ? 0.1 : 1.0,
    
    // Track all experiments as releases
    release: `daytona-hack@${process.env.npm_package_version}`,
    
    // Add context about the system
    initialScope: {
      tags: {
        service: 'api',
        runtime: 'bun',
      },
    },

    // Ignore certain errors
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'Non-Error promise rejection captured',
    ],

    beforeSend(event, hint) {
      // Don't send errors in development unless explicitly enabled
      if (env.NODE_ENV === 'development' && !env.SENTRY_ENABLED) {
        return null;
      }
      return event;
    },
  });
};

// Helper to track experiment context
export const setExperimentContext = (experimentId: string, data: any) => {
  Sentry.setContext('experiment', {
    id: experimentId,
    ...data,
  });
};

// Helper to track variant context
export const setVariantContext = (variantId: string, data: any) => {
  Sentry.setContext('variant', {
    id: variantId,
    ...data,
  });
};
```

### Step 3: Update `api/src/index.ts`

```typescript
import { experimentRoutes } from '@/service/experiment/Experiment.service';
import { Elysia } from 'elysia';
import { logger } from '@bogeychan/elysia-logger';
import { inngestHandler } from '@/lib/inngest';
import cors from '@elysiajs/cors';
import { initializeSentry } from '@/lib/sentry';
import * as Sentry from '@sentry/bun';

// Initialize Sentry first
initializeSentry();

const port = 8000;

const app = new Elysia()
  .use(
    logger({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
    })
  )
  // Sentry error handling middleware
  .onError(({ error, code, set }) => {
    // Capture all errors in Sentry
    Sentry.captureException(error, {
      tags: {
        errorCode: code,
      },
    });

    console.error('Error:', error);
    
    set.status = 500;
    return {
      error: 'Internal Server Error',
      message: error.message,
    };
  })
  .get('/', () => 'Hello World')
  .use(
    cors({
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Origin',
      ],
      preflight: true,
    })
  )
  .get('/health', () => 'OK')
  .use(experimentRoutes)
  .use(inngestHandler)
  .listen(port, ({ hostname, port }) => {
    console.log(`🦊 API is running at ${hostname}:${port}`);
  });
```

### Step 4: Add Sentry to Experiment Service

Update `api/src/service/experiment/Experiment.service.ts`:

```typescript
import * as Sentry from '@sentry/bun';
import { setExperimentContext, setVariantContext } from '@/lib/sentry';

export abstract class ExperimentService {
  static WORK_DIR = 'workspace/commerce';

  static async initRepository(repoUrl: string, experimentId: Id<'experiment'>) {
    // Set experiment context for all subsequent errors
    setExperimentContext(experimentId, { repoUrl });

    // Start a Sentry transaction to track performance
    const transaction = Sentry.startTransaction({
      op: 'experiment.init',
      name: 'Initialize Repository',
      tags: {
        experimentId,
        repoUrl,
      },
    });

    try {
      let start = Date.now();
      let end = Date.now();

      // Track sandbox creation
      const sandboxSpan = transaction.startChild({
        op: 'daytona.create_sandbox',
        description: 'Create Daytona sandbox',
      });

      start = Date.now();
      
      let sandbox;
      let retries = 3;
      let lastError;
      
      for (let i = 0; i < retries; i++) {
        try {
          console.log(`Creating sandbox (attempt ${i + 1}/${retries})...`);
          sandbox = await daytona.create({
            language: 'typescript',
            public: true,
            envVars: {
              NODE_ENV: 'development',
            },
          });
          break;
        } catch (error) {
          lastError = error;
          console.error(`Sandbox creation attempt ${i + 1} failed:`, error.message);
          
          // Capture each retry failure
          Sentry.captureException(error, {
            tags: {
              attempt: i + 1,
              experimentId,
            },
            level: 'warning',
          });
          
          if (i < retries - 1) {
            const waitTime = (i + 1) * 5000;
            console.log(`Retrying in ${waitTime / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
          }
        }
      }
      
      if (!sandbox) {
        sandboxSpan.setStatus('failed');
        sandboxSpan.finish();
        transaction.finish();
        throw new Error(`Failed to create sandbox after ${retries} attempts. Last error: ${lastError?.message || 'Unknown'}`);
      }
      
      end = Date.now();
      sandboxSpan.setData('duration_ms', end - start);
      sandboxSpan.finish();
      console.log(`Time taken to create sandbox: ${end - start}ms`);

      // Track git clone
      const cloneSpan = transaction.startChild({
        op: 'git.clone',
        description: 'Clone repository',
      });

      start = Date.now();
      await sandbox.git.clone(repoUrl, ExperimentService.WORK_DIR);
      end = Date.now();
      
      cloneSpan.setData('duration_ms', end - start);
      cloneSpan.finish();
      console.log(`Time taken to clone repository: ${end - start}ms`);

      // Track dependency installation
      const installSpan = transaction.startChild({
        op: 'npm.install',
        description: 'Install dependencies',
      });

      start = Date.now();
      await sandbox.process.executeCommand(
        `npm install`,
        ExperimentService.WORK_DIR
      );
      end = Date.now();
      
      installSpan.setData('duration_ms', end - start);
      installSpan.finish();
      console.log(`Time taken to install dependencies: ${end - start}ms`);

      // Track dev server start
      const serverSpan = transaction.startChild({
        op: 'server.start',
        description: 'Start dev server',
      });

      start = Date.now();
      const codeRunResult = await sandbox.process.executeCommand(
        `pm2 start npm --name "vite-dev-server" -- run dev`,
        ExperimentService.WORK_DIR
      );
      end = Date.now();
      
      serverSpan.setData('duration_ms', end - start);
      serverSpan.finish();
      console.log(`Time taken to execute npm run dev: ${end - start}ms`);

      await new Promise((resolve) => setTimeout(resolve, 3000));

      start = Date.now();
      const previewUrl = await sandbox.getPreviewLink(3000);
      end = Date.now();
      console.log(`Time taken to get preview link: ${end - start}ms`);

      // Create variant with context
      const newVariant: VariantEntity = {
        id: generateId('variant'),
        createdAt: new Date().toISOString(),
        experimentId: experimentId,
        daytonaSandboxId: sandbox.id,
        publicUrl: previewUrl.url,
        type: 'control',
        suggestion: null,
        analysis: null,
      };

      setVariantContext(newVariant.id, {
        type: 'control',
        sandboxId: sandbox.id,
        publicUrl: previewUrl.url,
      });

      await db.insert(variantsTable).values(newVariant);

      // Mark transaction as successful
      transaction.setStatus('ok');
      transaction.finish();

      return {
        sandbox: {
          ...sandbox,
          previewUrl: previewUrl.url,
        },
        variant: newVariant,
      };
    } catch (error) {
      // Capture the error with full context
      Sentry.captureException(error, {
        tags: {
          experimentId,
          operation: 'init_repository',
        },
      });

      transaction.setStatus('internal_error');
      transaction.finish();
      
      throw error;
    }
  }
}
```

### Step 5: Add Sentry to Inngest Jobs

Update `api/src/service/experiment/Experiment.jobs.ts`:

```typescript
import * as Sentry from '@sentry/bun';
import { setExperimentContext } from '@/lib/sentry';

export const runExperimentJob = inngestClient.createFunction(
  { id: 'run-experiment' },
  { event: EXPERIMENT_RUN_JOB_ID },
  async ({ event, step }) => {
    const { experiment, prTitle, prSummary, coderabbitSummary } = event.data as ExperimentRunJobData;

    // Set Sentry context for the entire job
    setExperimentContext(experiment.id, {
      repoUrl: experiment.repoUrl,
      goal: experiment.goal,
      prTitle,
    });

    // Track the entire job as a transaction
    const transaction = Sentry.startTransaction({
      op: 'inngest.job',
      name: 'Run Experiment Job',
      tags: {
        experimentId: experiment.id,
        jobType: 'experiment',
      },
    });

    try {
      // Step 1: Initialize repository
      const sandboxResult = await step.run('init-repo', async () => {
        try {
          console.log(
            `Creating sandbox for experiment ${experiment.id} with repo ${experiment.repoUrl}`
          );

          return await ExperimentService.initRepository(
            experiment.repoUrl,
            experiment.id
          );
        } catch (error) {
          Sentry.captureException(error, {
            tags: {
              step: 'init-repo',
              experimentId: experiment.id,
            },
          });
          throw error;
        }
      });

      console.log(`✅ Repository initialized. Dev server running at: ${sandboxResult.variant.publicUrl}`);

      // Step 2: Spawn browser agent
      const browserAgentResult = await step.run(
        'spawn-browser-agent',
        async () => {
          try {
            console.log(`🌐 Spawning browser agent to test new features`);

            let features: string[] = [];
            if (coderabbitSummary) {
              features = await AiService.extractFeaturesFromSummary(coderabbitSummary);
              console.log(`✨ Extracted features to test: ${features.join(', ')}`);
            }

            const taskPrompt = await AiService.generateBrowserTaskPrompt(
              prSummary || experiment.goal,
              sandboxResult.variant.publicUrl,
              features
            );
            console.log(`📝 Generated task prompt: ${taskPrompt}`);

            const browserTask = await BrowserService.createTask(
              taskPrompt,
              sandboxResult.variant.publicUrl
            );
            console.log(`📹 Browser task created: ${browserTask.id}`);

            return {
              taskId: browserTask.id,
            };
          } catch (error) {
            Sentry.captureException(error, {
              tags: {
                step: 'spawn-browser-agent',
                experimentId: experiment.id,
              },
            });
            throw error;
          }
        }
      );

      // ... rest of the steps with similar error tracking

      transaction.setStatus('ok');
      transaction.finish();

      console.log(`
🎉 DEVREL FLOW COMPLETE!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Sandbox: ${sandboxResult.variant.daytonaSandboxId}
✅ Live URL: ${sandboxResult.variant.publicUrl}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `);

      return {
        experimentId: experiment.id,
        sandboxId: sandboxResult.variant.daytonaSandboxId,
      };
    } catch (error) {
      transaction.setStatus('internal_error');
      transaction.finish();
      
      // Capture the job failure
      Sentry.captureException(error, {
        tags: {
          jobId: 'run-experiment',
          experimentId: experiment.id,
        },
      });
      
      throw error;
    }
  }
);
```

### Step 6: Frontend Integration (Next.js)

```bash
cd web
npx @sentry/wizard@latest -i nextjs
```

This wizard will:
1. Create `sentry.client.config.ts`
2. Create `sentry.server.config.ts`
3. Create `sentry.edge.config.ts`
4. Update `next.config.ts`

Update the generated configs with your DSN:

```typescript
// web/sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  
  // Track React component errors
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  
  // Session replay sample rate
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

### Step 7: Add Environment Variables

```env
# api/.env
SENTRY_DSN=https://your_key@o1234.ingest.sentry.io/5678
SENTRY_ENABLED=true

# web/.env.local
NEXT_PUBLIC_SENTRY_DSN=https://your_key@o1234.ingest.sentry.io/9012
```

---

## 🔬 Galileo.ai Integration

### What is Galileo?
**Galileo** (rungalileo.io) is an LLM observability and evaluation platform that provides:
- **LLM monitoring** - Track all AI model calls
- **Hallucination detection** - Identify when AI generates false information
- **Prompt evaluation** - A/B test different prompts
- **Cost tracking** - Monitor AI API costs
- **Quality metrics** - Evaluate response quality

### Why Integrate Galileo Into This Project?

Your project makes MANY AI calls:
1. **Feature extraction** from CodeRabbit summaries (Gemini)
2. **Browser task generation** (Gemini)
3. **Log analysis** (Gemini)
4. **Variant suggestions** (Gemini)
5. **Social media posts** (Gemini)
6. **Code implementation** (Claude Code)

**Galileo helps you:**
- Monitor all AI calls in one dashboard
- Detect when AI hallucinates or produces bad suggestions
- A/B test different prompts to improve quality
- Track AI costs per experiment
- Evaluate which AI model works best for each task

---

## 📊 Galileo Integration Implementation

### Step 1: Install Galileo SDK

```bash
cd api
bun add promptquality
```

### Step 2: Create Galileo Client

Create `api/src/lib/galileo.ts`:

```typescript
import { GalileoObserve } from 'promptquality';
import { env } from './env';

// Initialize Galileo
export const galileo = new GalileoObserve({
  projectName: 'daytona-ux-experiments',
  apiKey: env.GALILEO_API_KEY,
});

// Helper to create a workflow for an experiment
export const createExperimentWorkflow = (experimentId: string, goal: string) => {
  return galileo.createWorkflow({
    name: `experiment-${experimentId}`,
    metadata: {
      experimentId,
      goal,
      timestamp: new Date().toISOString(),
    },
  });
};

// Helper to track AI calls
export const trackAICall = async (
  workflow: any,
  stepName: string,
  model: string,
  prompt: string,
  response: string,
  metadata?: Record<string, any>
) => {
  return workflow.logStep({
    stepName,
    input: prompt,
    output: response,
    model,
    metadata: {
      ...metadata,
      timestamp: new Date().toISOString(),
    },
  });
};
```

### Step 3: Update AI Service

Update `api/src/service/ai/Ai.service.ts`:

```typescript
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { galileo, trackAICall } from '@/lib/galileo';

const model = google('gemini-2.0-flash-lite');

export abstract class AiService {
  /**
   * Extract key features from a CodeRabbit summary
   */
  static async extractFeaturesFromSummary(
    coderabbitSummary: string,
    workflow?: any
  ): Promise<string[]> {
    if (!coderabbitSummary || coderabbitSummary.length < 10) {
      return [];
    }

    const prompt = `You are analyzing a CodeRabbit PR summary to extract key features and changes that were made.

CodeRabbit Summary:
${coderabbitSummary}

Extract the main NEW FEATURES, significant UI/UX CHANGES, or IMPROVEMENTS mentioned in this summary.
...
Return ONLY valid JSON array of strings, no markdown or additional text.`;

    const { text } = await generateText({
      model,
      prompt,
    });

    // Track in Galileo
    if (workflow) {
      await trackAICall(
        workflow,
        'extract-features',
        'gemini-2.0-flash-lite',
        prompt,
        text,
        {
          summaryLength: coderabbitSummary.length,
        }
      );
    }

    try {
      const cleaned = text
        .trim()
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '');
      const features = JSON.parse(cleaned);
      
      // Log success to Galileo
      if (workflow) {
        await workflow.logMetric({
          name: 'features_extracted_count',
          value: Array.isArray(features) ? features.length : 0,
        });
      }
      
      return Array.isArray(features) ? features : [];
    } catch (e) {
      console.error('Failed to parse features from summary:', e);
      
      // Log parse failure to Galileo
      if (workflow) {
        await workflow.logMetric({
          name: 'parse_failure',
          value: 1,
          metadata: { error: e.message },
        });
      }
      
      return [];
    }
  }

  /**
   * Generate a browser automation task prompt
   */
  static async generateBrowserTaskPrompt(
    goal: string,
    url: string,
    features?: string[],
    workflow?: any
  ): Promise<string> {
    const featureFocus = features && features.length > 0 
      ? `\n\nImportant: Focus testing on these specific new features:\n${features.map(f => `- ${f}`).join('\n')}`
      : '';

    const prompt = `You are an AI assistant that helps create natural, exploratory browser automation tasks...
Given:
- Issue/Problem: ${goal}
- Website URL: ${url}${featureFocus}
...
Return ONLY the task description, no additional formatting or explanation.`;

    const { text } = await generateText({
      model,
      prompt,
    });

    // Track in Galileo
    if (workflow) {
      await trackAICall(
        workflow,
        'generate-browser-task',
        'gemini-2.0-flash-lite',
        prompt,
        text,
        {
          goal,
          url,
          featureCount: features?.length || 0,
        }
      );

      // Evaluate task quality (custom metric)
      const taskLength = text.trim().length;
      await workflow.logMetric({
        name: 'task_prompt_length',
        value: taskLength,
        metadata: {
          isValid: taskLength > 50 && taskLength < 1000,
        },
      });
    }

    return text.trim();
  }

  /**
   * Analyze browser agent logs
   */
  static async analyzeBrowserLogs(
    logs: string,
    goal: string,
    workflow?: any
  ): Promise<{
    success: boolean;
    summary: string;
    insights: string;
    issues: string;
  }> {
    const prompt = `You are analyzing browser automation logs...
Logs:
${logs}
...
Return ONLY valid JSON, no markdown formatting or additional text.`;

    const { text } = await generateText({
      model,
      prompt,
    });

    // Track in Galileo
    if (workflow) {
      await trackAICall(
        workflow,
        'analyze-browser-logs',
        'gemini-2.0-flash-lite',
        prompt,
        text,
        {
          goal,
          logsLength: logs.length,
        }
      );
    }

    const cleaned = text
      .trim()
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '');
    
    const result = JSON.parse(cleaned);

    // Track analysis metrics
    if (workflow) {
      await workflow.logMetric({
        name: 'browser_test_success',
        value: result.success ? 1 : 0,
      });
      
      // Detect potential hallucinations
      const hasSummary = result.summary && result.summary.length > 10;
      const hasInsights = result.insights && result.insights.length > 0;
      
      await workflow.logMetric({
        name: 'analysis_completeness',
        value: (hasSummary && hasInsights) ? 1 : 0,
      });
    }

    return result;
  }

  /**
   * Generate experiment variants
   */
  static async generateExperimentVariants(
    controlResults: {
      success: boolean;
      summary: string;
      insights: string;
    },
    goal: string,
    workflow?: any
  ): Promise<string[]> {
    const prompt = `You are analyzing results from a control variant test...
Original Issue: ${goal}
Control Variant Test Results:
- Success: ${controlResults.success}
- Summary: ${controlResults.summary}
- Key Insights: ${controlResults.insights}
...
Return ONLY valid JSON, no markdown formatting or additional text.`;

    const { text } = await generateText({
      model,
      prompt,
    });

    // Track in Galileo
    if (workflow) {
      await trackAICall(
        workflow,
        'generate-variants',
        'gemini-2.0-flash-lite',
        prompt,
        text,
        {
          goal,
          controlSuccess: controlResults.success,
        }
      );
    }

    const cleaned = text
      .trim()
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '');
    
    const variants = JSON.parse(cleaned);

    // Track variant generation metrics
    if (workflow) {
      await workflow.logMetric({
        name: 'variants_generated_count',
        value: Array.isArray(variants) ? variants.length : 0,
      });

      // Check variant quality
      const variantLengths = Array.isArray(variants) 
        ? variants.map(v => v.length) 
        : [];
      const avgLength = variantLengths.reduce((a, b) => a + b, 0) / variantLengths.length;
      
      await workflow.logMetric({
        name: 'variant_suggestion_avg_length',
        value: avgLength,
        metadata: {
          isQuality: avgLength > 30 && avgLength < 200, // Good suggestions are detailed but not verbose
        },
      });
    }

    return variants;
  }

  /**
   * Generate a social media post
   */
  static async generateSocialMediaPost(
    params: {
      title: string;
      summary: string;
      screenshots: Array<{ url: string; description: string }>;
    },
    workflow?: any
  ): Promise<{
    content: string;
    hashtags: string[];
    platform: 'twitter' | 'linkedin' | 'all';
  }> {
    const screenshotDescriptions = params.screenshots
      .map((s, i) => `Screenshot ${i + 1}: ${s.description}`)
      .join('\n');

    const prompt = `You are creating an engaging social media post...
Feature Title: ${params.title}
Feature Summary: ${params.summary}
Screenshots Available: ${params.screenshots.length} screenshots showing:
${screenshotDescriptions}
...
Return ONLY valid JSON, no markdown formatting.`;

    const { text } = await generateText({
      model,
      prompt,
    });

    // Track in Galileo
    if (workflow) {
      await trackAICall(
        workflow,
        'generate-social-post',
        'gemini-2.0-flash-lite',
        prompt,
        text,
        {
          title: params.title,
          screenshotCount: params.screenshots.length,
        }
      );
    }

    const cleaned = text
      .trim()
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '');
    
    const parsed = JSON.parse(cleaned);

    // Track post quality metrics
    if (workflow) {
      const twitterLength = parsed.twitter?.length || 0;
      const hashtagCount = parsed.hashtags?.length || 0;
      
      await workflow.logMetric({
        name: 'social_post_twitter_length',
        value: twitterLength,
        metadata: {
          isWithinLimit: twitterLength <= 280,
        },
      });
      
      await workflow.logMetric({
        name: 'social_post_hashtag_count',
        value: hashtagCount,
        metadata: {
          isOptimal: hashtagCount >= 3 && hashtagCount <= 7,
        },
      });
    }

    return {
      content: `${parsed.linkedin}\n\n${parsed.hashtags.join(' ')}`,
      hashtags: parsed.hashtags,
      platform: 'all',
    };
  }
}
```

### Step 4: Update Experiment Jobs to Use Galileo

Update `api/src/service/experiment/Experiment.jobs.ts`:

```typescript
import { createExperimentWorkflow } from '@/lib/galileo';

export const runExperimentJob = inngestClient.createFunction(
  { id: 'run-experiment' },
  { event: EXPERIMENT_RUN_JOB_ID },
  async ({ event, step }) => {
    const { experiment, prTitle, prSummary, coderabbitSummary } = event.data as ExperimentRunJobData;

    // Create Galileo workflow for this experiment
    const workflow = createExperimentWorkflow(experiment.id, experiment.goal);

    try {
      // ... init repository ...

      // Spawn browser agent with Galileo tracking
      const browserAgentResult = await step.run(
        'spawn-browser-agent',
        async () => {
          console.log(`🌐 Spawning browser agent to test new features`);

          let features: string[] = [];
          if (coderabbitSummary) {
            // Pass workflow to AI service for tracking
            features = await AiService.extractFeaturesFromSummary(
              coderabbitSummary,
              workflow
            );
            console.log(`✨ Extracted features to test: ${features.join(', ')}`);
          }

          // Track task generation
          const taskPrompt = await AiService.generateBrowserTaskPrompt(
            prSummary || experiment.goal,
            sandboxResult.variant.publicUrl,
            features,
            workflow
          );
          console.log(`📝 Generated task prompt: ${taskPrompt}`);

          const browserTask = await BrowserService.createTask(
            taskPrompt,
            sandboxResult.variant.publicUrl
          );
          console.log(`📹 Browser task created: ${browserTask.id}`);

          return {
            taskId: browserTask.id,
          };
        }
      );

      // ... collect screenshots ...

      // Generate social media post with tracking
      const postResult = await step.run('generate-social-post', async () => {
        console.log(`📝 Generating social media post...`);

        const post = await AiService.generateSocialMediaPost(
          {
            title: prTitle || 'New Feature Release',
            summary: coderabbitSummary || prSummary || experiment.goal,
            screenshots: screenshotsResult.screenshots,
          },
          workflow
        );

        console.log(`✅ Social media post generated`);
        return {
          post,
          screenshots: screenshotsResult.screenshots,
        };
      });

      // Mark workflow as complete
      await workflow.finish({
        status: 'success',
        metadata: {
          experimentId: experiment.id,
          variantsGenerated: postResult.screenshots.length,
        },
      });

      // ... rest of the job ...

      return {
        experimentId: experiment.id,
        sandboxId: sandboxResult.variant.daytonaSandboxId,
        screenshots: postResult.screenshots,
        socialPost: postResult.post,
      };
    } catch (error) {
      // Mark workflow as failed
      await workflow.finish({
        status: 'failed',
        error: error.message,
      });
      
      throw error;
    }
  }
);
```

### Step 5: Add Environment Variables

```env
# api/.env
GALILEO_API_KEY=your_galileo_api_key
```

### Step 6: Create Galileo Dashboard View

Create `web/src/components/experiment/GalileoMetricsCard.tsx`:

```typescript
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiLineChartLine, RiAlertLine } from "@remixicon/react";

interface GalileoMetricsProps {
  experimentId: string;
}

export function GalileoMetricsCard({ experimentId }: GalileoMetricsProps) {
  // In production, fetch these from Galileo API
  const metrics = {
    totalAICalls: 8,
    avgLatency: 1245, // ms
    hallucinations: 0,
    costUSD: 0.023,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RiLineChartLine size={20} />
          AI Quality Metrics (Galileo)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              AI Calls
            </p>
            <p className="text-2xl font-semibold">
              {metrics.totalAICalls}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Avg Latency
            </p>
            <p className="text-2xl font-semibold">
              {metrics.avgLatency}ms
            </p>
          </div>
          
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Hallucinations
            </p>
            <p className="text-2xl font-semibold flex items-center gap-1">
              {metrics.hallucinations}
              {metrics.hallucinations > 0 && (
                <RiAlertLine size={16} className="text-red-500" />
              )}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Cost
            </p>
            <p className="text-2xl font-semibold">
              ${metrics.costUSD.toFixed(3)}
            </p>
          </div>
        </div>
        
        <div className="mt-4">
          <a
            href={`https://console.rungalileo.io/projects/daytona-ux-experiments/workflows/experiment-${experimentId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            View detailed metrics in Galileo →
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
```

---

## 📊 Benefits Summary

### Sentry Benefits
- ✅ **Real-time error tracking** across all services
- ✅ **Performance monitoring** for slow operations
- ✅ **Breadcrumbs** showing events leading to errors
- ✅ **Release tracking** for each deployment
- ✅ **Alerts** when experiments fail
- ✅ **Stack traces** with source maps
- ✅ **User context** (which experiment failed)

### Galileo Benefits
- ✅ **LLM observability** - See all AI calls in one place
- ✅ **Hallucination detection** - Identify bad AI outputs
- ✅ **Prompt optimization** - A/B test different prompts
- ✅ **Cost tracking** - Monitor AI expenses per experiment
- ✅ **Quality metrics** - Evaluate AI response quality
- ✅ **Model comparison** - Compare Gemini vs Claude vs others

---

## 🎯 Monitoring Dashboard View

With both integrations, you get:

```
Experiment Dashboard:
├── Sentry Integration
│   ├── Error rate: 2.3% (↓ from 4.1%)
│   ├── Avg sandbox creation: 45s (↑ from 32s - alert!)
│   ├── Failed experiments today: 3
│   └── Most common error: "Daytona timeout"
│
└── Galileo Integration
    ├── AI calls per experiment: 8 avg
    ├── Hallucination rate: 0.5%
    ├── Cost per experiment: $0.023
    ├── Best performing prompt: "Browser Task v3"
    └── Model comparison:
        ├── Gemini Flash: $0.015, 1.2s latency
        └── Claude Sonnet: $0.045, 0.8s latency
```

---

## 🚀 Next Steps

1. **Set up Sentry account** at sentry.io
2. **Set up Galileo account** at rungalileo.io
3. **Add API keys** to environment variables
4. **Deploy the integration code**
5. **Run test experiments** to verify tracking
6. **Set up alerts** in Sentry for critical failures
7. **Create dashboards** in Galileo for prompt performance

---

## 📈 Success Metrics to Track

### With Sentry
- Experiment success rate
- Average sandbox creation time
- Browser agent failure rate
- Claude Code implementation success rate
- Time to detect and fix errors

### With Galileo
- AI call latency per model
- Hallucination detection rate
- Prompt quality scores
- Cost per successful experiment
- Model accuracy for each task type

---

**Result:** Complete observability across your entire autonomous UX experimentation platform! 🎉

