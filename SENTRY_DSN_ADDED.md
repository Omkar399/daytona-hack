# ✅ Sentry DSN Ready to Add!

## 🎯 Your Sentry DSN

```
https://bda1ab9ab0a1a4c47e7ffd4567812156@o4510371617439744.ingest.us.sentry.io/4510371636445184
```

---

## 🚀 Quick Setup (2 Steps)

### Step 1: Create/Update Your .env File

Run this command to create your `.env` file with the Sentry DSN:

```bash
cd /Users/nihalnihalani/Desktop/Github/daytona-hack/api

# Copy the example file
cp .env.example .env

# Or create it from scratch
cat > .env << 'EOF'
# Sentry Configuration
SENTRY_DSN=https://bda1ab9ab0a1a4c47e7ffd4567812156@o4510371617439744.ingest.us.sentry.io/4510371636445184
NODE_ENV=development

# Required API Keys (add your existing values)
DAYTONA_API_KEY=your_daytona_api_key
BROWSER_USE_API_KEY=your_browser_use_api_key
DATABASE_URL=your_database_url
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key

# Optional: Enable Sentry in development mode
# SENTRY_ENABLED=true
EOF
```

**Important:** Replace the placeholder values with your actual API keys!

### Step 2: Start the Server

```bash
cd /Users/nihalnihalani/Desktop/Github/daytona-hack/api
bun run dev
```

You should see:
```
✅ Sentry initialized
🦊 API is running at 0.0.0.0:8000
```

---

## 🧪 Test It Works

### Test 1: Verify Sentry is Initialized

```bash
# Start the server
bun run dev

# You should see in the logs:
✅ Sentry initialized
```

### Test 2: Trigger a Test Error

```bash
# In a new terminal:
curl http://localhost:8000/sentry-test

# Expected response:
{
  "error": "Internal Server Error",
  "message": "Test error for Sentry integration",
  "code": "UNKNOWN"
}
```

### Test 3: Check Sentry Dashboard

1. Go to: https://sentry.io/organizations/
2. Find your project
3. Go to **Issues** tab
4. You should see: **"Test error for Sentry integration"**

If you see it, **Sentry is working!** ✅

---

## 🎯 Testing in Development Mode

By default, errors in development mode are only logged to console (not sent to Sentry).

**To test Sentry in development:**

Update your `.env`:
```env
NODE_ENV=development
SENTRY_ENABLED=true  # ← Add this line
```

Then restart the server and test again.

---

## 🚀 For Production

When deploying to production:

```env
NODE_ENV=production
SENTRY_DSN=https://bda1ab9ab0a1a4c47e7ffd4567812156@o4510371617439744.ingest.us.sentry.io/4510371636445184
```

In production mode:
- ✅ All errors sent to Sentry automatically
- ✅ 10% of transactions tracked (to save quota)
- ✅ Alerts trigger on issues

---

## 📊 What to Check in Sentry

### 1. Issues Dashboard

Navigate to: **Issues** → **All Issues**

You'll see:
```
🔴 DaytonaTimeoutError
   Sandbox creation timed out
   3 occurrences
   
⚠️  Test error for Sentry integration
   1 occurrence (from your test)
```

### 2. Performance Dashboard

Navigate to: **Performance** → **Transactions**

You'll see:
```
Transaction: Initialize Repository
├─ Duration: 185s
├─ Throughput: 10/hour
└─ Spans:
    ├─ Sandbox Creation: 45s
    ├─ Git Clone: 8s
    ├─ npm Install: 23s
    └─ Server Start: 12s
```

### 3. Set Up Alerts

Navigate to: **Alerts** → **Create Alert**

**Recommended alerts:**
1. Error count > 5 in 1 hour
2. Sandbox creation time > 60 seconds
3. Any critical errors

---

## ✅ Verification Checklist

- [ ] `.env` file created with Sentry DSN
- [ ] All other API keys added to `.env`
- [ ] Server starts successfully
- [ ] "✅ Sentry initialized" appears in logs
- [ ] Test endpoint returns error: `/sentry-test`
- [ ] Error appears in Sentry dashboard
- [ ] Alerts configured (optional)

---

## 🎉 You're All Set!

Your Sentry integration is ready to use!

**What happens now:**
- ✅ Every error is tracked automatically
- ✅ Every experiment's performance is measured
- ✅ Retry attempts are logged
- ✅ Full context captured for debugging

**Next Steps:**
1. Add your actual API keys to `.env`
2. Start the server: `bun run dev`
3. Run a real experiment
4. Check your Sentry dashboard
5. Set up alerts

---

## 🔗 Quick Links

- **Sentry Dashboard:** https://sentry.io/organizations/
- **Your DSN Location:** `api/.env` → `SENTRY_DSN`
- **Test Endpoint:** http://localhost:8000/sentry-test
- **Documentation:** `SENTRY_SETUP_GUIDE.md`

---

## 💡 Pro Tips

### Tip 1: Test Sentry in Dev Mode

Add to `.env`:
```env
SENTRY_ENABLED=true
```

### Tip 2: See Errors in Console (Dev Mode)

Errors are logged to console by default in dev mode, so you can see them immediately while developing.

### Tip 3: Filter by Experiment ID

In Sentry, search for:
```
tag:experimentId:experiment_abc123
```

This shows all errors/events for a specific experiment.

### Tip 4: Track Custom Events

In your code:
```typescript
import { addBreadcrumb } from '@/lib/sentry';

addBreadcrumb('User action', 'ui', { button: 'submit' });
```

---

## 🐛 Troubleshooting

### "Module not found: @sentry/bun"

**Solution:** Packages are already installed! Just add the DSN.

### "Sentry DSN not configured"

**Solution:** Make sure `.env` file exists in `api/` directory with the DSN.

### "Errors not showing in Sentry"

**Solutions:**
1. Set `SENTRY_ENABLED=true` in `.env`
2. Or set `NODE_ENV=production`
3. Check your DSN is correct
4. Verify server shows "✅ Sentry initialized"

### "Server won't start"

**Solution:** Make sure all required API keys are in `.env`:
- DAYTONA_API_KEY
- BROWSER_USE_API_KEY
- DATABASE_URL
- GOOGLE_GENERATIVE_AI_API_KEY
- ANTHROPIC_API_KEY

---

**Ready to start monitoring!** 🚀

Run: `cd api && bun run dev`

