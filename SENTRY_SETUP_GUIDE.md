# Sentry Integration Setup Guide

## ✅ What's Been Done

I've integrated Sentry error monitoring and performance tracking into your backend API. Here's what's configured:

### Files Created/Modified

1. ✅ **`api/src/lib/sentry.ts`** - Sentry configuration and helper functions
2. ✅ **`api/src/lib/env.ts`** - Added SENTRY_DSN and NODE_ENV to environment schema
3. ✅ **`api/src/index.ts`** - Initialize Sentry and global error handling
4. ✅ **`api/src/service/experiment/Experiment.service.ts`** - Added performance tracking

### Features Implemented

✅ **Error Tracking**
- All unhandled errors are automatically captured
- Full stack traces with source context
- Request details (URL, method, headers)

✅ **Performance Monitoring**
- Transaction tracking for repository initialization
- Span tracking for each operation:
  - Sandbox creation (with retry tracking)
  - Git clone
  - npm install
  - Dev server start
- Performance measurements for each step

✅ **Context & Breadcrumbs**
- Experiment context attached to all events
- Variant context for tracking
- Breadcrumb trail showing actions leading to errors

✅ **Smart Filtering**
- Development mode: errors logged to console (not sent to Sentry)
- Production mode: all errors sent to Sentry
- Ignored common non-actionable errors

---

## 🚀 Installation Steps

### Step 1: Install Sentry Packages

```bash
cd api

# If using bun (recommended)
bun add @sentry/node @sentry/bun

# If using npm
npm install @sentry/node @sentry/bun
```

### Step 2: Create Sentry Account & Project

1. Go to https://sentry.io/signup/
2. Create a free account
3. Create a new project:
   - Platform: **Node.js**
   - Project name: `daytona-hack-api`
4. Copy your DSN (Data Source Name)
   - It looks like: `https://abc123@o1234.ingest.sentry.io/5678`

### Step 3: Configure Environment Variables

Create or update `api/.env`:

```env
# Existing variables
DAYTONA_API_KEY=your_key
BROWSER_USE_API_KEY=your_key
DATABASE_URL=your_db_url
GOOGLE_GENERATIVE_AI_API_KEY=your_key
ANTHROPIC_API_KEY=your_key

# New Sentry configuration
SENTRY_DSN=https://your_key@oXXXX.ingest.sentry.io/XXXXXX
NODE_ENV=development  # or 'production'
```

**Important:** 
- In `development` mode, errors are logged to console (not sent to Sentry)
- To test Sentry in development, set: `SENTRY_ENABLED=true`
- In `production` mode, all errors are sent to Sentry

### Step 4: Start the Server

```bash
cd api
bun run dev
```

You should see:
```
✅ Sentry initialized
🦊 API is running at 0.0.0.0:8000
```

---

## 🧪 Testing the Integration

### Test 1: Manual Error Test

Visit this endpoint to trigger a test error:
```bash
curl http://localhost:8000/sentry-test
```

This should:
1. Throw an error
2. Show in your terminal (if in dev mode)
3. Appear in Sentry dashboard (if SENTRY_ENABLED=true or NODE_ENV=production)

### Test 2: Run an Experiment

Create a new experiment through your UI or API:

```bash
curl -X POST http://localhost:8000/experiment \
  -H "Content-Type: application/json" \
  -d '{
    "repoUrl": "https://github.com/your-repo",
    "goal": "Test Sentry integration"
  }'
```

Then check Sentry for:
- Performance data (transaction: "Initialize Repository")
- Timing for each step (sandbox, clone, install, server)
- Any errors that occurred

---

## 📊 What You'll See in Sentry

### 1. Errors Dashboard

When an experiment fails, you'll see:

```
DaytonaTimeoutError: Sandbox creation timed out
  at ExperimentService.initRepository (Experiment.service.ts:274)
  at runExperimentJob (Experiment.jobs.ts:26)

Tags:
  experimentId: experiment_xyz123
  attempt: 3
  operation: init_repository
  
Context:
  experiment:
    id: experiment_xyz123
    repoUrl: https://github.com/example/repo
    
Breadcrumbs:
  1. Starting repository initialization
  2. Sandbox creation attempt 1
  3. Sandbox creation attempt 2
  4. Sandbox creation attempt 3 (failed)
```

### 2. Performance Dashboard

For successful experiments, you'll see:

```
Transaction: Initialize Repository
Duration: 185s
Status: ok

Spans:
├─ daytona.create_sandbox    45s  (🔴 slower than usual)
├─ git.clone                  8s   (✅ normal)
├─ npm.install               23s   (✅ normal)
└─ server.start              12s   (✅ normal)

Measurements:
- sandbox_creation_time: 45,000ms
- git_clone_time: 8,000ms
- npm_install_time: 23,000ms
- server_start_time: 12,000ms
```

### 3. Retry Tracking

When sandbox creation retries, you'll see:

