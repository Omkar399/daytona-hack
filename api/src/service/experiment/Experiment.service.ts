import { ExperimentEntity, experimentsTable } from '@/db/experiment.db';
import { db } from '@/lib/client';
import { generateId, Id } from '@/lib/id';
import { daytona } from '@/lib/daytona';
import { desc, eq } from 'drizzle-orm';
import Elysia, { t } from 'elysia';
import { inngestClient } from '@/lib/inngest-client';
import { VariantEntity, variantsTable } from '@/db/variant.db';
import { createExperimentJob, ExperimentRunJobData } from './Experiment.jobs';

export const experimentRoutes = new Elysia({ prefix: '/experiment' })
  .get('/', () => {
    console.log('get all experiments');
    // return all experiments
    return db
      .select()
      .from(experimentsTable)
      .orderBy(desc(experimentsTable.createdAt))
      .limit(10);
  })
  .delete(
    '/:id',
    async ({ params }) => {
      const experimentId = params.id as Id<'experiment'>;
      
      // Delete variants first (foreign key constraint)
      await db
        .delete(variantsTable)
        .where(eq(variantsTable.experimentId, experimentId));
      
      // Delete experiment
      await db
        .delete(experimentsTable)
        .where(eq(experimentsTable.id, experimentId));
      
      return { success: true, message: 'Experiment deleted' };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .delete('/all/clear', async () => {
    // Delete all variants first
    await db.delete(variantsTable);
    // Delete all experiments
    await db.delete(experimentsTable);
    
    return { success: true, message: 'All experiments cleared' };
  })
  .get(
    '/:id',
    async ({ params }) => {
      const experimentId = params.id as Id<'experiment'>;
      
      // Get the experiment
      const experiments = await db
        .select()
        .from(experimentsTable)
        .where(eq(experimentsTable.id, experimentId))
        .limit(1);

      if (experiments.length === 0) {
        return null;
      }

      const experiment = experiments[0];

      // Get all variants for this experiment
      const variants = await db
        .select()
        .from(variantsTable)
        .where(eq(variantsTable.experimentId, experimentId));

      // Separate control and experimental variants
      const controlVariant = variants.find((v) => v.type === 'control');
      const experimentalVariants = variants.filter((v) => v.type === 'experiment');

      // Return experiment with related variant data
      return {
        ...experiment,
        controlVariant: controlVariant ? {
          id: controlVariant.id,
          daytonaSandboxId: controlVariant.daytonaSandboxId,
          publicUrl: controlVariant.publicUrl,
          type: controlVariant.type,
        } : null,
        experimentalVariants: experimentalVariants.map((v) => ({
          id: v.id,
          description: v.suggestion, // Use suggestion field for screenshot URLs
        })),
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .post(
    '/',
    async ({ body }) => {
      const newExperiment: ExperimentEntity = {
        id: generateId('experiment'),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        repoUrl: body.repoUrl,
        goal: body.goal,
        status: 'pending',
        variantSuggestions: [],
      };

      await db.insert(experimentsTable).values(newExperiment);

      // kick off workflow for experimentation
      await createExperimentJob({ experiment: newExperiment });

      return newExperiment;
    },
    {
      body: t.Object({
        repoUrl: t.String(),
        goal: t.String(),
      }),
    }
  )
  .post(
    '/from-webhook',
    async ({ body }) => {
      console.log('🔔 Received GitHub webhook for PR merge');
      console.log(`   PR: ${body.pr}`);
      console.log(`   Title: ${body.title}`);
      console.log(`   Repo: ${body.repo}`);

      // Check if experiment already exists for this PR
      const repoUrl = `https://github.com/${body.repo}`;
      const existingExperiments = await db
        .select()
        .from(experimentsTable)
        .where(eq(experimentsTable.repoUrl, repoUrl))
        .limit(1);

      if (existingExperiments.length > 0 && existingExperiments[0].goal === body.title) {
        console.log(`⚠️  Experiment already exists for this PR, skipping duplicate`);
        return {
          success: true,
          experimentId: existingExperiments[0].id,
          message: `Experiment already exists for PR #${body.pr} (duplicate webhook call)`,
          duplicate: true,
        };
      }

      // Create new experiment from PR data
      const newExperiment: ExperimentEntity = {
        id: generateId('experiment'),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        repoUrl,
        goal: body.title, // Use PR title as the goal
        status: 'pending',
        variantSuggestions: [],
      };

      await db.insert(experimentsTable).values(newExperiment);
      console.log(`✅ Created experiment: ${newExperiment.id}`);

      // Trigger the DevRel flow with PR metadata
      const jobData: ExperimentRunJobData = {
        experiment: newExperiment,
        prTitle: body.title,
        prSummary: body.summary,
        coderabbitSummary: body.coderabbitSummary,
      };

      await createExperimentJob(jobData);
      console.log(`✅ Triggered DevRel flow for PR #${body.pr}`);

      return {
        success: true,
        experimentId: newExperiment.id,
        message: `DevRel flow started for PR #${body.pr}`,
      };
    },
    {
      body: t.Object({
        repo: t.String(), // e.g., "Omkar399/hack_ecom"
        pr: t.Number(), // PR number
        title: t.String(), // PR title
        summary: t.Optional(t.String()), // PR summary
        coderabbitSummary: t.Optional(t.String()), // CodeRabbit summary
      }),
    }
  )
  .post(
    '/:id/approve-post',
    async ({ params, body }) => {
      const experimentId = params.id as Id<'experiment'>;
      const { approved } = body;

      console.log(`📝 Post approval for experiment ${experimentId}: ${approved ? 'APPROVED' : 'REJECTED'}`);

      // Get the experiment
      const experiments = await db
        .select()
        .from(experimentsTable)
        .where(eq(experimentsTable.id, experimentId))
        .limit(1);

      if (experiments.length === 0) {
        return { success: false, message: 'Experiment not found' };
      }

      const experiment = experiments[0];

      // Update approval status
      const newStatus = approved ? 'approved' : 'rejected';
      await db
        .update(experimentsTable)
        .set({
          postApprovalStatus: newStatus,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(experimentsTable.id, experimentId));

      // If approved, trigger the post-to-X job
      if (approved) {
        console.log(`✅ Post approved! Triggering post-to-X job...`);

        const { postToXJob } = await import('./Experiment.jobs');
        await postToXJob({ experimentId });

        return {
          success: true,
          message: 'Post approved and posting to X initiated',
          status: 'approved',
        };
      }

      return {
        success: true,
        message: 'Post rejected',
        status: 'rejected',
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        approved: t.Boolean(),
      }),
    }
  )
  .post(
    '/:id/regenerate-post',
    async ({ params, body }) => {
      const experimentId = params.id as Id<'experiment'>;
      const { selectedScreenshotUrls } = body;

      console.log(`🔄 Regenerating post for experiment ${experimentId} with ${selectedScreenshotUrls?.length || 0} screenshots`);

      // Get the experiment
      const experiments = await db
        .select()
        .from(experimentsTable)
        .where(eq(experimentsTable.id, experimentId))
        .limit(1);

      if (experiments.length === 0) {
        return { success: false, message: 'Experiment not found' };
      }

      const experiment = experiments[0];

      // Get screenshot descriptions from variants
      const { variantsTable } = await import('@/db/variant.db');
      const variants = await db
        .select()
        .from(variantsTable)
        .where(eq(variantsTable.experimentId, experimentId));

      // Map URLs to screenshot objects with descriptions
      const selectedScreenshots = selectedScreenshotUrls.map((url: string) => {
        const variant = variants.find((v) => v.suggestion === url);
        return {
          url,
          description: (variant?.analysis as any)?.summary || 'Feature screenshot',
        };
      });

      // Regenerate post with selected screenshots
      const { AiService } = await import('@/service/ai/Ai.service');
      const post = await AiService.generateSocialMediaPost({
        title: experiment.goal,
        summary: experiment.goal,
        screenshots: selectedScreenshots,
      });

      // Update experiment with new post and selected screenshots
      await db
        .update(experimentsTable)
        .set({
          variantSuggestions: [post.content],
          selectedScreenshotUrls: selectedScreenshotUrls, // Store selected screenshots
          postApprovalStatus: 'pending', // Reset approval status
          updatedAt: new Date().toISOString(),
        })
        .where(eq(experimentsTable.id, experimentId));

      console.log(`✅ Post regenerated with ${selectedScreenshots.length} screenshots`);

      return {
        success: true,
        message: 'Post regenerated successfully',
        post: {
          content: post.content,
          hashtags: post.hashtags,
        },
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        selectedScreenshotUrls: t.Array(t.String()),
      }),
    }
  );

export abstract class ExperimentService {
  static WORK_DIR = 'workspace/commerce';

  /**
   * This creates sandbox, clones repo, installs dependencies, and starts dev server
   */
  static async initRepository(repoUrl: string, experimentId: Id<'experiment'>) {
    let start = Date.now();
    let end = Date.now();

    start = Date.now();
    
    // Retry sandbox creation up to 3 times on timeout
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
        break; // Success! Exit retry loop
      } catch (error) {
        lastError = error;
        console.error(`Sandbox creation attempt ${i + 1} failed:`, error.message);
        
        if (i < retries - 1) {
          const waitTime = (i + 1) * 5000; // Wait 5s, 10s, 15s
          console.log(`Retrying in ${waitTime / 1000} seconds...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
      }
    }
    
    if (!sandbox) {
      throw new Error(`Failed to create sandbox after ${retries} attempts. Last error: ${lastError?.message || 'Unknown'}`);
    }
    
    end = Date.now();
    console.log(`Time taken to create sandbox: ${end - start}ms`);

    // Clone the repository into the sandbox
    start = Date.now();
    await sandbox.git.clone(repoUrl, ExperimentService.WORK_DIR);
    end = Date.now();
    console.log(`Time taken to clone repository: ${end - start}ms`);

    // Install pm2
    const pm2InstallResult = await sandbox.process.executeCommand(
      `npm install -g pm2`
    );
    console.log(
      `PM2 install result: ${JSON.stringify(pm2InstallResult, null, 2)}`
    );

    // Install dependencies
    start = Date.now();
    await sandbox.process.executeCommand(
      `npm install`,
      ExperimentService.WORK_DIR
    );
    end = Date.now();
    console.log(`Time taken to install dependencies: ${end - start}ms`);

    // print out the current directory
    const cwdLs = await sandbox.process.executeCommand(
      `ls`,
      ExperimentService.WORK_DIR
    );
    console.log(`Current directory ls: ${JSON.stringify(cwdLs, null, 2)}`);

    start = Date.now();
    // Start the development server
    const codeRunResult = await sandbox.process.executeCommand(
      `pm2 start npm --name "vite-dev-server" -- run dev`,
      ExperimentService.WORK_DIR
    );
    end = Date.now();
    console.log(`Time taken to execucte npm run dev: ${end - start}ms`);
    console.log(`Code run result: ${JSON.stringify(codeRunResult, null, 2)}`);

    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log('Dev server should be running now');

    start = Date.now();
    const previewUrl = await sandbox.getPreviewLink(3000);
    end = Date.now();
    console.log(`Time taken to get preview link: ${end - start}ms`);

    // insert to db
    const newVariant: VariantEntity = {
      id: generateId('variant'),
      createdAt: new Date().toISOString(),
      experimentId: experimentId,
      daytonaSandboxId: sandbox.id,
      publicUrl: previewUrl.url,
      type: 'control',
      suggestion: null, // Control variant has no suggestion - it's the baseline
      analysis: null,
    };

    await db.insert(variantsTable).values(newVariant);

    return {
      sandbox: {
        ...sandbox,
        previewUrl: previewUrl.url,
      },
      variant: newVariant,
    };
  }
}
