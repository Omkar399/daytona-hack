# Complete DevRel Automation System - Summary

## 🎯 System Overview

A complete end-to-end automated DevRel pipeline that transforms GitHub PRs into engaging social media content with automated browser testing and screenshot capture.

```
GitHub PR Merge
    ↓
GitHub Webhook Server (gh-webhook)
    ↓
Extract CodeRabbit Analysis
    ↓
Parse PR Title, Summary, CodeRabbit Analysis
    ↓
API Endpoint: POST /experiment/from-webhook
    ↓
Create Experiment + Trigger Job
    ↓
Inngest Event: experiment/run
    ↓
┌─── DEVREL PIPELINE ───┐
│                       │
│ 1. Init Sandbox       │ ← Daytona SDK
│    ↓                  │
│ 2. Extract Features   │ ← AI Analysis of CodeRabbit
│    ↓                  │
│ 3. Generate Task      │ ← AI Task Generation
│    ↓                  │
│ 4. Run Browser Agent  │ ← Browser Use SDK
│    ↓                  │
│ 5. Collect Screenshots│ ← Extract from task steps
│    ↓                  │
│ 6. Generate Post      │ ← AI Social Media Post
│    ↓                  │
│ 7. Save Results       │ ← Database Storage
│                       │
└───────────────────────┘
    ↓
Display on Dashboard (Next.js Web App)
    ↓
Ready to Share on Social Media
```

## 📦 Architecture Components

### 1. **GitHub Webhook Server** (`/gh-webhook`)
- **Language**: Node.js + Express
- **Port**: 8080
- **Function**: Receives GitHub PR events, parses CodeRabbit analysis
- **Key Features**:
  - Signature verification
  - Form-urlencoded payload parsing
  - CodeRabbit comment/review extraction
  - Sends to API with structured payload

### 2. **Backend API** (`/api`)
- **Language**: TypeScript + Elysia
- **Port**: 8000
- **Database**: PostgreSQL + Drizzle ORM
- **Key Services**:
  - **Experiment Service**: REST endpoints for experiment management
  - **AI Service**: Gemini integration for feature extraction, task generation, social posts
  - **Browser Service**: Browser Use SDK integration
  - **Experiment Jobs**: Inngest job orchestration

### 3. **Frontend Dashboard** (`/web`)
- **Framework**: Next.js + React
- **Styling**: Tailwind CSS
- **Components**:
  - ExperimentDetailContainer: Main pipeline view
  - SandboxCard: Sandbox status
  - BrowserTaskCard: Task progress
  - ScreenshotsCard: Screenshot gallery
  - SocialPostCard: Generated social content

### 4. **External Services**
- **Daytona SDK**: Sandbox environment management
- **Browser Use SDK**: Automated browser testing (`bu_oqmnzrzS3KmkuX-q3K6lL80q2-qndcF0UTgkm4rw1eY`)
- **Google Gemini 2.0 Flash Lite**: AI model for text generation
- **GitHub API**: PR and comment data fetching
- **Inngest**: Event-driven job orchestration

## 🔄 Complete Data Flow

### Input: GitHub PR Merge Event
```json
{
  "action": "closed",
  "pull_request": {
    "number": 42,
    "title": "Add warm color theme",
    "body": "Updated colors to warmer tones...",
    "merged": true
  },
  "repository": {
    "full_name": "owner/fake-ecommerce"
  }
}
```

### Webhook Processing
```
1. Verify GitHub signature
2. Extract PR number, title, body
3. Fetch CodeRabbit analysis from PR comments
4. Structure payload:
   - repo: "owner/fake-ecommerce"
   - pr: 42
   - title: "Add warm color theme"
   - summary: PR body text
   - coderabbitSummary: AI analysis of changes
```

### API Endpoint: `POST /experiment/from-webhook`
```
Create Experiment with:
- repoUrl: "https://github.com/owner/fake-ecommerce"
- goal: PR title (used for context)
- status: "pending"

Trigger Inngest job with:
- experiment: full experiment object
- prTitle: "Add warm color theme"
- prSummary: PR body
- coderabbitSummary: CodeRabbit analysis
```

### Job Flow: `experiment/run`

