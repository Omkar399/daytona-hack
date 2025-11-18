#!/usr/bin/env bun
/**
 * Simple test to post to Twitter/X with an image
 * Uses local browser automation with Claude Sonnet
 */

import { BrowserService } from './src/service/browser/Browser.service';

async function testTwitterPost() {
  console.log('🧪 Testing Twitter Post with Image\n');
  console.log('═'.repeat(60));
  
  // The screenshot URL to attach
  const screenshotUrl = 'https://cdn.browser-use.com/screenshots/136f0428-eea1-4cef-a16f-37774e5cef77/6.png';
  
  // Test post content
  const postContent = `🚀 Testing automated Twitter posting with Browser Use!

This post was created by an AI agent using:
✅ Local browser automation
✅ Claude Sonnet for control
✅ Persistent login sessions
✅ Native file uploads

If you see this image, it worked! 🎉`;

  console.log('📋 Test Configuration:');
  console.log(`   Post length: ${postContent.length} characters`);
  console.log(`   Image URL: ${screenshotUrl}`);
  console.log(`   Using: Local Browser (Python + Claude Sonnet)`);
  console.log(`   Profile: ~/.browser-use-x-profile`);
  console.log('═'.repeat(60));
  console.log('');

  try {
    console.log('🚀 Starting Twitter post...\n');
    
    // Post to X using local browser
    const result = await BrowserService.postToX(postContent, [screenshotUrl], {
      useLocalBrowser: true
    });

    console.log('\n' + '═'.repeat(60));
    console.log('✅ POST COMPLETE!');
    console.log('═'.repeat(60));
    console.log(`   Status: ${result.status}`);
    console.log(`   Task ID: ${result.taskId || 'N/A'}`);
    console.log(`   Screenshots captured: ${result.screenshots?.length || 0}`);
    
    if (result.result) {
      console.log(`   Result: ${result.result}`);
    }
    
    console.log('═'.repeat(60));
    console.log('');
    console.log('📝 Next Steps:');
    console.log('   1. Check your Twitter/X account');
    console.log('   2. Verify the post is visible');
    console.log('   3. Confirm the image displays correctly');
    console.log('');
    
  } catch (error: any) {
    console.error('\n' + '═'.repeat(60));
    console.error('❌ TEST FAILED');
    console.error('═'.repeat(60));
    console.error(`   Error: ${error.message}`);
    
    if (error.stack) {
      console.error('\nStack trace:');
      console.error(error.stack);
    }
    
    console.error('');
    console.error('💡 Troubleshooting:');
    console.error('   1. Check if you\'re logged into X: ./api/open-chrome-login.sh');
    console.error('   2. Verify ANTHROPIC_API_KEY is set in .env');
    console.error('   3. Ensure X_USERNAME and X_PASSWORD are set (for first login)');
    console.error('   4. Check Python venv is set up: ./api/setup-browser-local.sh');
    console.error('');
    
    process.exit(1);
  }
}

// Run the test
testTwitterPost();

