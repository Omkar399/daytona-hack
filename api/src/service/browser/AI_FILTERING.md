# AI-Powered Screenshot Filtering

## Overview

Instead of using static rules and keyword matching, we use an **LLM (Gemini 2.0 Flash)** to intelligently select the most important screenshots from browser automation tasks.

## Why AI Filtering?

### ❌ **Problems with Rule-Based Filtering**

```typescript
// Static rules are too rigid:
if (description.includes('cart')) score += 10;
if (description.includes('waiting')) score -= 5;
if (timeDiff < 5) skip();
// ⚠️ Misses context, can't adapt, hard to maintain
```

### ✅ **Benefits of AI Filtering**

1. **Context-Aware** - Understands the narrative flow and importance
2. **Adaptive** - Works for ANY feature without hardcoded keywords
3. **Semantic Understanding** - Knows "registration successful" > "waiting for page"
4. **Reasoning** - Can explain WHY it chose specific screenshots
5. **Story-Telling** - Selects screenshots that tell a coherent story

---

## How It Works

### **Step 1: Browser Agent Captures Screenshots**

```
Browser agent runs and captures 30-50 screenshots with descriptions:
1. "Navigating to events page"
2. "Waiting for page to load"
3. "Clicked Register Now on React Workshop"
4. "Registration form appeared"
5. "Waiting for submission..."
... 45 more ...
```

### **Step 2: AI Analyzes All Descriptions**

```typescript
const filtered = await AiService.filterScreenshotsWithAI(allScreenshots, {
  maxScreenshots: 8,
  featureDescription: "Shopping cart for event registration",
  priorityKeywords: ['cart', 'register', 'checkout']
});
```

The AI receives:
- All 50 screenshot descriptions
- The feature being tested
- Priority keywords (hints, not rules)
- Target: Select exactly 8 screenshots

### **Step 3: AI Reasoning Process**

The AI considers:
1. **Importance** - Does this show a key action or result?
2. **Uniqueness** - Is this different from other screenshots?
3. **Story Flow** - Does this contribute to the narrative?
4. **User Value** - Would this interest social media viewers?
5. **Completeness** - First (start) + Last (result) + Key moments

### **Step 4: AI Returns Selection + Reasoning**

```json
{
  "selected": [1, 8, 15, 22, 28, 35, 42, 50],
  "reasoning": "Selected screenshots that show the complete user journey: 
   initial page load, clicking register, form submission, cart update with 
   items, checkout process, and final success confirmation. Removed 
   repetitive waiting/loading steps and focused on user actions and results."
}
```

---

## Usage Examples

### **Basic Usage (Default Settings)**

```typescript
// In Experiment.jobs.ts
const allScreenshots = taskSteps
  .filter(step => step.screenshotUrl)
  .map(step => ({
    url: step.screenshotUrl,
    description: step.nextGoal || step.memory,
    stepNumber: step.number
  }));

// AI automatically filters to 8 best screenshots
const screenshots = await AiService.filterScreenshotsWithAI(allScreenshots);
```

### **Custom Configuration**

```typescript
const screenshots = await AiService.filterScreenshotsWithAI(allScreenshots, {
  maxScreenshots: 10,                    // Want more screenshots
  featureDescription: "Real-time chat with emoji reactions",
  priorityKeywords: ['message', 'emoji', 'sent', 'received']
});
```

### **Via BrowserService Helper**

```typescript
// Even simpler - one call does it all
const screenshots = await BrowserService.getFilteredTaskScreenshots(taskId, {
  maxScreenshots: 8,
  featureDescription: prTitle,
  priorityKeywords: ['cart', 'checkout', 'success']
});
```

---

## AI Prompt Strategy

### **What We Tell the AI:**

```
You are analyzing browser automation screenshots for a social media post.

Select the 8 MOST IMPORTANT screenshots that:
1. Show key user actions (clicking, typing, submitting)
2. Show important UI states (cart updates, success messages)
3. Tell a clear story from start to finish
4. Remove boring steps (waiting, loading, scrolling)
5. Avoid repetition (don't pick similar screenshots)
6. Keep first and last (show journey)
```

### **Why This Works:**

- ✅ Clear objective: "social media post"
- ✅ Specific criteria: "key actions", "avoid boring"
- ✅ Guardrails: "first and last", "no repetition"
- ✅ Structured output: JSON with reasoning

---

## Example AI Selection

### **Input: 30 Screenshots**

```
1. "Navigating to events page"
2. "Waiting for page to load"
3. "Page loaded successfully"
4. "Scrolling to view events"
5. "Observing React Workshop event card"
6. "Clicked Register Now button"
7. "Waiting for registration"
8. "Registration confirmed for React Workshop"
9. "Scrolling to find more events"
10. "Observing Python Bootcamp card"
11. "Clicked Register Now for Python Bootcamp"
12. "Waiting for registration"
13. "Registration confirmed for Python Bootcamp"
14. "Scrolling down page"
15. "Observing Data Science Summit"
16. "Clicked Register Now for Data Science"
17. "Registration confirmed for Data Science"
18. "Navigating to My Events"
19. "Waiting for My Events page"
20. "My Events page loaded"
21. "Viewing registered events list"
22. "Cart showing 3 events: React, Python, Data Science"
23. "Total cost displayed: $125"
24. "Scrolling in My Events"
25. "Clicked Clear All button"
26. "Confirmation dialog appeared"
27. "Clicked Cancel on dialog"
28. "Still showing 3 events"
29. "Final state with all registrations"
30. "Task completed successfully"
```

### **AI Output: 8 Selected Screenshots**

