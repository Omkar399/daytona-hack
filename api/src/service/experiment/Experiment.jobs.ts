import { ExperimentEntity, experimentsTable } from '@/db/experiment.db';
import { inngestClient } from '@/lib/inngest-client';
import { ExperimentService } from '@/service/experiment/Experiment.service';
import { AiService } from '@/service/ai/Ai.service';
import { BrowserService } from '@/service/browser/Browser.service';
import { db } from '@/lib/client';
import { eq } from 'drizzle-orm';

export interface ExperimentRunJobData {
  experiment: ExperimentEntity;
  prTitle?: string;
  prSummary?: string;
  coderabbitSummary?: string;
}

const EXPERIMENT_RUN_JOB_ID = 'experiment/run';

export const runExperimentJob = inngestClient.createFunction(
  { id: 'run-experiment' },
  { event: EXPERIMENT_RUN_JOB_ID },
  async ({ event, step }) => {
    const { experiment, prTitle, prSummary, coderabbitSummary } = event.data as ExperimentRunJobData;

    //  init repository
    const sandboxResult = await step.run('init-repo', async () => {
      console.log(
        `Creating sandbox for experiment ${experiment.id} with repo ${experiment.repoUrl}`
      );

      return await ExperimentService.initRepository(
        experiment.repoUrl,
        experiment.id
      );
    });

    console.log(`✅ Repository initialized. Dev server running at: ${sandboxResult.variant.publicUrl}`);

    // Spawn browser agent to test and capture screenshots
    const browserAgentResult = await step.run(
      'spawn-browser-agent',
      async () => {
        console.log(
          `🌐 Spawning browser agent to test new features`
        );

        // Extract specific features from CodeRabbit summary
        let features: string[] = [];
        let testingSteps: string[] = [];
        
        if (coderabbitSummary) {
          // Step 1: Extract user-facing features
          features = await AiService.extractFeaturesFromSummary(coderabbitSummary);
          console.log(`✨ Extracted features to test:`);
          features.forEach(f => console.log(`   - ${f}`));
          
          // Step 2: Generate step-by-step testing instructions
          testingSteps = await AiService.generateTestingSteps(coderabbitSummary, features);
          if (testingSteps.length > 0) {
            console.log(`📋 Generated ${testingSteps.length} testing steps:`);
            testingSteps.forEach((s, i) => console.log(`   ${i + 1}. ${s}`));
          }
        }

        // Generate a task based on the PR summary, features, and testing steps
        const taskPrompt = await AiService.generateBrowserTaskPrompt(
          prSummary || experiment.goal,
          sandboxResult.variant.publicUrl,
          features,
          testingSteps
        );
        console.log(`📝 Generated task prompt:\n${taskPrompt}\n`);

        // Create and run browser task
        const browserTask = await BrowserService.createTask(
          taskPrompt,
          sandboxResult.variant.publicUrl
        );
        console.log(`📹 Browser task created: ${browserTask.id}`);

        return {
          taskId: browserTask.id,
          testingSteps,
        };
      }
    );

    // Wait for browser task to complete and collect screenshots
    const screenshotsResult = await step.run('collect-screenshots', async () => {
      console.log(`⏳ Waiting for browser task to complete...`);

      // Wait for task completion
      const completedTask = await BrowserService.waitForTaskCompletion(
        browserAgentResult.taskId,
        5 * 60 * 1000
      );
      console.log(`✅ Browser task completed with status: ${completedTask.status}`);
      console.log(`   Task result:`, JSON.stringify(completedTask, null, 2));

      // Get task steps which include screenshots
      const taskSteps = await BrowserService.getTaskSteps(browserAgentResult.taskId);
      console.log(`📸 Collected ${taskSteps.length} steps`);
      
      // Debug: log first few steps to see structure
      if (taskSteps.length > 0) {
        console.log(`   First step structure:`, JSON.stringify(taskSteps[0], null, 2));
      }

      // Extract screenshot URLs from steps
      const allScreenshots = taskSteps
        .filter((step: any) => step.screenshotUrl)
        .map((step: any) => ({
          url: step.screenshotUrl,
          description: step.nextGoal || step.memory || 'Feature demonstration',
          stepNumber: step.number,
        }));

      console.log(`\n${'='.repeat(60)}`);
      console.log(`📸 SCREENSHOT COLLECTION DEBUG`);
      console.log(`${'='.repeat(60)}`);
      console.log(`Total task steps: ${taskSteps.length}`);
      console.log(`Steps with screenshots: ${allScreenshots.length}`);
      console.log(`\nAll screenshot descriptions:`);
      allScreenshots.forEach((s, idx) => {
        console.log(`  ${idx + 1}. [Step ${s.stepNumber}] ${s.description}`);
      });
      console.log(`${'='.repeat(60)}\n`);

      // Use AI to intelligently filter screenshots to top 5
      const screenshots = await AiService.filterScreenshotsWithAI(allScreenshots, {
        maxScreenshots: 5,
        featureDescription: prTitle || experiment.goal,
        priorityKeywords: ['cart', 'register', 'checkout', 'success', 'total', 'complete']
      });
      
      console.log(`\n✨ AI filtered screenshots from ${allScreenshots.length} to ${screenshots.length}`);
      console.log(`Selected screenshots:`);
      screenshots.forEach((s, idx) => {
        console.log(`  ${idx + 1}. [Step ${s.stepNumber}] ${s.description}`);
      });
      
      if (screenshots.length === 0 && taskSteps.length > 0) {
        console.warn(`⚠️  No screenshots found but ${taskSteps.length} steps exist. Step keys:`, Object.keys(taskSteps[0]));
      }

      return {
        taskId: browserAgentResult.taskId,
        screenshots,
        taskSteps,
      };
    });

    // Generate social media post
    const postResult = await step.run('generate-social-post', async () => {
      console.log(`📝 Generating social media post...`);

      const post = await AiService.generateSocialMediaPost({
        title: prTitle || 'New Feature Release',
        summary: coderabbitSummary || prSummary || experiment.goal,
        screenshots: screenshotsResult.screenshots,
      });

      console.log(`✅ Social media post generated`);
      console.log(`Post content:\n${post.content}\n`);

      return {
        post,
        screenshots: screenshotsResult.screenshots,
      };
    });

    // Update experiment with results
    await step.run('save-results', async () => {
      // Update experiment status and save social post
      await db
        .update(experimentsTable)
        .set({
          status: 'completed',
          variantSuggestions: [postResult.post.content], // Store the generated post
          updatedAt: new Date().toISOString(),
        })
        .where(eq(experimentsTable.id, experiment.id));

      console.log(`✅ Experiment ${experiment.id} completed`);
      
      // Save screenshots as variants
      console.log(`💾 Saving ${postResult.screenshots.length} screenshots to database...`);
      
      const { variantsTable } = await import('@/db/variant.db');
      const { generateId } = await import('@/lib/id');
      
      for (const screenshot of postResult.screenshots) {
        await db.insert(variantsTable).values({
          id: generateId('variant'),
          createdAt: new Date().toISOString(),
          experimentId: experiment.id,
          daytonaSandboxId: sandboxResult.variant.daytonaSandboxId,
          publicUrl: sandboxResult.variant.publicUrl,
          type: 'experiment',
          suggestion: screenshot.url, // Store screenshot URL in suggestion field
          analysis: {
            success: true,
            summary: screenshot.description,
            insights: [],
            issues: [],
          },
        });
      }
      
      console.log(`✅ Saved ${postResult.screenshots.length} screenshots`);
    });

    console.log(`
🎉 DEVREL FLOW COMPLETE!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Sandbox: ${sandboxResult.variant.daytonaSandboxId}
✅ Live URL: ${sandboxResult.variant.publicUrl}
✅ Screenshots: ${screenshotsResult.screenshots.length}
✅ Social Post Generated
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `);

    return {
      experimentId: experiment.id,
      sandboxId: sandboxResult.variant.daytonaSandboxId,
      screenshots: postResult.screenshots,
      socialPost: postResult.post,
    };
  }
);

