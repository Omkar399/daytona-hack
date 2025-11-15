import { browserUse } from '@/lib/browser-use';
import { TaskStepView } from 'browser-use-sdk/dist/cjs/api';

export abstract class BrowserService {
  /**
   * Create and run a browser automation task
   * @param task - The task description/instructions for the browser agent
   * @param url - Optional starting URL for the task
   * @returns The created task with ID and live URL
   */
  static async createTask(task: string, url?: string) {
    const taskData = await browserUse.tasks.createTask({
      task,
      startUrl: url,
    });

    return taskData;
  }

  /**
   * Wait for a task to complete and return the result
   * @param taskId - The task ID to wait for
   * @param maxWaitTime - Maximum time to wait in milliseconds (default: 5 minutes)
   * @returns The completed task data
   */
  static async waitForTaskCompletion(
    taskId: string,
    maxWaitTime: number = 5 * 60 * 1000
  ) {
    const startTime = Date.now();
    const pollInterval = 3000; // Poll every 3 seconds

    while (Date.now() - startTime < maxWaitTime) {
      const task = await browserUse.tasks.getTask({ task_id: taskId });

      if (task?.status === 'finished' || task?.status === 'stopped') {
        return task;
      }

      // Wait before polling again
      await new Promise((resolve) => setTimeout(resolve, pollInterval));
    }

    throw new Error(`Task ${taskId} did not complete within ${maxWaitTime}ms`);
  }

  /**
   * Get the steps of the task, including some thinking, but includes screenshots
   * @param taskId
   * @returns
   */
  static async getTaskSteps(taskId: string): Promise<TaskStepView[]> {
    const task = await browserUse.tasks.getTask({ task_id: taskId });
    return task?.steps ?? [];
  }

  /**
   * Get the raw txt file with the full task logs and thinking process
   * @param taskId
   * @returns raw txt file with the full task logs and thinking process
   */
  static async getTaskLogs(taskId: string) {
    const { downloadUrl } = await browserUse.tasks.getTaskLogs({ task_id: taskId });
    const response = await fetch(downloadUrl);
    const text = await response.text();
    return text;
  }

  /**
   * Post to X (Twitter) with screenshots
   * @param postContent - The text content to post
   * @param screenshotUrls - Optional array of screenshot URLs to attach
   * @returns The completed task with details
   */
  static async postToX(postContent: string, screenshotUrls: string[] = []) {
    const X_USERNAME = process.env.X_USERNAME;
    const X_PASSWORD = process.env.X_PASSWORD;

    if (!X_USERNAME || !X_PASSWORD) {
      throw new Error('X_USERNAME and X_PASSWORD must be set in environment variables');
    }

    console.log('🐦 Starting post to X (Twitter)...');
    console.log(`   Post content: ${postContent.substring(0, 100)}...`);
    console.log(`   Screenshots: ${screenshotUrls.length}`);

    // Build the task prompt with screenshot handling
    let taskPrompt = `You need to login to X (Twitter) and make EXACTLY ONE post. Follow these steps:

1. Go to x.com and click on "Sign in" or "Log in"
2. Enter the username: ${X_USERNAME}
3. Enter the password: ${X_PASSWORD}
4. Complete any additional verification if required
5. Once logged in, find the "Post" or "What's happening?" text box
6. Type the following message: "${postContent}"`;

    // Add screenshot attachment instructions if provided
    if (screenshotUrls.length > 0) {
      taskPrompt += `
7. Look for the image/media attachment button (usually an image icon near the post button)
8. For each of these screenshot URLs, download and attach them to your post:
   ${screenshotUrls.map((url, idx) => `   - Screenshot ${idx + 1}: ${url}`).join('\n')}
9. Wait for all images to upload successfully`;
      taskPrompt += `
10. Click the "Post" or "Tweet" button to publish ONCE
11. Wait for the post to appear in the feed
12. STOP - Your task is complete. Do NOT make another post or click the post button again.`;
    } else {
      taskPrompt += `
7. Click the "Post" or "Tweet" button to publish ONCE
8. Wait for the post to appear in the feed
9. STOP - Your task is complete. Do NOT make another post or click the post button again.`;
    }

    taskPrompt += `

IMPORTANT: Make only ONE post and then stop. Do not repeat the posting action.`;

    // Create and run the browser task
    console.log('📝 Creating browser task to login and post to X...');
    const task = await this.createTask(taskPrompt, 'https://x.com');

    console.log(`✅ Task created: ${task.id}`);
    console.log(`📊 Live URL: ${(task as any).liveUrl || 'Not available'}`);

    // Wait for task to complete
    console.log('⏳ Waiting for browser agent to complete (max 5 minutes)...');
    const completedTask = await this.waitForTaskCompletion(task.id, 5 * 60 * 1000);

    console.log(`✅ Task completed!`);
    console.log(`   Status: ${completedTask?.status}`);

    // Get screenshots from the task steps
    const steps = await this.getTaskSteps(task.id);
    const taskScreenshots = steps.filter((step: any) => step.screenshotUrl);

    console.log(`📸 Captured ${taskScreenshots.length} screenshots during posting`);

    return {
      taskId: task.id,
      status: completedTask?.status,
      result: completedTask?.result,
      screenshots: taskScreenshots.map((step: any) => ({
        url: step.screenshotUrl,
        description: step.nextGoal || step.memory || 'Posting step',
      })),
    };
  }
}