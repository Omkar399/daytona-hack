# Sentry Integration - Quick Start ⚡

## 🚀 3-Minute Setup

### 1. Install Packages (1 min)

```bash
cd /Users/nihalnihalani/Desktop/Github/daytona-hack/api
bun add @sentry/node @sentry/bun
```

### 2. Get Your DSN (1 min)

1. Go to https://sentry.io/signup/
2. Create project (Node.js)
3. Copy your DSN
   - Format: `https://abc123@o1234.ingest.sentry.io/5678`

### 3. Configure Environment (30 sec)

Add to `api/.env`:

```env
SENTRY_DSN=your_dsn_here
NODE_ENV=development
```

### 4. Start & Test (30 sec)

```bash
bun run dev

# Test it works
curl http://localhost:8000/sentry-test
```

**Done!** ✅ Sentry is now tracking all errors and performance.

---

## 📊 What You Get

### Automatic Error Tracking

All errors are captured with:
- ✅ Full stack trace
- ✅ Request details (URL, method, headers)
- ✅ Experiment context (ID, repo URL)
- ✅ Retry attempt information
- ✅ Breadcrumb trail

### Performance Monitoring

Every experiment tracked:
- ⏱️ Sandbox creation time
- ⏱️ Git clone duration
- ⏱️ npm install duration  
- ⏱️ Dev server start time
- ⏱️ Total experiment duration

### Smart Retry Tracking

When sandboxes fail:
- 🔄 Attempt 1 → Warning in Sentry
- 🔄 Attempt 2 → Warning in Sentry
- ❌ Attempt 3 → Error in Sentry (with full context)

---

## 🧪 Quick Test

### Test Error Tracking

```bash
# This endpoint throws a test error
curl http://localhost:8000/sentry-test

# Check your terminal (dev mode)
# Or check Sentry dashboard (production)
```

### Test Performance Tracking

Create an experiment:

```bash
curl -X POST http://localhost:8000/experiment \
  -H "Content-Type: application/json" \
  -d '{
    "repoUrl": "https://github.com/RogutKuba/nextjs-sample-commerce",
    "goal": "Test Sentry performance tracking"
  }'
```

Then check Sentry → Performance → Transactions

---

## ⚙️ Configuration

### Development Mode (Default)

```env
NODE_ENV=development
# Errors logged to console (not sent to Sentry)
```

To test Sentry in dev:
```env
NODE_ENV=development
SENTRY_ENABLED=true
```

### Production Mode

```env
NODE_ENV=production
# All errors sent to Sentry
# 10% of transactions tracked (to save quota)
```

---

## 🔍 View Your Data

### Sentry Dashboard

**Errors:** https://sentry.io/organizations/your-org/issues/  
**Performance:** https://sentry.io/organizations/your-org/performance/

### What to Look For

1. **Issues Tab**
   - All errors grouped by type
   - Stack traces
   - Frequency and impact

2. **Performance Tab**
   - Transaction list
   - Slowest operations
   - Breakdown by operation type

3. **Releases Tab**
   - Track errors per deployment
   - Compare release performance

---

## 📈 Set Up Alerts (5 min)

### Alert 1: Experiment Failures

1. Go to **Alerts** → **Create Alert**
2. Choose: **Issues - Errors**
3. Condition: error count **above 3** in **1 hour**
4. Alert name: "High Experiment Failure Rate"
5. Action: Send email/Slack

### Alert 2: Slow Sandbox Creation

1. Go to **Alerts** → **Create Alert**
2. Choose: **Metrics**
3. Metric: `measurements.sandbox_creation_time`
4. Condition: **above 60000ms** (60 seconds)
5. Alert name: "Slow Sandbox Creation"
6. Action: Send notification

---

## 🐛 Troubleshooting

### "Sentry DSN not configured"
Add `SENTRY_DSN=your_dsn` to `api/.env`

### "Errors not showing in Sentry"
Set `NODE_ENV=production` or `SENTRY_ENABLED=true`

### "Module not found: @sentry/bun"
Run: `cd api && bun add @sentry/node @sentry/bun`

---

## 📚 Files Modified

| File | What Changed |
|------|--------------|
| `api/src/lib/sentry.ts` | ✅ New - Sentry config |
| `api/src/lib/env.ts` | ✅ Added SENTRY_DSN |
| `api/src/index.ts` | ✅ Initialize + error handler |
| `api/src/service/experiment/Experiment.service.ts` | ✅ Performance tracking |

---

## 🎯 Next Steps

### Backend Complete ✅

Your API now has:
- ✅ Error tracking
- ✅ Performance monitoring
- ✅ Retry tracking
- ✅ Context & breadcrumbs

### Optional: Frontend Integration

```bash
cd web
npx @sentry/wizard@latest -i nextjs
```

This adds:
- React error boundaries
- Session replay
- Frontend performance tracking

---

## 💡 Pro Tips

1. **Use tags for filtering**
   ```typescript
   Sentry.captureException(error, {
     tags: { feature: 'my-feature' }
   });
   ```

2. **Add user context**
   ```typescript
   Sentry.setUser({ id: 'user_123', email: 'user@example.com' });
   ```

3. **Track custom metrics**
   ```typescript
   Sentry.setMeasurement('custom_metric', 1234, 'millisecond');
   ```

4. **Release tracking**
   - Set `release` in sentry.ts
   - Tag deployments
   - Track errors per release

---

## ✅ Verification Checklist

- [ ] Packages installed (`@sentry/node @sentry/bun`)
- [ ] Sentry account created
- [ ] DSN added to `.env`
- [ ] Server starts with "✅ Sentry initialized"
- [ ] Test endpoint works (`/sentry-test`)
- [ ] Experiment tracking visible in Sentry
- [ ] Alerts configured
- [ ] Team has access to Sentry dashboard

---

**Ready to go!** Your API is now fully monitored. 🎉

For detailed documentation: `SENTRY_SETUP_GUIDE.md`

