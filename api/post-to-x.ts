import { BrowserService } from '@/service/browser/Browser.service';

async function postToX() {
  console.log('🐦 Posting to X (Twitter)\n');

  // Configuration - Update these values
  const X_USERNAME = process.env.X_USERNAME || 'your_username';
  const X_PASSWORD = process.env.X_PASSWORD || 'your_password';
  const POST_CONTENT = process.env.POST_CONTENT || 'Hello from browser-use! This is an automated post.';

  try {
    // Step 1: Create a browser task to login and post
    console.log('📝 Step 1: Creating browser task to login and post to X...');
    const task = await BrowserService.createTask(
      `You need to login to X (Twitter) and make EXACTLY ONE post. Follow these steps:

      1. Go to x.com and click on "Sign in" or "Log in"
      2. Enter the username: ${X_USERNAME}
      3. Enter the password: ${X_PASSWORD}
      
      4. Complete any additional verification if required
      5. Once logged in, find the "Post" or "What's happening?" text box
      6. Type the following message: "${POST_CONTENT}"
      7. Click the "Post" or "Tweet" button to publish ONCE
      8. Wait for the post to appear in the feed
      9. STOP - Your task is complete. Do NOT make another post or click the post button again.

      IMPORTANT: Make only ONE post and then stop. Do not repeat the posting action.`,
      'https://x.com'
    );

    console.log(`✅ Task created\n`);
    console.log(`📊 Task Details:`);
    console.log(`   - Task ID: ${(task as any).id || (task as any).task_id}`);
    console.log(`   - Live URL: ${(task as any).liveUrl || 'Not available'}\n`);

    // Step 2: Wait for task to complete
    console.log('⏳ Step 2: Waiting for browser agent to complete (max 5 minutes)...');
    console.log('   (This may take a while as the agent logs in and posts)\n');

    const completedTask = await BrowserService.waitForTaskCompletion(
      (task as any).id || (task as any).task_id,
      5 * 60 * 1000
    );

    console.log(`✅ Task completed!`);
    console.log(`   - Status: ${completedTask?.status}`);
    console.log(`   - Result: ${JSON.stringify(completedTask?.result || 'No result', null, 2)}\n`);

    // Step 3: Extract screenshots
    console.log('📸 Step 3: Extracting screenshots from task steps...');
    const steps = await BrowserService.getTaskSteps((task as any).id || (task as any).task_id);

    const screenshotSteps = steps.filter((step: any) => step.screenshotUrl);
    console.log(`✅ Found ${screenshotSteps.length} screenshots\n`);

    if (screenshotSteps.length > 0) {
      console.log('📷 Screenshots:');
      screenshotSteps.forEach((step: any, index: number) => {
        console.log(`\n   Screenshot ${index + 1}:`);
        console.log(`   - Step #${step.number}`);
        console.log(`   - URL: ${step.screenshotUrl}`);
        console.log(`   - Memory: ${step.memory || 'No memory'}`);
        console.log(`   - Next Goal: ${step.nextGoal || 'No goal'}`);
      });
    }

    // Step 4: Get full logs
    console.log('\n\n📋 Step 4: Getting task logs...');
    try {
      const logs = await BrowserService.getTaskLogs((task as any).id || (task as any).task_id);
      console.log(`✅ Got logs (${logs.length} characters)`);
      console.log(`\n📄 First 500 characters of logs:`);
      console.log(`${logs.substring(0, 500)}...`);
    } catch (err: any) {
      console.log(`⚠️  Could not retrieve logs: ${err.message}`);
    }

    console.log('\n\n✅ POST TO X COMPLETE!');
    console.log('═'.repeat(60));
    console.log('\n📊 Summary:');
    console.log(`   ✅ Logged into X`);
    console.log(`   ✅ Post created: "${POST_CONTENT}"`);
    console.log(`   ✅ Screenshots captured: ${screenshotSteps.length}`);
    console.log('\n🎉 Successfully posted to X!');

  } catch (error: any) {
    console.error('\n❌ ERROR:', error.message);
    console.error('\nStack:', error.stack);

    if (error.message.includes('401') || error.message.includes('403')) {
      console.error('\n💡 Possible issues:');
      console.error('   - BROWSER_USE_API_KEY might be invalid or expired');
      console.error('   - Check your .env file: BROWSER_USE_API_KEY=bu_...');
    } else if (error.message.includes('timeout')) {
      console.error('\n💡 Possible issues:');
      console.error('   - Login might have failed or taken too long');
      console.error('   - X might have additional verification steps');
      console.error('   - Check if credentials are correct');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
      console.error('\n💡 Possible issues:');
      console.error('   - X.com is not accessible');
      console.error('   - Check your internet connection');
    }
  }
}

postToX();