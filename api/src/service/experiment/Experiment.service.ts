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

      // Create new experiment from PR data
      const newExperiment: ExperimentEntity = {
        id: generateId('experiment'),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        repoUrl: `https://github.com/${body.repo}`,
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
    const sandbox = await daytona.create({
      language: 'typescript',
      public: true,
      envVars: {
        NODE_ENV: 'development',
      },
    });
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