#### Step 1: Init Repository
```
Input: experimentId, repoUrl
Process:
- Clone repo to Daytona sandbox
- Install dependencies
- Start dev server
Output:
- sandboxId: "sandbox_xyz"
- publicUrl: "https://3000-xyz.proxy.daytona.works/"
- Port: 3000
```

#### Step 2: Extract Features
```
Input: coderabbitSummary
Process:
- Use Gemini AI to analyze CodeRabbit text
- Extract user-facing features mentioned
Output:
- features: [
    "Warm color theme with orange/gold gradients",
    "Updated header styling",
    "New button designs"
  ]
```

#### Step 3: Generate Browser Task
```
Input: prSummary, features, sandboxUrl
Process:
- AI generates natural browsing task
- Focuses on extracted features
- Makes task sound like real user exploration
Output:
- taskPrompt: "Browse the e-commerce site...
  Focus on testing:
  - Warm color theme...
  - Updated header..."
```

#### Step 4: Spawn Browser Agent
```
Input: taskPrompt, sandboxUrl
Process:
- Create Browser Use task
- Agent explores the site
- Takes screenshots at each step
- Records thinking/memory
- Completes task with summary
Duration: ~90 seconds
Output:
- taskId: "task_abc123"
- steps: [
    {step: 1, screenshotUrl: "...", memory: "...", nextGoal: "..."},
    {step: 2, screenshotUrl: "...", ...},
    ...
  ]
```

#### Step 5: Collect Screenshots
```
Input: taskId, taskSteps
Process:
- Filter steps with screenshotUrl
- Extract URLs and descriptions
- Map to feature context
Output:
- screenshots: [
    {url: "https://cdn.browser-use.com/...", description: "Product listing with warm colors"},
    {url: "...", description: "New button design"},
    ...
  ]
```

#### Step 6: Generate Social Post
```
Input: prTitle, coderabbitSummary, screenshots
Process:
- AI analyzes title, summary, screenshot count
- Generates engaging post content
- Creates hashtags
- Selects platform-appropriate version
Output:
- content: "🎨 We just gave our store a warm makeover!..."
- hashtags: ["#design", "#newfeatures", "#ecommerce"]
- platform: "all"
```

#### Step 7: Save Results
```
Input: experimentId, post, screenshots
Process:
- Update experiment status to "completed"
- Store post in variantSuggestions[0]
- Store screenshots in experimentalVariants
Database:
- experiments.status = "completed"
- experiments.variantSuggestions = [post.content]
- experiments.updatedAt = now()
```

## 🎨 UI Display

### Dashboard View
```
DevRel Automation
│
├─ YOUR DEVREL FLOWS
│  ├─ fake-ecommerce • Testing Features • 5m ago
│  └─ my-app • Post Ready • 2h ago
│
└─ FEATURE CARDS
   ├─ GitHub Webhook Integration
   ├─ Automated Browser Testing
   └─ Social Media Ready
```

### Experiment Detail View
```
← Back

DevRel Flow Status
Repository: owner/fake-ecommerce
Goal: Add warm color theme
Created: [timestamp]
Last Updated: [timestamp]

🚀 DEVREL PIPELINE

1️⃣ Sandbox Environment
   ✓ Running
   Sandbox ID: sandbox_xyz
   Live URL: https://3000-xyz.proxy.daytona.works/

2️⃣ Browser Agent Task
   ⟳ Testing Features
   Features Being Tested:
   • Warm color theme...
   • Updated header...
   Progress: 5/10 steps

3️⃣ Screenshots
   ✓ Captured 10 screenshots
   [Screenshot Gallery]

4️⃣ Social Media Post
   ✓ Ready to Share
   [Post Preview]
   #design #ecommerce
   [Copy Button]
```

## 📊 Database Schema

### Experiments Table
```sql
id (UUID)
repoUrl (VARCHAR)
goal (TEXT)
status (ENUM: pending, running, completed, failed)
variantSuggestions (TEXT[]) -- [0] = social post
controlVariant (JSON) -- sandbox info
experimentalVariants (JSON[]) -- variants/screenshots
createdAt (TIMESTAMP)
updatedAt (TIMESTAMP)
```

