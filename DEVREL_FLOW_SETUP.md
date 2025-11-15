# DevRel Agent Flow Setup ✅

## Overview
Your codebase has been refactored to remove unnecessary Claude Code integration and A/B testing infrastructure. The new simplified flow focuses on:

**GitHub PR Merged → Sandbox Setup → Browser Agent Testing → Screenshots → Social Media Post Generation**

---

## ✅ What Was Done

### 1. **Removed Unnecessary Services**
- ❌ `/src/service/codeAgent/` - Claude Code integration (not needed)
- ❌ `/src/service/agent/` - Agent tracking (simplified)
- ❌ `/src/service/variant/` - A/B testing variants (not needed)

### 2. **Added New Features**
✅ **AI Service - Social Media Post Generator**
- `AiService.generateSocialMediaPost()` - Creates engaging posts with screenshots

✅ **API Endpoint - Webhook Integration**
- `POST /experiment/from-webhook` - Receives PR data and triggers DevRel flow
- Accepts: `repo`, `pr`, `title`, `summary`, `coderabbitSummary`

✅ **Simplified Experiment Job**
- `Experiment.jobs.ts` - New streamlined flow:
  1. Initialize repository (clone + install + dev server)
  2. Generate browser automation task
  3. Run browser agent (capture screenshots)
  4. Extract screenshots from task steps
  5. Generate social media post
  6. Save results to database

### 3. **GitHub Webhook Configuration**
- Webhook now calls your API endpoint instead of a placeholder URL
- Passes PR metadata (title, summary, CodeRabbit analysis)
- Default: `http://localhost:8000/experiment/from-webhook`

---

## 🚀 How to Use

### Start the API Server
```bash
cd /Users/omkarpodey/daytona-hackathon/api
bun install  # or npm install
bun run dev  # or npm run dev
```
API will run on `http://localhost:8000`

### Configure GitHub Webhook

1. **In your GitHub repo settings:**
   - Go to `Settings → Webhooks → Add webhook`
   - Payload URL: `https://your-ngrok-url.ngrok-free.app` (webhook server)
   - Events: `Pull requests`
   - Active: ✅

2. **In gh-webhook server:**
   ```bash
   cd gh-webhook
   # Create .env file with:
   GH_WEBHOOK_SECRET=your_github_webhook_secret
   GH_TOKEN=ghp_your_github_token (optional, for CodeRabbit comments)
   SANDBOX_URL=http://localhost:8000/experiment/from-webhook
   PORT=8080
   ```

3. **Start webhook server:**
   ```bash
   npm start
   ```
   Expose via ngrok: `ngrok http 8080`

### Trigger the Flow

**Option 1: Merge a PR on GitHub**
- When PR is merged → GitHub sends webhook
- Webhook posts to API endpoint
- DevRel flow starts automatically

**Option 2: Direct API Call**
```bash
curl -X POST http://localhost:8000/experiment/from-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "repo": "Omkar399/hack_ecom",
    "pr": 3,
    "title": "Add product filtering",
    "summary": "Added price and category filters",
    "coderabbitSummary": "## Summary\n- Added filter UI\n- Implemented filter logic"
  }'
```

---

## 📊 DevRel Flow Breakdown

```
GitHub PR Merged
      ↓
Webhook Server (gh-webhook)
  - Captures PR data
  - Fetches CodeRabbit summary
      ↓
API: POST /experiment/from-webhook
  - Creates Experiment record
  - Triggers Inngest job
      ↓
Inngest Job: experiment/run
  ├─ 1️⃣ Init Repository
  │    - Create Daytona sandbox
  │    - Clone repo
  │    - npm install
  │    - pm2 start dev server
  │
  ├─ 2️⃣ Generate Browser Task
  │    - Use AI to create natural browsing task
  │    - Based on PR title/summary
  │
  ├─ 3️⃣ Run Browser Agent
  │    - Browser Use SDK tests the feature
  │    - Captures step-by-step screenshots
  │
  ├─ 4️⃣ Extract Screenshots
  │    - Get all screenshots from task steps
  │    - Filter for key moments
  │
  ├─ 5️⃣ Generate Social Post
  │    - Use AI to create engaging post
  │    - Include CodeRabbit summary
  │    - Suggest hashtags and CTA
  │
  └─ 6️⃣ Save Results
       - Store post in database
       - Keep sandbox ID for later access
```

---

## 📁 Project Structure

```
api/
├── src/
│   ├── service/
│   │   ├── experiment/
│   │   │   ├── Experiment.service.ts    ✅ Routes + initRepository()
│   │   │   └── Experiment.jobs.ts       ✅ DevRel flow (NEW)
│   │   ├── browser/                     ✅ Browser agent tasks
│   │   └── ai/                          ✅ AI models (NEW: social post)
│   ├── db/
│   │   └── experiment.db.ts             ✅ Database models
│   └── lib/
│       ├── daytona.ts                   ✅ Sandbox SDK
│       └── inngest-client.ts            ✅ Job orchestration
│
gh-webhook/
├── server.js                            ✅ Webhook listener (UPDATED)
└── .env.example                         ✅ Config template (UPDATED)
```

