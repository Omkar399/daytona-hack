import { BrowserService } from '@/service/browser/Browser.service';

const SANDBOX_URL = 'https://3000-ef9cc422-c8e8-455b-b70b-6d5ae5287299.proxy.daytona.works';

async function testBrowserAgent() {
  console.log('🧪 Testing Browser Agent with Sandbox\n');
  console.log(`🔗 Target URL: ${SANDBOX_URL}\n`);

  try {
    // Step 1: Create a browser task
    console.log('📝 Step 1: Creating browser task...');
    const task = await BrowserService.createTask(
      `You are a customer browsing an e-commerce site.

Simple task:
1. Wait for the page to load and click "Continue" or dismiss any warnings
2. Look at the product list and click "Add to Cart" on the first product you see
3. Navigate to the cart page (look for a Cart button/link)
4. Take a screenshot of the cart showing the product(s) and total price
5. Report what you see in the cart

Keep it simple and straightforward.`,
      SANDBOX_URL
    );
    
    console.log(`✅ Task created\n`);
    console.log(`📊 Task Details:`);
    console.log(`   - Task Data: ${JSON.stringify(task, null, 2)}\n`);

    // Step 2: Wait for task to complete
    console.log('⏳ Step 2: Waiting for browser agent to complete (max 5 minutes)...');
    console.log('   (This may take a while as the agent explores the site)\n');
    
    const completedTask = await BrowserService.waitForTaskCompletion((task as any).id || (task as any).task_id, 5 * 60 * 1000);
    
    console.log(`✅ Task completed!`);
    console.log(`   - Task data: ${JSON.stringify(completedTask, null, 2)}\n`);

    // Step 3: Extract screenshots
    console.log('📸 Step 3: Extracting screenshots from task steps...');
    const steps = await BrowserService.getTaskSteps((task as any).id || (task as any).task_id);
    
    const screenshotSteps = steps.filter((step: any) => step.screenshotUrl);
    console.log(`✅ Found ${screenshotSteps.length} screenshots\n`);

    if (screenshotSteps.length > 0) {
      console.log('📷 Screenshots from Shopping Journey:');
      screenshotSteps.forEach((step: any, index: number) => {
        console.log(`\n   📸 Screenshot ${index + 1} (Step #${step.number}):`);
        console.log(`   ├─ URL: ${step.screenshotUrl}`);
        console.log(`   ├─ What happened: ${step.memory || 'No details'}`);
        console.log(`   └─ Next action: ${step.nextGoal || 'Task complete'}`);
      });
      
      // Find and highlight cart screenshots
      const cartSteps = screenshotSteps.filter((step: any) => 
        step.memory?.toLowerCase().includes('cart') || 
        step.nextGoal?.toLowerCase().includes('cart')
      );
      
      if (cartSteps.length > 0) {
        console.log('\n\n🛒 CART SCREENSHOTS:');
        cartSteps.forEach((step: any) => {
          console.log(`   - Step #${step.number}: ${step.screenshotUrl}`);
        });
      } else {
        console.log('\n\n💡 Tip: Most recent screenshots (likely cart):');
        const lastThreeSteps = screenshotSteps.slice(-3);
        lastThreeSteps.forEach((step: any) => {
          console.log(`   - Step #${step.number}: ${step.screenshotUrl}`);
        });
      }
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

    console.log('\n\n✅ BROWSER AGENT TEST COMPLETE!');
    console.log('═'.repeat(60));
    console.log('\n📊 Summary:');
    console.log(`   ✅ Connected to sandbox: ${SANDBOX_URL}`);
    console.log(`   ✅ Screenshots captured: ${screenshotSteps.length}`);
    console.log('\n🎉 Browser agent is working correctly!');

  } catch (error: any) {
    console.error('\n❌ ERROR:', error.message);
    console.error('\nStack:', error.stack);
    
    if (error.message.includes('401') || error.message.includes('403')) {
      console.error('\n💡 Possible issues:');
      console.error('   - BROWSER_USE_API_KEY might be invalid or expired');
      console.error('   - Check your .env file: BROWSER_USE_API_KEY=bu_...');
    } else if (error.message.includes('timeout')) {
      console.error('\n💡 Possible issues:');
      console.error('   - Sandbox URL might be incorrect or unreachable');
      console.error('   - Browser agent took too long to complete');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
      console.error('\n💡 Possible issues:');
      console.error('   - Sandbox URL is not accessible');
      console.error(`   - Check if ${SANDBOX_URL} is reachable`);
    }
  }
}

testBrowserAgent();
