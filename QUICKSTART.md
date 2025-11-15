# Quick Start Guide - DevRel Flow Testing

## Prerequisites
✅ All environment variables set in `/api/.env`
✅ Daytona API key working
✅ Google Gemini API key configured
✅ Database connected

---

## 🚀 Quick Start (5 minutes)

### Terminal 1: Start the API
```bash
cd /Users/omkarpodey/daytona-hackathon/api
npm install  # or bun install
npm run dev  # or bun run dev
```

**Expected Output:**
```
🦊 API is running at localhost:8000
```

### Terminal 2: Start Webhook Server
```bash
cd /Users/omkarpodey/daytona-hackathon/gh-webhook
npm install
npm start
```

**Expected Output:**
```
🚀 Webhook listener running on port 8080

📋 Configuration:
   Webhook Secret: ❌ Not set (signature verification disabled)
   GitHub Token: ❌ Not set
   Sandbox URL: http://localhost:8000/experiment/from-webhook

📡 Listening for GitHub webhooks at:
   POST /
   POST /github-webhook
```

### Terminal 3: Expose via ngrok
```bash
ngrok http 8080
```

**Expected Output:**
```
Forwarding    https://your-unique-url.ngrok-free.app -> http://localhost:8080
```

Copy this URL for GitHub webhook setup.

---

## 🧪 Test Methods

### Method 1: Direct API Call (Fastest)
```bash
curl -X POST http://localhost:8000/experiment/from-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "repo": "Omkar399/hack_ecom",
    "pr": 1,
    "title": "Add product filters",
    "summary": "Added price range and category filters",
    "coderabbitSummary": "## Summary\n✨ Added filter sidebar component\n✨ Integrated filter state management"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "experimentId": "exp_xyz123...",
  "message": "DevRel flow started for PR #1"
}
```

**Expected Console Output (API Terminal):**
```
✅ Created experiment: exp_xyz123...
✅ Triggered DevRel flow for PR #1

[timestamp] 🔔 Received GitHub webhook for PR merge
   PR: 1
   Title: Add product filters
   Repo: Omkar399/hack_ecom

📦 Creating sandbox with TypeScript language...
✅ Sandbox created!
   Sandbox ID: sdbx_...

📥 Cloning repository...
✅ Repository cloned

🚀 Starting dev server with PM2...
⏳ Waiting for dev server to initialize (3 seconds)...

🌐 Generating browser task...
📝 Generated task prompt: "Visit the e-commerce website and browse for products as if you're..."

📹 Browser task created: task_...
⏳ Waiting for browser task to complete...
✅ Browser task completed with status: finished

🖼️  Found 5 screenshots

📝 Generating social media post...
✅ Social media post generated
Post content:
🎉 Exciting new feature! We've just released product filters to make shopping easier!
Browse by price, category, and more - just what you asked for! 🛍️
#NewFeature #Ecommerce #Shopping

✅ Experiment completed
```

### Method 2: Real GitHub Webhook (Production Test)

1. **Configure GitHub Webhook:**
   - Go to your repo: Settings → Webhooks → Add webhook
   - Payload URL: `https://your-ngrok-url.ngrok-free.app/`
   - Content type: `application/x-www-form-urlencoded`
   - Events: Pull requests
   - Active: ✅

2. **Merge a PR on GitHub**

3. **Watch logs in Terminal 2 (Webhook):**
```
🚀 Webhook listener running on port 8080

🔔 GitHub webhook received
Event Type: pull_request
Action: closed
Repository: Omkar399/hack_ecom

📤 Posting to API: {
  "repo": "Omkar399/hack_ecom",
  "pr": 3,
  "title": "Add cart summary",
  ...
}

📊 API response status: 200
```

4. **Watch logs in Terminal 1 (API):**
   - Same as "Method 1" above

---

## 📊 Monitor Progress

### Check Experiment Status
```bash
curl http://localhost:8000/experiment
```

