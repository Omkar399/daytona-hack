# Sentry Integration Test

## 🧪 How to Test Sentry

### Quick Test (Run These Commands)

```bash
# Terminal 1: Start the API server
cd /Users/nihalnihalani/Desktop/Github/daytona-hack/api
bun run dev

# You should see:
# ✅ Sentry initialized
# 🦊 API is running at 0.0.0.0:8000
```

```bash
# Terminal 2: Run the test script
cd /Users/nihalnihalani/Desktop/Github/daytona-hack
./TEST_SENTRY.sh
```

**OR manually test:**

```bash
# Test 1: Health check
curl http://localhost:8000/health
# Expected: OK

# Test 2: Sentry error test
curl http://localhost:8000/sentry-test
# Expected: {"error":"Internal Server Error","message":"Test error for Sentry integration","code":"UNKNOWN"}
```

---

## ✅ What to Look For

### 1. Server Startup Logs

When you start the server (`bun run dev`), you should see:

```
✅ Sentry initialized
🦊 API is running at 0.0.0.0:8000
```

**If you see this:** ✅ Sentry is configured correctly!

**If you see "⚠️ Sentry DSN not configured":**
- Check your `api/.env` file
- Make sure `SENTRY_DSN` is set

### 2. Error Endpoint Response

When you hit `/sentry-test`:

```json
{
  "error": "Internal Server Error",
  "message": "Test error for Sentry integration",
  "code": "UNKNOWN"
}
```

**If you see this:** ✅ Error handler is working!

### 3. Sentry Dashboard

Go to: **https://sentry.io**

Navigate to: **Issues** tab

**What you should see:**
```
🔴 Test error for Sentry integration
   UnknownException
   at GET /sentry-test
   
   First seen: Just now
   Last seen: Just now
   Events: 1
```

**If you see this:** ✅ Sentry is tracking errors!

---

## 📊 Configuration Verification

### Check 1: Environment File

```bash
cd /Users/nihalnihalani/Desktop/Github/daytona-hack/api
cat .env | grep SENTRY
```

**Expected output:**
```
SENTRY_DSN=https://bda1ab9ab0a1a4c47e7ffd4567812156@o4510371617439744.ingest.us.sentry.io/4510371636445184
NODE_ENV=development
```

✅ If you see this, your DSN is configured!

### Check 2: Sentry Library

```bash
cd /Users/nihalnihalani/Desktop/Github/daytona-hack/api
cat package.json | grep sentry
```

**Expected output:**
```
"@sentry/bun": "^10.25.0",
"@sentry/node": "^10.25.0",
```

✅ If you see this, Sentry packages are installed!

### Check 3: Sentry Config File

```bash
cat api/src/lib/sentry.ts | head -20
```

**Should show:**
```typescript
import * as Sentry from '@sentry/bun';
import { env } from './env';

export const initializeSentry = () => {
  if (!env.SENTRY_DSN) {
    console.log('⚠️  Sentry DSN not configured, skipping initialization');
    return;
  }
  ...
}
```

✅ If you see this, Sentry code is integrated!

---

## 🎯 Test Checklist

Run through this checklist:

- [ ] `.env` file exists with `SENTRY_DSN`
- [ ] Sentry packages in `package.json`
- [ ] `api/src/lib/sentry.ts` file exists
- [ ] Server starts without errors
- [ ] See "✅ Sentry initialized" in logs
- [ ] Health endpoint works: `curl http://localhost:8000/health`
- [ ] Test endpoint works: `curl http://localhost:8000/sentry-test`
- [ ] Error appears in Sentry dashboard

---

## 🐛 Troubleshooting

### Issue: "Sentry DSN not configured"

**Problem:** Missing or incorrect DSN in `.env`

**Solution:**
```bash
cd api
cat .env | grep SENTRY_DSN
```

If empty, add:
```env
SENTRY_DSN=https://bda1ab9ab0a1a4c47e7ffd4567812156@o4510371617439744.ingest.us.sentry.io/4510371636445184
```

### Issue: "Module not found: @sentry/bun"

**Problem:** Packages not installed

**Solution:**
```bash
cd api
bun add @sentry/node @sentry/bun
```

### Issue: Error not appearing in Sentry

**Problem:** Development mode doesn't send to Sentry by default

**Solution 1:** Enable Sentry in dev mode

Edit `api/.env`:
```env
SENTRY_ENABLED=true
```

**Solution 2:** Use production mode

Edit `api/.env`:
```env
NODE_ENV=production
```

Then restart the server.

### Issue: "404 Not Found" on /sentry-test

**Problem:** Old server running or routes not loaded

**Solution:**
```bash
# Kill all bun processes
pkill -f "bun run dev"

# Start fresh
cd api
bun run dev
```

---

## 📈 Expected Performance

Once working, every experiment will track:

```
Transaction: Initialize Repository
├─ Sandbox Creation:  ~45s
├─ Git Clone:         ~8s
├─ npm Install:       ~23s
└─ Server Start:      ~12s
Total: ~88s
```

All this data will be visible in:
- Sentry → Performance → Transactions

---

## 🎉 Success Indicators

### ✅ Fully Working

If you see ALL of these:

1. ✅ Server starts with "✅ Sentry initialized"
2. ✅ `/sentry-test` returns error JSON
3. ✅ Error appears in Sentry Issues dashboard
4. ✅ Console shows error details (dev mode)

**You're done!** Sentry is fully integrated and working.

### ⚠️ Partially Working

If you see SOME of these:

1. ✅ Server starts with "✅ Sentry initialized"
2. ✅ `/sentry-test` returns error JSON
3. ❌ Error NOT in Sentry dashboard

**Solution:** You're in dev mode. Set `SENTRY_ENABLED=true` or `NODE_ENV=production` in `.env`

### ❌ Not Working

If you see:

1. ❌ "Sentry DSN not configured" in logs
2. ❌ `/sentry-test` returns 404

**Solution:** 
1. Verify `.env` file exists with SENTRY_DSN
2. Restart server
3. Check for typos in DSN

---

## 🔗 Quick Links

- **Sentry Dashboard:** https://sentry.io
- **Test Script:** `./TEST_SENTRY.sh`
- **API Server:** http://localhost:8000
- **Health Check:** http://localhost:8000/health
- **Test Error:** http://localhost:8000/sentry-test

---

## 📝 Notes

### Development Mode

By default, errors are logged to console (not sent to Sentry).

To test Sentry in development:
```env
SENTRY_ENABLED=true
```

### Production Mode

All errors automatically sent to Sentry:
```env
NODE_ENV=production
```

### Sample Rate

- Development: 100% of transactions tracked
- Production: 10% of transactions tracked (to save quota)

---

**Ready to test?** Run the commands above! 🚀

