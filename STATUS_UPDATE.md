# 🚀 DevRel Agent Flow - Project Status Update

## 📝 Important Note

This project has been **refactored and simplified** for DevRel automation. 

**Previous version** (in README.md): Complex A/B testing with Claude Code generation
**Current version**: Automated feature announcement generation on PR merge

---

## ✨ Current Implementation (Active)

### What It Does Now

When a **PR is merged** on GitHub:
1. Webhook server captures PR data + CodeRabbit summary
2. API creates a new experiment from PR metadata
3. Inngest job orchestrates the full flow:
   - Spins up Daytona sandbox
   - Clones repository
   - Starts dev server
   - Generates natural browser task with AI
   - Runs browser-use agent to test feature
   - Captures screenshots
   - Generates social media post with AI
   - Stores results in database

### Tech Stack (Current)

- **Framework**: Elysia (TypeScript backend)
- **Sandboxes**: Daytona SDK
- **Browser Testing**: Browser-use SDK
- **Job Orchestration**: Inngest
- **Database**: PostgreSQL with Drizzle ORM
- **AI**: Google Gemini for prompts + post generation
- **Webhooks**: GitHub → ngrok → local server

---

## 📚 Documentation

Read these files in order:

1. **`QUICKSTART.md`** (5 minutes)
   - Quick test with curl
   - Verify everything works
   - Troubleshooting

2. **`DEVREL_FLOW_SETUP.md`** (Comprehensive)
   - Complete architecture
   - Environment setup
   - All API endpoints
   - Monitoring & debugging

3. **`CLEANUP_SUMMARY.md`** (Reference)
   - What was removed (650 lines)
   - What was added (250 lines)
   - Migration guide

---

## 🎯 To Get Started

### Option A: Test Immediately (5 min)
```bash
# Terminal 1: Start API
cd api && npm run dev

# Terminal 2: Start webhook
cd gh-webhook && npm start

# Terminal 3: Test with curl
curl -X POST http://localhost:8000/experiment/from-webhook \
  -H "Content-Type: application/json" \
  -d '{"repo":"Omkar399/hack_ecom","pr":1,"title":"Test","summary":"New feature","coderabbitSummary":"Added component"}'
```

### Option B: Full Setup
Follow `DEVREL_FLOW_SETUP.md` step by step

### Option C: Real GitHub Webhook
1. Set up GitHub webhook in repo settings
2. Point to ngrok URL
3. Merge a PR
4. Watch flow execute

---

## 📂 Project Structure

```
daytona-hackathon/
├── api/                          # Main backend
│   ├── src/
│   │   ├── service/
│   │   │   ├── experiment/       ✅ Core flow
│   │   │   ├── browser/          ✅ Browser testing
│   │   │   └── ai/               ✅ AI services
│   │   └── db/
│   │       └── experiment.db.ts  ✅ Database models
│   ├── .env                      ⚙️ Config (create from .env.example)
│   └── package.json
│
├── gh-webhook/                    # GitHub webhook receiver
│   ├── server.js                 ✅ Webhook listener
│   ├── .env                      ⚙️ Config
│   └── package.json
│
├── fake-ecommerce/               # Test website (warm colors theme)
│   └── src/                      🎨 React + Vite app
│
├── QUICKSTART.md                 📖 Read first
├── DEVREL_FLOW_SETUP.md         📖 Detailed setup
├── CLEANUP_SUMMARY.md            📖 What changed
└── README.md                     📖 Original project (archived)
```

---

## 🔧 Environment Setup

### API (.env)
```bash
DATABASE_URL=postgresql://user:pass@localhost/dbname
DAYTONA_API_KEY=dtn_...
ANTHROPIC_API_KEY=sk_...
GOOGLE_GENERATIVE_AI_API_KEY=...
BROWSER_USE_API_KEY=bu_...
INNGEST_EVENT_KEY=...
```