export const createExperimentJob = async (data: ExperimentRunJobData) => {
  await inngestClient.send({
    name: EXPERIMENT_RUN_JOB_ID,
    data: data,
  });
};

// Post to X job
const POST_TO_X_JOB_ID = 'experiment/post-to-x';

export const runPostToXJob = inngestClient.createFunction(
  { id: 'post-to-x' },
  { event: POST_TO_X_JOB_ID },
  async ({ event, step }) => {
    const { experimentId } = event.data as { experimentId: string };

    console.log(`🐦 Starting post to X for experiment ${experimentId}`);

    // Get experiment data
    const experiment = await step.run('fetch-experiment', async () => {
      const experiments = await db
        .select()
        .from(experimentsTable)
        .where(eq(experimentsTable.id, experimentId as any))
        .limit(1);

      if (experiments.length === 0) {
        throw new Error(`Experiment ${experimentId} not found`);
      }

      return experiments[0];
    });

    // Get screenshots - use selected ones if available, otherwise all
    const screenshots = await step.run('fetch-screenshots', async () => {
      // If experiment has selected screenshots, use those
      if (experiment.selectedScreenshotUrls && experiment.selectedScreenshotUrls.length > 0) {
        console.log(`📸 Using ${experiment.selectedScreenshotUrls.length} selected screenshots`);
        return experiment.selectedScreenshotUrls;
      }

      // Otherwise, get all screenshots from variants
      const { variantsTable } = await import('@/db/variant.db');

      const variants = await db
        .select()
        .from(variantsTable)
        .where(eq(variantsTable.experimentId, experimentId as any));

      const experimentalVariants = variants.filter((v) => v.type === 'experiment');

      const allScreenshots = experimentalVariants
        .map((v) => v.suggestion)
        .filter((url): url is string => !!url);

      console.log(`📸 Using all ${allScreenshots.length} screenshots (none selected)`);
      return allScreenshots;
    });

    console.log(`📸 Found ${screenshots.length} screenshots to attach`);

    // Post to X
    const postResult = await step.run('post-to-x', async () => {
      const postContent = experiment.variantSuggestions?.[0] || 'Check out our new feature!';

      console.log(`📝 Posting to X with content: ${postContent.substring(0, 100)}...`);
      console.log(`🐍 Using local browser (Python) for reliable image uploads`);

      // Use local browser for reliable file uploads
      const result = await BrowserService.postToX(postContent, screenshots, {
        useLocalBrowser: true
      });

      return result;
    });

    // Update experiment with posted status
    await step.run('update-experiment', async () => {
      await db
        .update(experimentsTable)
        .set({
          postApprovalStatus: 'posted',
          postedToXAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
        .where(eq(experimentsTable.id, experimentId as any));

      console.log(`✅ Experiment ${experimentId} posted to X successfully`);
    });

    console.log(`
🎉 POST TO X COMPLETE!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Experiment: ${experimentId}
✅ Screenshots attached: ${screenshots.length}
✅ Task ID: ${postResult.taskId}
✅ Status: ${postResult.status}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `);

    return {
      experimentId,
      taskId: postResult.taskId,
      status: postResult.status,
      screenshotsPosted: screenshots.length,
    };
  }
);

export const postToXJob = async (data: { experimentId: string }) => {
  await inngestClient.send({
    name: POST_TO_X_JOB_ID,
    data: data,
  });
};
