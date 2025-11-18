import { browserUse } from '@/lib/browser-use';
import { TaskStepView } from 'browser-use-sdk/dist/cjs/api';

/**
 * Extended TaskStep interface with screenshot and metadata
 * The browser-use-sdk's TaskStepView doesn't include all runtime fields
 */
interface TaskStep {
  screenshotUrl?: string;
  memory?: string;
  nextGoal?: string;
  number?: number;
  [key: string]: any; // Allow other fields from TaskStepView
}

/**
 * Screenshot data structure returned from browser tasks
 */
interface TaskScreenshot {
  url: string;
  description: string;
  stepNumber?: number;
}

/**
 * Browser automation service using browser-use-sdk
 * Handles task creation, monitoring, and screenshot extraction
 */
export abstract class BrowserService {
  /**
   * Generic browser automation best practices appended to all tasks
   * Helps prevent common issues like stale elements, timing problems, and failed clicks
   */
  private static readonly AUTOMATION_GUIDELINES = `

═══════════════════════════════════════════════════════════════
BROWSER AUTOMATION BEST PRACTICES (Follow These Rules):
═══════════════════════════════════════════════════════════════

⏱️  TIMING & STABILITY:
   • Wait 2-3 seconds after each significant action (click, navigate, form submit)
   • Use the 'wait' action to let pages fully load and settle
   • If the page has animations or transitions, wait for them to complete
   • After page loads, wait for dynamic content to render

🎯 CLICKING & INTERACTIONS:
   • If a click fails with "stale element" or "index error":
     → Wait 5 seconds
     → Get fresh page state
     → Locate the element again
     → Then retry the click
   • Avoid rapid successive clicks - give the page time to respond
   • Scroll elements into view before clicking when needed
   • If buttons seem unresponsive, try waiting longer

📸 SCREENSHOTS & VERIFICATION:
   • Take screenshots after completing major steps
   • Verify actions succeeded before moving to next step
   • Capture errors or unexpected states for debugging

🔄 ERROR RECOVERY:
   • If you encounter any error, pause and assess the situation
   • Don't retry failed actions immediately - wait first
   • If something doesn't work after 2-3 attempts, try an alternative approach
   • Document what went wrong in your observations

🚀 GENERAL APPROACH:
   • Work methodically - speed is not important, accuracy is
   • Observe page changes after each action
   • Read error messages and adapt your approach
   • Prioritize completing the task successfully over doing it quickly

═══════════════════════════════════════════════════════════════
`;

  /**
   * Get or create a session with the configured profile ID
   * This ensures all tasks use the same authenticated profile (e.g., X/Twitter login)
   */
  private static async getOrCreateSession(): Promise<string | undefined> {
    const profileId = process.env.BROWSER_USE_CLOUD_PROFILE_ID;
    
    if (!profileId) {
      return undefined; // No profile configured, use default session
    }

    try {
      // Create a session with the profile ID
      // This will reuse the same browser session with saved cookies
      const session = await browserUse.sessions.createSession({
        profileId: profileId,
      });

      const sessionId = session.id || (session as any).sessionId || (session as any).session_id;
      
      if (sessionId) {
        console.log(`🔐 Using profile session: ${sessionId.substring(0, 8)}...`);
        return sessionId;
      }
    } catch (error: any) {
      console.warn(`⚠️  Failed to create session with profile ${profileId}:`, error.message);
      console.warn('   Continuing without profile (will login each time)');
    }

    return undefined;
  }