### Webhook (.env)
```bash
GH_WEBHOOK_SECRET=your_secret
GH_TOKEN=ghp_optional_token
SANDBOX_URL=http://localhost:8000/experiment/from-webhook
PORT=8080
```

---

## 🚀 API Endpoints

### Core DevRel Endpoint
```
POST /experiment/from-webhook
├─ Input: PR data + CodeRabbit summary
├─ Output: Experiment ID + status
└─ Triggers: Full DevRel flow (6 steps)
```

### Support Endpoints
```
GET  /experiment              - List all experiments
GET  /experiment/:id          - Get specific experiment
POST /experiment              - Manual experiment creation
GET  /health                  - Health check
```

---

## ⚡ Quick Commands

### Start Everything
```bash
# Terminal 1
cd api && npm run dev

# Terminal 2
cd gh-webhook && npm start

# Terminal 3
ngrok http 8080
```

### Test with curl
```bash
curl -X POST http://localhost:8000/experiment/from-webhook \
  -H "Content-Type: application/json" \
  -d '{"repo":"owner/repo","pr":1,"title":"Feature","summary":"Desc","coderabbitSummary":"Summary"}'
```

### Check Status
```bash
curl http://localhost:8000/experiment
curl http://localhost:8000/experiment/exp_xxx123
```

### View Logs
```bash
# API logs
cd api && tail -f console.log

# Webhook logs
cd gh-webhook && npm start  # Already in stdout
```

---

## ✅ What's Working

- [x] GitHub webhook integration
- [x] PR merge detection
- [x] Sandbox creation (Daytona)
- [x] Repository initialization
- [x] Dev server startup
- [x] Browser agent testing
- [x] Screenshot extraction
- [x] Social media post generation
- [x] Database storage
- [x] Full Inngest orchestration
- [x] Error handling & logging

---

## 📊 Flow Status

Each step logs its progress:

```
🔔 GitHub webhook received
   PR: #123
   Title: "Add filters"
   
📦 Creating sandbox
   ✅ Sandbox ID: sdbx_...
   
📥 Cloning repository
   ✅ Repo cloned to workspace
   
🚀 Starting dev server
   ✅ Dev server running
   
🌐 Generating browser task
   ✅ Task: "Test the new filters..."
   
📹 Running browser agent
   ✅ Task completed
   
🖼️  Extracting screenshots
   ✅ Found 5 screenshots
   
📝 Generating social post
   ✅ Post created with AI
   
✅ EXPERIMENT COMPLETE
   Sandbox: sdbx_...
   Post: "🎉 New feature available..."
```

---

## 🎯 Perfect For

- **Developer Relations**: Announce features automatically
- **Content Marketing**: Generate screenshots on demand
- **Social Media**: Ready-to-post content
- **Team Updates**: Quick feature demos
- **Stakeholder Demos**: Live preview URLs

---

## 🔮 Optional Enhancements

Future additions (not required):
- Direct social media posting (Twitter/LinkedIn API)
- Custom post templates by PR label
- Video recording of features
- Slack/Discord notifications
- Multi-repository tracking
- Analytics & performance tracking
- Approval workflow

---

## 📞 Support

**Having issues?** Check in this order:
1. `QUICKSTART.md` - Troubleshooting section
2. `DEVREL_FLOW_SETUP.md` - Detailed explanations
3. API/webhook console logs

**Most common issues:**
- ❌ "Connection refused" → Start API server
- ❌ "Sandbox timeout" → Check Daytona API key
- ❌ "No screenshots" → Check Browser Use key
- ❌ "Post not generating" → Check Google AI key

---

## 🏁 Next Steps

1. **Read** `QUICKSTART.md` (5 min)
2. **Test** with curl command (2 min)
3. **Setup** GitHub webhook (2 min)
4. **Merge** a PR to test (varies)
5. **Monitor** the flow in logs (ongoing)
6. **Customize** social post template (optional)

---

**Status: ✅ PRODUCTION READY**

Your DevRel agent flow is fully implemented and ready to use. Start with the QUICKSTART.md file!

🚀 Happy automating!
