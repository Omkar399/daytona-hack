import { AiService } from '@/service/ai/Ai.service';

/**
 * Test AI screenshot filtering with mock data
 * This simulates what would happen with real browser screenshots
 */
async function testAIFiltering() {
  console.log('🧪 Testing AI Screenshot Filtering\n');

  // Simulate screenshots captured from browser automation
  const mockScreenshots = [
    { url: 'https://screenshot1.jpg', description: 'Navigated to events page', stepNumber: 1 },
    { url: 'https://screenshot2.jpg', description: 'Waiting for page to load', stepNumber: 2 },
    { url: 'https://screenshot3.jpg', description: 'Page loaded successfully', stepNumber: 3 },
    { url: 'https://screenshot4.jpg', description: 'Scrolling down to view events', stepNumber: 4 },
    { url: 'https://screenshot5.jpg', description: 'Clicked Register Now on React Workshop', stepNumber: 5 },
    { url: 'https://screenshot6.jpg', description: 'Waiting for registration to process', stepNumber: 6 },
    { url: 'https://screenshot7.jpg', description: 'Registration confirmed for React Workshop', stepNumber: 7 },
    { url: 'https://screenshot8.jpg', description: 'Scrolling to find more events', stepNumber: 8 },
    { url: 'https://screenshot9.jpg', description: 'Clicked Register Now on Python Bootcamp', stepNumber: 9 },
    { url: 'https://screenshot10.jpg', description: 'Waiting for registration to process', stepNumber: 10 },
    { url: 'https://screenshot11.jpg', description: 'Registration confirmed for Python Bootcamp', stepNumber: 11 },
    { url: 'https://screenshot12.jpg', description: 'Scrolling down page', stepNumber: 12 },
    { url: 'https://screenshot13.jpg', description: 'Clicked Register Now on Data Science Summit', stepNumber: 13 },
    { url: 'https://screenshot14.jpg', description: 'Waiting for registration', stepNumber: 14 },
    { url: 'https://screenshot15.jpg', description: 'Registration confirmed for Data Science Summit', stepNumber: 15 },
    { url: 'https://screenshot16.jpg', description: 'Scrolling to view more events', stepNumber: 16 },
    { url: 'https://screenshot17.jpg', description: 'Clicked Register Now on AI Conference', stepNumber: 17 },
    { url: 'https://screenshot18.jpg', description: 'Registration confirmed for AI Conference', stepNumber: 18 },
    { url: 'https://screenshot19.jpg', description: 'Scrolling down', stepNumber: 19 },
    { url: 'https://screenshot20.jpg', description: 'Clicked Register Now on Web Summit', stepNumber: 20 },
    { url: 'https://screenshot21.jpg', description: 'Registration confirmed for Web Summit', stepNumber: 21 },
    { url: 'https://screenshot22.jpg', description: 'Navigating to My Events page', stepNumber: 22 },
    { url: 'https://screenshot23.jpg', description: 'Waiting for My Events to load', stepNumber: 23 },
    { url: 'https://screenshot24.jpg', description: 'My Events page loaded', stepNumber: 24 },
    { url: 'https://screenshot25.jpg', description: 'Viewing list of registered events', stepNumber: 25 },
    { url: 'https://screenshot26.jpg', description: 'Cart showing 5 events registered', stepNumber: 26 },
    { url: 'https://screenshot27.jpg', description: 'Total cost displayed: $325', stepNumber: 27 },
    { url: 'https://screenshot28.jpg', description: 'Scrolling in My Events', stepNumber: 28 },
    { url: 'https://screenshot29.jpg', description: 'Clicked Clear All button', stepNumber: 29 },
    { url: 'https://screenshot30.jpg', description: 'Confirmation dialog appeared', stepNumber: 30 },
    { url: 'https://screenshot31.jpg', description: 'Clicked Cancel on dialog', stepNumber: 31 },
    { url: 'https://screenshot32.jpg', description: 'Still showing 5 registered events', stepNumber: 32 },
    { url: 'https://screenshot33.jpg', description: 'Scrolling to verify all events', stepNumber: 33 },
    { url: 'https://screenshot34.jpg', description: 'Final view of registered events', stepNumber: 34 },
    { url: 'https://screenshot35.jpg', description: 'Task completed successfully', stepNumber: 35 },
  ];

  console.log(`📊 Input: ${mockScreenshots.length} screenshots`);
  console.log('\nOriginal screenshots:');
  mockScreenshots.forEach((s, idx) => {
    console.log(`  ${idx + 1}. [Step ${s.stepNumber}] ${s.description}`);
  });

  console.log('\n' + '='.repeat(70));
  console.log('Running AI Filter...');
  console.log('='.repeat(70) + '\n');

  try {
    const filtered = await AiService.filterScreenshotsWithAI(mockScreenshots, {
      maxScreenshots: 5,
      featureDescription: 'Event registration with cart management',
      priorityKeywords: ['register', 'cart', 'events', 'total', 'success']
    });

    console.log('\n' + '='.repeat(70));
    console.log('✅ RESULTS');
    console.log('='.repeat(70));
    console.log(`\n📸 Filtered to ${filtered.length} screenshots:\n`);
    
    filtered.forEach((s, idx) => {
      console.log(`  ${idx + 1}. [Step ${s.stepNumber}] ${s.description}`);
    });

    // Check diversity
    console.log('\n🔍 Diversity Analysis:');
    const descriptions = filtered.map(s => s.description);
    const hasDuplicates = descriptions.length !== new Set(descriptions).size;
    
    if (hasDuplicates) {
      console.log('   ❌ WARNING: Duplicate descriptions found!');
    } else {
      console.log('   ✅ All descriptions are unique');
    }

    // Check distribution
    const stepNumbers = filtered.map(s => s.stepNumber || 0).sort((a, b) => a - b);
    const gaps = [];
    for (let i = 1; i < stepNumbers.length; i++) {
      gaps.push(stepNumbers[i] - stepNumbers[i - 1]);
    }
    const avgGap = gaps.reduce((a, b) => a + b, 0) / gaps.length;
    
    console.log(`\n📏 Distribution:`);
    console.log(`   Step range: ${stepNumbers[0]} to ${stepNumbers[stepNumbers.length - 1]}`);
    console.log(`   Average gap: ${avgGap.toFixed(1)} steps`);
    console.log(`   Gaps between selected steps: ${gaps.join(', ')}`);
    
    if (Math.max(...gaps) > avgGap * 3) {
      console.log('   ⚠️  WARNING: Large gap detected, might be clustered');
    } else {
      console.log('   ✅ Screenshots are well distributed');
    }

    // Check for boring screenshots
    const boringKeywords = ['waiting', 'scrolling', 'loading', 'observing'];
    const boringCount = filtered.filter(s => 
      boringKeywords.some(keyword => s.description.toLowerCase().includes(keyword))
    ).length;
    
    console.log(`\n💤 Boring Screenshots: ${boringCount}/${filtered.length}`);
    if (boringCount > 0) {
      console.log('   ⚠️  Some boring screenshots were selected');
      filtered.forEach((s, idx) => {
        const isBoring = boringKeywords.some(k => s.description.toLowerCase().includes(k));
        if (isBoring) {
          console.log(`      - Screenshot ${idx + 1}: "${s.description}"`);
        }
      });
    } else {
      console.log('   ✅ No boring screenshots selected');
    }

  } catch (error: any) {
    console.error('\n❌ Error during filtering:', error.message);
    console.error(error);
  }
}

testAIFiltering();

