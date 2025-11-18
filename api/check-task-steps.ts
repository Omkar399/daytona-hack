/**
 * Check the task steps to see what the browser agent did
 */

import { BrowserService } from './src/service/browser/Browser.service';

async function checkSteps() {
  const taskId = '4edbbd86-6862-473c-8d7a-9cb218489845';
  
  console.log(`📋 Checking steps for task: ${taskId}\n`);
  
  try {
    const steps = await BrowserService.getTaskSteps(taskId);
    
    console.log(`📊 Total steps: ${steps.length}\n`);
    
    // Show key steps
    steps.forEach((step: any, idx: number) => {
      const stepNum = step.number || idx + 1;
      const memory = step.memory || '';
      const nextGoal = step.nextGoal || '';
      const action = step.action || '';
      
      // Show steps that mention image, upload, post, or tweet
      if (
        memory.toLowerCase().includes('image') ||
        memory.toLowerCase().includes('upload') ||
        memory.toLowerCase().includes('screenshot') ||
        memory.toLowerCase().includes('post') ||
        memory.toLowerCase().includes('tweet') ||
        nextGoal.toLowerCase().includes('image') ||
        nextGoal.toLowerCase().includes('upload') ||
        nextGoal.toLowerCase().includes('post') ||
        nextGoal.toLowerCase().includes('tweet') ||
        action.toLowerCase().includes('upload') ||
        action.toLowerCase().includes('post')
      ) {
        console.log(`Step ${stepNum}:`);
        if (action) console.log(`   Action: ${action}`);
        if (memory) console.log(`   Memory: ${memory.substring(0, 150)}...`);
        if (nextGoal) console.log(`   Next Goal: ${nextGoal.substring(0, 150)}...`);
        if (step.screenshotUrl) console.log(`   📸 Screenshot: ${step.screenshotUrl.substring(0, 80)}...`);
        console.log('');
      }
    });
    
    // Summary
    const imageSteps = steps.filter((s: any) => 
      (s.memory || '').toLowerCase().includes('image') ||
      (s.nextGoal || '').toLowerCase().includes('image') ||
      (s.action || '').toLowerCase().includes('upload')
    );
    
    console.log(`\n📊 Summary:`);
    console.log(`   Steps mentioning images/upload: ${imageSteps.length}`);
    console.log(`   Steps with screenshots: ${steps.filter((s: any) => s.screenshotUrl).length}`);
    
  } catch (error: any) {
    console.error('❌ Error fetching steps:', error.message);
  }
}

checkSteps();