```
Warning: Sandbox creation failed (attempt 1/3)
Warning: Sandbox creation failed (attempt 2/3)
Error: Sandbox creation failed (attempt 3/3)

Each with full context about what happened.
```

---

## ⚙️ Configuration Options

### Adjusting Sample Rates

In `api/src/lib/sentry.ts`:

```typescript
// Current: 100% in dev, 10% in production
tracesSampleRate: env.NODE_ENV === 'production' ? 0.1 : 1.0,

// To change:
// - 1.0 = 100% of transactions tracked
// - 0.1 = 10% of transactions tracked (saves quota)
// - 0.01 = 1% of transactions tracked
```

### Adding Custom Context

Anywhere in your code:

```typescript
import { Sentry, addBreadcrumb } from '@/lib/sentry';

// Add breadcrumb
addBreadcrumb('User clicked button', 'ui', { buttonId: 'submit' });

// Add custom context
Sentry.setContext('custom', {
  userId: 'user_123',
  planType: 'pro',
});

// Capture custom error
try {
  // risky operation
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      feature: 'my-feature',
    },
  });
}
```

---

## 📈 Setting Up Alerts

### In Sentry Dashboard:

1. Go to **Alerts** → **Create Alert**
2. Choose **Issues** or **Metrics**
3. Set conditions:

**Example Alert: High Failure Rate**
```
When: error count
is: above 5
in: 1 hour
then: Send email/Slack notification
```

**Example Alert: Slow Sandbox Creation**
```
When: transaction duration (experiment.init)
is: above 120 seconds
in: 10 minutes
then: Send email/Slack notification
```

---

## 🔍 Debugging Common Issues

### Issue: "Sentry DSN not configured"

**Solution:** Add `SENTRY_DSN` to your `.env` file

### Issue: "Errors not showing in Sentry"

**Possible causes:**
1. You're in development mode without `SENTRY_ENABLED=true`
2. Your DSN is incorrect
3. Network issues blocking requests to Sentry

**Solution:**
```bash
# Test with explicit enable
SENTRY_ENABLED=true bun run dev

# Or switch to production mode
NODE_ENV=production bun run dev
```

### Issue: "Too many events, quota exceeded"

**Solution:** Reduce sample rate in production:
```typescript
// In sentry.ts
tracesSampleRate: 0.05,  // Only 5% of transactions
```

---

## 🎯 Next Steps

### 1. Frontend Integration (Optional)

Install Sentry for Next.js:
```bash
cd web
npx @sentry/wizard@latest -i nextjs
```

This will:
- Install `@sentry/nextjs`
- Create `sentry.client.config.ts`
- Create `sentry.server.config.ts`
- Update `next.config.ts`

### 2. Add Browser Service Tracking

Update `api/src/service/browser/Browser.service.ts`:

```typescript
import { Sentry, addBreadcrumb } from '@/lib/sentry';

static async createTask(task: string, url?: string) {
  addBreadcrumb('Creating browser task', 'browser', { task, url });
  
  try {
    const taskData = await browserUse.tasks.createTask({
      task,
      startUrl: url,
    });
    
    return taskData;
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        operation: 'create_browser_task',
      },
    });
    throw error;
  }
}
```

### 3. Add AI Service Tracking

Update `api/src/service/ai/Ai.service.ts`:

```typescript
import { Sentry, addBreadcrumb } from '@/lib/sentry';

static async analyzeBrowserLogs(logs: string, goal: string) {
  addBreadcrumb('Analyzing browser logs with AI', 'ai', { 
    logsLength: logs.length, 
    goal 
  });
  
  const startTime = Date.now();
  
  try {
    const { text } = await generateText({
      model,
      prompt: `...`,
    });
    
    const duration = Date.now() - startTime;
    Sentry.setMeasurement('ai_analysis_time', duration, 'millisecond');
    
    return JSON.parse(text);
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        operation: 'analyze_browser_logs',
        model: 'gemini-2.0-flash-lite',
      },
    });
    throw error;
  }
}
```

---

## 📚 Resources

- **Sentry Docs:** https://docs.sentry.io
- **Bun Integration:** https://docs.sentry.io/platforms/javascript/guides/bun/
- **Performance Monitoring:** https://docs.sentry.io/product/performance/
- **Best Practices:** https://docs.sentry.io/platforms/javascript/best-practices/

---

## ✅ Checklist

- [ ] Install Sentry packages (`@sentry/node @sentry/bun`)
- [ ] Create Sentry account at sentry.io
- [ ] Create project and copy DSN
- [ ] Add SENTRY_DSN to `.env`
- [ ] Start server and verify "✅ Sentry initialized" message
- [ ] Test with `/sentry-test` endpoint
- [ ] Run a real experiment and check Sentry dashboard
- [ ] Set up alerts for critical errors
- [ ] (Optional) Integrate frontend monitoring

---

**You're all set!** Sentry is now tracking all errors and performance metrics in your API. 🎉

Check your Sentry dashboard at: https://sentry.io/organizations/your-org/issues/