  /**
   * Create and run a browser automation task
   * @param task - The task description/instructions for the browser agent
   * @param url - Optional starting URL for the task
   * @param options - Optional configuration
   * @param options.includeGuidelines - Whether to append automation best practices (default: true)
   * @param options.sessionId - Optional session ID to use (if not provided, will create one with profile)
   * @returns The created task with ID and live URL
   */
  static async createTask(
    task: string, 
    url?: string,
    options?: { includeGuidelines?: boolean; sessionId?: string }
  ) {
    // Enhance task with generic automation best practices (unless explicitly disabled)
    const shouldIncludeGuidelines = options?.includeGuidelines !== false;
    const enhancedTask = shouldIncludeGuidelines 
      ? `${task}${this.AUTOMATION_GUIDELINES}` 
      : task;
    
    // Get or create session with profile if configured
    const sessionId = options?.sessionId || await this.getOrCreateSession();
    
    try {
      const taskData = await browserUse.tasks.createTask({
        task: enhancedTask,
        startUrl: url,
        sessionId: sessionId || undefined,
      });

      console.log('📋 Browser task creation response:', JSON.stringify(taskData, null, 2));

      // Check if task has an id field
      if (!taskData || (!taskData.id && !(taskData as any).taskId && !(taskData as any).task_id)) {
        console.error('❌ Task creation response missing ID:', taskData);
        throw new Error('Task creation failed: No task ID returned');
      }

      // Normalize the ID field (handle different possible field names)
      const taskId = taskData.id || (taskData as any).taskId || (taskData as any).task_id;
      
      if (!taskId) {
        throw new Error('Task creation failed: Could not extract task ID from response');
      }

      // Return normalized task data with id field
      return {
        ...taskData,
        id: taskId,
      };
    } catch (error: any) {
      console.error('❌ Error creating browser task:', error);
      console.error('   Error details:', error.message);
      if (error.response) {
        console.error('   Response status:', error.response.status);
        console.error('   Response body:', error.response.data);
      }
      throw error;
    }
  }

