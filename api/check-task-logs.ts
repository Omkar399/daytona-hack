/**
 * Check the logs from the test task to see what happened
 */

import { BrowserService } from './src/service/browser/Browser.service';

async function checkLogs() {
  const taskId = '2fff080a-4abf-4634-8433-9bd29f6e6fb2';
  
  console.log(`📋 Checking logs for task: ${taskId}\n`);
  
  try {
    const logs = await BrowserService.getTaskLogs(taskId);
    
    // Show last 2000 characters (most recent activity)
    const recentLogs = logs.slice(-2000);
    
    console.log('📝 Recent task logs:');
    console.log('='.repeat(80));
    console.log(recentLogs);
    console.log('='.repeat(80));
    
    // Check for key indicators
    if (logs.includes('upload') || logs.includes('image') || logs.includes('screenshot')) {
      console.log('\n✅ Found image upload related activity in logs');
    }
    
    if (logs.includes('posted') || logs.includes('published') || logs.includes('tweet')) {
      console.log('✅ Found post/tweet related activity in logs');
    }
    
  } catch (error: any) {
    console.error('❌ Error fetching logs:', error.message);
  }
}

checkLogs();