## 🚀 Deployment Checklist

### Prerequisites
- [ ] GitHub repo with webhook enabled
- [ ] GitHub token with repo access (optional, for CodeRabbit fetching)
- [ ] Browser Use API key
- [ ] Google Gemini API key
- [ ] PostgreSQL database
- [ ] Inngest API key

### Environment Setup

#### `/gh-webhook/.env`
```
GH_WEBHOOK_SECRET=your_github_webhook_secret
GH_TOKEN=your_github_token
SANDBOX_URL=http://localhost:8000/experiment/from-webhook
PORT=8080
```

#### `/api/.env`
```
BROWSER_USE_API_KEY=bu_...
GOOGLE_GENERATIVE_AI_API_KEY=...
DATABASE_URL=postgresql://user:pass@localhost/dbname
INNGEST_API_KEY=...
```

#### `/web/.env`
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Deployment Steps
1. Deploy gh-webhook to server with public URL
2. Configure GitHub webhook:
   - Payload URL: `https://your-webhook-server.com/`
   - Events: Pull requests (merged only)
   - Secret: GH_WEBHOOK_SECRET
3. Deploy API to cloud platform (Render, Railway, etc.)
4. Deploy web frontend to Vercel
5. Update webhook SANDBOX_URL to production API URL

## 📝 Testing Instructions

### 1. Test Individual Components
```bash
# Test browser agent
cd api && bun test-browser-agent.ts

# Test sandbox creation
cd api && bun test-daytona.ts
```

### 2. Test Full Flow Manually
```bash
# Terminal 1: Start webhook server
cd gh-webhook && npm start

# Terminal 2: Start API
cd api && bun src/index.ts

# Terminal 3: Start web
cd web && npm run dev

# Terminal 4: Trigger webhook (manual curl)
curl -X POST http://localhost:8080/ \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d 'payload={"action":"closed","pull_request":{"merged":true,...}}'
```

### 3. Test with Real GitHub Webhook
- Make a PR on your repo
- Add a comment with CodeRabbit analysis
- Merge the PR
- Watch webhook logs
- Check dashboard for experiment

## 📚 Key Files

### Backend
- `api/src/index.ts` - Main API routes
- `api/src/service/experiment/Experiment.jobs.ts` - Job pipeline
- `api/src/service/experiment/Experiment.service.ts` - API endpoints
- `api/src/service/ai/Ai.service.ts` - AI integrations
- `api/src/service/browser/Browser.service.ts` - Browser SDK wrapper
- `gh-webhook/server.js` - Webhook listener

### Frontend
- `web/src/components/experiment/ExperimentDetailContainer.tsx` - Main view
- `web/src/components/experiment/DevRel/SandboxCard.tsx` - Sandbox status
- `web/src/components/experiment/DevRel/BrowserTaskCard.tsx` - Task progress
- `web/src/components/experiment/DevRel/ScreenshotsCard.tsx` - Screenshots
- `web/src/components/experiment/DevRel/SocialPostCard.tsx` - Social post

## ✅ Implementation Status

### Backend
- ✅ CodeRabbit parsing from webhook
- ✅ Feature extraction from summaries
- ✅ Focused browser task generation
- ✅ Job pipeline with 7 steps
- ✅ Screenshot extraction (fixed screenshotUrl)
- ✅ Social media post generation
- ✅ Database persistence

### Frontend
- ✅ SandboxCard component
- ✅ BrowserTaskCard component
- ✅ ScreenshotsCard component
- ✅ SocialPostCard component
- ✅ ExperimentDetailContainer redesign
- ✅ Dashboard components update
- ✅ Form and welcome card update
- ✅ Feature cards update

### Testing
- ⏭️ End-to-end webhook test
- ⏭️ Real PR merge test
- ⏭️ Screenshot verification
- ⏭️ Social post quality check

## 🎉 Ready for Testing!

All components are built and integrated. Ready to:
1. Merge a test PR on GitHub
2. Verify webhook triggers correctly
3. Check that features are extracted
4. Validate browser agent screenshots
5. Confirm social post generation
6. Deploy to production

---

**Last Updated**: November 15, 2025
**Status**: ✅ Complete and ready for end-to-end testing