```json
{
  "selected": [1, 6, 8, 11, 13, 18, 22, 30],
  "reasoning": "Selected screenshots showing complete registration journey:
   - Screenshot 1: Initial page (starting point)
   - Screenshots 6, 11: Key user actions (registering for events)
   - Screenshots 8, 13: Registration confirmations (feedback)
   - Screenshot 18: Navigation to My Events (transition)
   - Screenshot 22: Cart with all items and total (main result)
   - Screenshot 30: Task completion (ending)
   
   Removed: repetitive waiting/scrolling steps, redundant observations, 
   and the Clear All action which didn't complete."
}
```

### **Visual Representation:**

```
❌ 1. Initial page             ✅ KEEP (start)
❌ 2. Waiting...
❌ 3. Page loaded
❌ 4. Scrolling
❌ 5. Observing card
✅ 6. Clicked Register         ✅ KEEP (action)
❌ 7. Waiting...
✅ 8. Confirmed React          ✅ KEEP (result)
❌ 9. Scrolling
❌ 10. Observing card
✅ 11. Clicked Register        ✅ KEEP (action)
❌ 12. Waiting...
✅ 13. Confirmed Python        ✅ KEEP (result)
❌ 14-17. More actions (similar pattern)
✅ 18. Navigated to My Events  ✅ KEEP (transition)
❌ 19-21. Waiting and loading
✅ 22. Cart with 3 events      ✅ KEEP (main result)
❌ 23-29. Additional interactions
✅ 30. Task complete           ✅ KEEP (end)
```

---

## Performance & Cost

### **API Usage**

- **Model**: Gemini 2.0 Flash Lite (fast + cheap)
- **Input**: ~500-1500 tokens (descriptions only, no images)
- **Output**: ~100-200 tokens (JSON response)
- **Cost**: ~$0.0001 per filtering operation
- **Speed**: ~1-2 seconds

### **Optimization**

```typescript
// ✅ Efficient - only filter if needed
if (screenshots.length <= maxScreenshots) {
  return screenshots; // Skip AI call
}

// ✅ Fallback - if AI fails, use simple heuristics
catch (error) {
  return fallbackScreenshotSelection(screenshots);
}
```

---

## Fallback Strategy

If AI filtering fails (API error, invalid response, etc.), we fallback to simple heuristics:

```typescript
fallbackScreenshotSelection(screenshots, maxScreenshots) {
  // 1. Remove boring screenshots
  const meaningful = screenshots.filter(s => 
    !s.description.includes('waiting') &&
    !s.description.includes('loading') &&
    !s.description.includes('scrolling')
  );
  
  // 2. Keep first and last
  const result = [meaningful[0]];
  
  // 3. Sample middle evenly
  const step = Math.floor(meaningful.length / maxScreenshots);
  for (let i = step; i < meaningful.length - 1; i += step) {
    result.push(meaningful[i]);
  }
  
  // 4. Add last
  result.push(meaningful[meaningful.length - 1]);
  
  return result;
}
```

---

## Monitoring & Debugging

### **Console Logs**

```
🖼️  Found 35 screenshots
🤖 Using AI to filter 35 screenshots down to 8...
✅ AI reasoning: Selected screenshots showing complete registration 
   journey with key actions and results, removed repetitive steps
✅ Filtered from 35 to 8 screenshots
   Selected steps: 1, 6, 8, 11, 13, 18, 22, 30
```

### **If AI Fails**

```
❌ Error parsing AI response, falling back to smart selection
🔄 Using fallback selection method...
✅ Filtered from 35 to 8 screenshots using fallback
```

---

## Customization

### **Adjust for Different Features**

```typescript
// E-commerce cart
await AiService.filterScreenshotsWithAI(screenshots, {
  maxScreenshots: 8,
  featureDescription: "Shopping cart with real-time price updates",
  priorityKeywords: ['cart', 'price', 'checkout', 'total', 'add', 'remove']
});

// Authentication flow
await AiService.filterScreenshotsWithAI(screenshots, {
  maxScreenshots: 6,
  featureDescription: "OAuth login with Google",
  priorityKeywords: ['login', 'google', 'authorize', 'success', 'profile']
});

// Dashboard analytics
await AiService.filterScreenshotsWithAI(screenshots, {
  maxScreenshots: 10,
  featureDescription: "Real-time analytics dashboard",
  priorityKeywords: ['chart', 'data', 'metrics', 'dashboard', 'export']
});
```

### **Adjust Selection Count**

```typescript
// For detailed tutorials
maxScreenshots: 15

// For quick social posts
maxScreenshots: 4

// For blog posts
maxScreenshots: 12
```

---

## Best Practices

1. ✅ **Provide Feature Description** - Helps AI understand context
2. ✅ **Use Priority Keywords** - Guide AI towards important terms
3. ✅ **Trust the AI** - It often makes better choices than rules
4. ✅ **Check Reasoning** - AI explains its choices (good for debugging)
5. ✅ **Set Reasonable Limits** - 6-10 screenshots work best for social media

---

## Future Improvements

Potential enhancements:

- 🔮 Multi-model ensemble (use multiple LLMs and vote)
- 🔮 Vision analysis (analyze actual images, not just descriptions)
- 🔮 User feedback loop (learn from manual selections)
- 🔮 Platform-specific optimization (Twitter vs LinkedIn vs blog)
- 🔮 A/B testing different selection strategies

---

**The Bottom Line:** AI filtering is smart, adaptive, and dramatically better than static rules. It understands context and makes human-like decisions about what's important. 🤖✨