### Get Specific Experiment
```bash
curl http://localhost:8000/experiment/exp_xyz123
```

**Expected Response:**
```json
[{
  "id": "exp_xyz123",
  "repoUrl": "https://github.com/Omkar399/hack_ecom",
  "goal": "Add product filters",
  "status": "completed",
  "variantSuggestions": [
    "🎉 Exciting new feature! We've just released product filters..."
  ],
  "createdAt": "2025-11-15T16:45:00.000Z",
  "updatedAt": "2025-11-15T16:52:00.000Z"
}]
```

---

## 🐛 Troubleshooting

### ❌ "Connection refused" to API
```bash
# Check if API is running
curl http://localhost:8000/health
# Should return: OK

# If not, restart API:
cd api && npm run dev
```

### ❌ "Sandbox creation failed"
```
Error: DAYTONA_API_KEY not set

Solution:
1. Check /api/.env has DAYTONA_API_KEY
2. Verify the key is valid
3. Restart API after updating .env
```

### ❌ "Browser agent timing out"
```
Error: Task did not complete within 300000ms

Solution:
1. Increase timeout in Experiment.jobs.ts (line ~97)
2. Check if dev server actually started in sandbox
3. Verify port 3000 is correct for your app
```

### ❌ "Social post not generating"
```
Error: Property 'generateSocialMediaPost' does not exist

Solution:
1. Make sure you're using the updated Ai.service.ts
2. Check GOOGLE_GENERATIVE_AI_API_KEY in .env
3. Restart API after making changes
```

### ❌ "Webhook not being called"
```
No incoming webhook in Terminal 2

Solution:
1. Check GitHub webhook URL (should be ngrok URL + endpoint)
2. Verify webhook is active in GitHub settings
3. Check GitHub Actions tab for failed deliveries
4. Restart ngrok to get fresh URL, update GitHub webhook
```

---

## ✅ Success Checklist

After running Method 1 test, you should see:

- [x] API responds with success: true
- [x] Experiment ID generated
- [x] Console shows "Sandbox created"
- [x] Console shows "Repository cloned"
- [x] Console shows "Dev server running"
- [x] Console shows "Browser task completed"
- [x] Console shows "X screenshots found"
- [x] Console shows "Social post generated"
- [x] Console shows "Experiment completed"
- [x] Database query shows new experiment record

---

## 📈 Next Steps After Testing

1. **Customize the social post template**
   - Edit `Ai.service.ts` → `generateSocialMediaPost()` method
   - Adjust tone, hashtags, CTAs

2. **Test with real repository**
   - Merge actual PR on your repo
   - Monitor the full flow

3. **Deploy to production**
   - Update `SANDBOX_URL` in gh-webhook/.env
   - Point to production API URL

4. **Monitor in production**
   - Set up logging
   - Create alerts for failures
   - Track social post performance

---

## 📞 Example Payloads

### For Testing
```json
{
  "repo": "Omkar399/hack_ecom",
  "pr": 1,
  "title": "Add product filters",
  "summary": "Added filters by price, category, and more",
  "coderabbitSummary": "✨ Added FilterPanel component\n✨ Integrated Redux state for filters"
}
```

### With CodeRabbit Summary
```json
{
  "repo": "user/repo",
  "pr": 42,
  "title": "New checkout experience",
  "summary": "Redesigned checkout flow",
  "coderabbitSummary": "## Summary by CodeRabbit\n\n### Changes Made\n- Redesigned checkout UI\n- Added payment method selector\n- Improved error handling\n- Added order review page\n\n### Files Modified\n- checkout/CheckoutPage.tsx\n- checkout/PaymentForm.tsx\n- types/order.ts"
}
```

---

## 🎯 That's It!

You now have a fully working DevRel flow. When PRs are merged, your system will:
1. ✅ Automatically create a sandbox
2. ✅ Test new features with a browser agent
3. ✅ Capture screenshots
4. ✅ Generate engaging social media posts

**Happy automating! 🚀**