---

## 🔑 Key Environment Variables

### API (.env)
```
DATABASE_URL=postgresql://...
DAYTONA_API_KEY=dtn_...
ANTHROPIC_API_KEY=sk_... (for Claude models)
GOOGLE_GENERATIVE_AI_API_KEY=... (for Gemini)
INNGEST_EVENT_KEY=...
```

### Webhook (.env)
```
GH_WEBHOOK_SECRET=ghp_...
GH_TOKEN=ghp_... (optional)
SANDBOX_URL=http://localhost:8000/experiment/from-webhook
PORT=8080
```

---

## 📝 API Endpoints

### GET /experiment
Get all experiments (last 10)

### GET /experiment/:id
Get specific experiment details

### POST /experiment
Create experiment manually
```json
{
  "repoUrl": "https://github.com/user/repo",
  "goal": "Test new feature"
}
```

### POST /experiment/from-webhook ⭐ NEW
Triggered by GitHub webhook when PR merges
```json
{
  "repo": "user/repo",
  "pr": 123,
  "title": "Add new feature",
  "summary": "Feature description",
  "coderabbitSummary": "CodeRabbit analysis"
}
```

Response:
```json
{
  "success": true,
  "experimentId": "exp_...",
  "message": "DevRel flow started for PR #123"
}
```

---

## 🧪 Testing

### 1. Test Locally
```bash
# Terminal 1: Start API
cd api && bun run dev

# Terminal 2: Start Webhook Server
cd gh-webhook && npm start

# Terminal 3: Simulate webhook
curl -X POST http://localhost:8000/experiment/from-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "repo": "Omkar399/hack_ecom",
    "pr": 1,
    "title": "Add filters",
    "summary": "Added product filters",
    "coderabbitSummary": "Added filter components"
  }'
```

### 2. Test with Real PR
1. Merge a PR on GitHub
2. Check webhook server logs for incoming event
3. Watch API logs for flow execution
4. Check database for new Experiment record

---

## 🔍 Monitoring

### API Logs
```bash
# Watch for DevRel flow progress
cd api && tail -f logs.txt

# Look for:
# ✅ Sandbox created
# ✅ Repository initialized
# 🌐 Browser agent spawned
# 📸 Screenshots collected
# 📝 Social post generated
# ✅ Results saved
```

### Webhook Logs
```bash
cd gh-webhook && npm start

# Look for:
# 📡 GitHub event received
# ✅ Signature verified
# 📤 Posted to API
# 📊 Response received
```

---

## ⚙️ Configuration

### Change Sandbox URL
Edit `gh-webhook/.env`:
```bash
SANDBOX_URL=https://your-production-api.com/experiment/from-webhook
```

### Change Dev Server Port
Edit API Experiment.service.ts:
```typescript
const previewUrl = await sandbox.getPreviewLink(3000); // Change 3000 to your port
```

### Adjust Browser Task Timeout
Edit Experiment.jobs.ts:
```typescript
await BrowserService.waitForTaskCompletion(
  browserAgentResult.taskId,
  10 * 60 * 1000  // Change to 10 minutes instead of 5
);
```

---

## 🐛 Troubleshooting

### API not responding to webhook
- ✅ Check if API is running: `curl http://localhost:8000/health`
- ✅ Verify SANDBOX_URL in webhook .env
- ✅ Check firewall/NAT with ngrok

### Browser agent timing out
- ✅ Increase wait time in Experiment.jobs.ts
- ✅ Check if dev server actually started
- ✅ Verify port 3000 is correct for your project

### No screenshots captured
- ✅ Check if browser task steps include screenshots
- ✅ Verify Browser Use API key is valid
- ✅ Check browser agent logs for errors

### Social post not generating
- ✅ Verify Google Gemini API key
- ✅ Check if screenshots were extracted
- ✅ Review AI service error logs

---

## 🎯 Next Steps

1. **Set up your local environment** with all env vars
2. **Start API and webhook servers**
3. **Create a test PR** and merge it
4. **Monitor logs** to see flow execute
5. **Check database** for generated experiment record
6. **Customize social post template** in `Ai.service.ts`
7. **Deploy to production** when ready

---

## 📚 Related Files

- Flow Logic: `/api/src/service/experiment/Experiment.jobs.ts`
- API Routes: `/api/src/service/experiment/Experiment.service.ts`
- Webhook Server: `/gh-webhook/server.js`
- Database Models: `/api/src/db/experiment.db.ts`
- Browser Agent: `/api/src/service/browser/Browser.service.ts`
- AI Services: `/api/src/service/ai/Ai.service.ts`

---

**Ready to go! 🚀 Your DevRel agent flow is now set up and ready to create awesome feature announcements!**