  /**
   * Wait for a task to complete by polling its status
   * @param taskId - The task ID to wait for
   * @param maxWaitTime - Maximum time to wait in milliseconds (default: 5 minutes)
   * @returns The completed task data
   */
  static async waitForTaskCompletion(
    taskId: string,
    maxWaitTime: number = 5 * 60 * 1000
  ) {
    this.validateTaskId(taskId);

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
   * Get all steps from a task, including screenshots and metadata
   * @param taskId - The task ID
   * @returns Array of task steps with screenshot URLs
   */
  static async getTaskSteps(taskId: string): Promise<TaskStep[]> {
    this.validateTaskId(taskId);

    const task = await browserUse.tasks.getTask({ task_id: taskId });
    return (task?.steps ?? []) as TaskStep[];
  }

  /**
   * Extract only steps that have screenshots
   * @param taskId - The task ID
   * @returns Array of steps with screenshots
   */
  static async getTaskScreenshots(taskId: string): Promise<TaskScreenshot[]> {
    const steps = await this.getTaskSteps(taskId);
    
    return steps
      .filter((step): step is TaskStep & { screenshotUrl: string } => !!step.screenshotUrl)
      .map((step) => ({
        url: step.screenshotUrl,
        description: step.nextGoal || step.memory || 'Browser action',
        stepNumber: step.number,
      }));
  }

  /**
   * Get task screenshots with AI-powered intelligent filtering
   * Uses LLM to select the most important and relevant screenshots
   * @param taskId - The task ID
   * @param options - Filtering options
   * @returns Filtered array of most important screenshots
   */
  static async getFilteredTaskScreenshots(
    taskId: string,
    options: {
      maxScreenshots?: number;
      featureDescription?: string;
      priorityKeywords?: string[];
    } = {}
  ): Promise<TaskScreenshot[]> {
    const allScreenshots = await this.getTaskScreenshots(taskId);
    
    // Dynamically import AiService to avoid circular dependencies
    const { AiService } = await import('@/service/ai/Ai.service');
    
    return await AiService.filterScreenshotsWithAI(allScreenshots, options);
  }

  /**
   * Validate that a taskId is a properly formatted UUID
   * @param taskId - The task ID to validate
   * @throws Error if taskId is invalid
   */
  private static validateTaskId(taskId: string): void {
    if (!taskId || taskId === 'undefined' || typeof taskId !== 'string') {
      throw new Error(`Invalid taskId: ${taskId}. Expected a valid UUID string.`);
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(taskId)) {
      throw new Error(`Invalid taskId format: ${taskId}. Expected UUID format.`);
    }
  }

  /**
   * Get the raw text logs with full task execution details
   * @param taskId - The task ID
   * @returns Raw text log content
   */
  static async getTaskLogs(taskId: string): Promise<string> {
    this.validateTaskId(taskId);

    const { downloadUrl } = await browserUse.tasks.getTaskLogs({ task_id: taskId });
    const response = await fetch(downloadUrl);
    return await response.text();
  }

  /**
   * Post to X (Twitter) with screenshots
   * @param postContent - The text content to post
   * @param screenshotUrls - Optional array of screenshot URLs to attach
   * @param options - Optional configuration
   * @param options.useLocalBrowser - Use local Python browser instead of cloud (default: false)
   * @returns The completed task with details
   */
  static async postToX(
    postContent: string, 
    screenshotUrls: string[] = [],
    options?: { useLocalBrowser?: boolean }
  ) {
    // Check if we should use local browser
    const useLocalBrowser = options?.useLocalBrowser ?? process.env.USE_LOCAL_BROWSER === 'true';
    
    if (useLocalBrowser) {
      console.log('🐍 Using local browser (Python) for file upload support...');
      const { BrowserLocalWrapper } = await import('./browser-local-wrapper');
      const wrapper = new BrowserLocalWrapper();
      return await wrapper.postToX(postContent, screenshotUrls);
    }
    
    // Continue with cloud browser (existing implementation)
    const X_USERNAME = process.env.X_USERNAME;
    const X_PASSWORD = process.env.X_PASSWORD;

    if (!X_USERNAME || !X_PASSWORD) {
      throw new Error('X_USERNAME and X_PASSWORD must be set in environment variables');
    }

    console.log('🐦 Starting post to X (Twitter)...');
    console.log(`   Post content: ${postContent.substring(0, 100)}...`);
    console.log(`   Screenshots: ${screenshotUrls.length}`);

    // Check if we have a profile configured (means we're already logged in)
    const hasProfile = !!process.env.BROWSER_USE_CLOUD_PROFILE_ID;

    // Build the task prompt with screenshot handling
    let taskPrompt = hasProfile
      ? `You are already logged into X (Twitter) via a saved profile. Make EXACTLY ONE post. Follow these steps:

1. Go to x.com (you should already be logged in)
2. Find the "Post" or "What's happening?" text box
3. Type the following message: "${postContent}"`
      : `You need to login to X (Twitter) and make EXACTLY ONE post. Follow these steps:

1. Go to x.com and click on "Sign in" or "Log in"
2. Enter the username: ${X_USERNAME}
3. Enter the password: ${X_PASSWORD}
4. Complete any additional verification if required
5. Once logged in, find the "Post" or "What's happening?" text box
6. Type the following message: "${postContent}"`;

    // Add screenshot attachment instructions if provided
    if (screenshotUrls.length > 0) {
      taskPrompt += `
7. CRITICAL: Attach images as FILES (not URLs). Twitter/X requires actual image files to be uploaded.

   Screenshot URLs to attach (${screenshotUrls.length} images):
   ${screenshotUrls.map((url, idx) => `   ${idx + 1}. ${url}`).join('\n')}
   
   METHOD: Use JavaScript to fetch images and upload them directly to Twitter/X:
   
   Step A: Click the image/media attachment button (usually an image icon, "+" button, or media icon near the post text box)
   
   Step B: Execute this JavaScript code IMMEDIATELY after clicking the media button:
   
   (async function() {
     const imageUrls = [${screenshotUrls.map(url => `'${url}'`).join(', ')}];
     
     for (let i = 0; i < imageUrls.length; i++) {
       try {
         console.log('Fetching image ' + (i + 1) + ' from: ' + imageUrls[i]);
         
         // Fetch image - try with no-cors first, then cors
         let response;
         try {
           response = await fetch(imageUrls[i], { 
             mode: 'no-cors',
             cache: 'no-cache'
           });
         } catch (e) {
           // If no-cors fails, try cors
           response = await fetch(imageUrls[i], { 
             mode: 'cors',
             credentials: 'omit',
             cache: 'no-cache'
           });
         }
         
         if (!response || !response.ok) {
           // If fetch fails, try creating image element and canvas
           const img = new Image();
           img.crossOrigin = 'anonymous';
           await new Promise((resolve, reject) => {
             img.onload = resolve;
             img.onerror = reject;
             img.src = imageUrls[i] + '?t=' + Date.now(); // Cache bust
           });
           
           // Convert image to blob via canvas
           const canvas = document.createElement('canvas');
           canvas.width = img.width;
           canvas.height = img.height;
           const ctx = canvas.getContext('2d');
           ctx.drawImage(img, 0, 0);
           
           canvas.toBlob(async (blob) => {
             if (!blob) throw new Error('Canvas toBlob failed');
             const file = new File([blob], 'screenshot' + (i + 1) + '.png', { type: 'image/png' });
             await uploadFile(file, i);
           }, 'image/png');
           continue;
         }
         
         const blob = await response.blob();
         const file = new File([blob], 'screenshot' + (i + 1) + '.png', { type: blob.type || 'image/png' });
         await uploadFile(file, i);
         
       } catch (error) {
         console.error('Error with image ' + (i + 1) + ':', error);
       }
     }
     
     async function uploadFile(file, index) {
       // Find file input - try multiple strategies
       let fileInput = null;
       
       // Strategy 1: Look for visible file inputs
       const allInputs = Array.from(document.querySelectorAll('input[type="file"]'));
       fileInput = allInputs.find(input => {
         const rect = input.getBoundingClientRect();
         return rect.width > 0 && rect.height > 0;
       }) || allInputs[0];
       
       // Strategy 2: Look near composer
       if (!fileInput) {
         const composer = document.querySelector('[data-testid="tweetTextarea_0"]') ||
                         document.querySelector('[contenteditable="true"][role="textbox"]');
         if (composer) {
           fileInput = composer.closest('form')?.querySelector('input[type="file"]');
         }
       }
       
       // Strategy 3: Look for media button
       if (!fileInput) {
         const mediaButton = document.querySelector('[data-testid="attach"]') ||
                            document.querySelector('[aria-label*="Media"]') ||
                            document.querySelector('[aria-label*="photo"]');
         if (mediaButton) {
           const container = mediaButton.closest('div[role="group"]') || 
                           mediaButton.closest('form') ||
                           mediaButton.parentElement?.parentElement;
           fileInput = container?.querySelector('input[type="file"]');
         }
       }
       
       if (fileInput) {
         const dataTransfer = new DataTransfer();
         dataTransfer.items.add(file);
         fileInput.files = dataTransfer.files;
         
         // Trigger events
         ['change', 'input', 'drop'].forEach(type => {
           fileInput.dispatchEvent(new Event(type, { bubbles: true, cancelable: true }));
         });
         
         console.log('Image ' + (index + 1) + ' uploaded to file input');
       }
     }
     
     return 'Upload script completed';
   })();
   
   Step C: Wait 10-15 seconds after running JavaScript to allow Twitter/X to process images
   Step D: CRITICAL VERIFICATION - Look for ${screenshotUrls.length} image preview(s) in the composer. If you DON'T see them, DO NOT POST`;
      taskPrompt += `
8. ONLY click "Post" if you can VERIFY ${screenshotUrls.length} image preview(s) are visible
9. If images are visible, click "Post" or "Tweet" ONCE
10. Wait for post to appear in feed
11. STOP - Your task is complete`;
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
    const screenshots = await this.getTaskScreenshots(task.id);

    console.log(`📸 Captured ${screenshots.length} screenshots during posting`);

    return {
      taskId: task.id,
      status: completedTask?.status,
      result: (completedTask as any)?.result,
      screenshots,
    };
  }
}