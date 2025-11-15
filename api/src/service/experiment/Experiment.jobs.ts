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

const EXPERIMENT_RUN_JOB_ID = 'run-experiment';

export const runExperimentJob = inngestClient.createFunction(
  { id: EXPERIMENT_RUN_JOB_ID },
  { event: 'experiment/run' },
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

        // Generate a task based on the PR summary
        const taskPrompt = await AiService.generateBrowserTaskPrompt(
          prSummary || experiment.goal,
          sandboxResult.variant.publicUrl
        );
        console.log(`📝 Generated task prompt: ${taskPrompt}`);

        // Create and run browser task
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

    // Wait for browser task to complete and collect screenshots
    const screenshotsResult = await step.run('collect-screenshots', async () => {
      console.log(`⏳ Waiting for browser task to complete...`);

      // Wait for task completion
      const completedTask = await BrowserService.waitForTaskCompletion(
        browserAgentResult.taskId,
        5 * 60 * 1000
      );
      console.log(`✅ Browser task completed with status: ${completedTask.status}`);

      // Get task steps which include screenshots
      const taskSteps = await BrowserService.getTaskSteps(browserAgentResult.taskId);
      console.log(`📸 Collected ${taskSteps.length} steps with screenshots`);

      // Extract screenshot URLs from steps
      const screenshots = taskSteps
        .filter((step: any) => step.screenshot)
        .map((step: any) => ({
          url: step.screenshot,
          description: step.summary || 'Feature demonstration',
        }));

      console.log(`🖼️  Found ${screenshots.length} screenshots`);

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
      await db
        .update(experimentsTable)
        .set({
          status: 'completed',
          variantSuggestions: [postResult.post.content], // Store the generated post
          updatedAt: new Date().toISOString(),
        })
        .where(eq(experimentsTable.id, experiment.id));

      console.log(`✅ Experiment ${experiment.id} completed`);
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
