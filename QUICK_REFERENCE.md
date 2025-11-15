# Quick Reference Guide

## 🚀 What This Project Does

**Autonomous UX Experimentation Platform** - AI agents that find UX problems, write code to fix them, and test results automatically.

### 30-Second Pitch
```
Traditional A/B testing: 2-4 weeks of manual work
This system: 5-10 minutes, fully automated

Input:  GitHub repo + UX problem
Output: Tested solutions with live previews
```

---

## 🎯 Key Features

| Feature | Description |
|---------|-------------|
| **Autonomous Testing** | Browser agents explore sites like real users |
| **AI Analysis** | Gemini AI extracts UX insights from logs |
| **Auto Implementation** | Claude Code writes fixes autonomously |
| **Parallel Sandboxes** | Daytona creates isolated test environments |
| **Live Previews** | Every variant gets a public URL |
| **DevRel Mode** | Auto-generate social posts for merged PRs |

---

## 🏗️ Tech Stack at a Glance

### Backend
- **Runtime:** Bun
- **Framework:** Elysia (REST API)
- **Database:** PostgreSQL + Drizzle ORM
- **Jobs:** Inngest (durable execution)

### Frontend
- **Framework:** Next.js 15 (App Router)
- **UI:** React 19 + Tailwind CSS 4
- **State:** TanStack Query
- **Components:** shadcn/ui + Radix UI

### AI/Agents
- **Browser:** browser-use SDK
- **Code:** Claude Code Agent SDK
- **Analysis:** Google Gemini API
- **Sandboxes:** Daytona SDK

---

## 📊 System Flow

```
User Input (Repo + Goal)
    ↓
Daytona creates control sandbox
    ↓
Browser agent tests & finds issues
    ↓
AI generates 3-5 improvement ideas
    ↓
For each idea:
  ├─> New Daytona sandbox
  ├─> Claude Code implements fix
  ├─> Browser agent tests variant
  └─> Compare to control
    ↓
Results with live previews
```

---

## 🗂️ Directory Structure

```
daytona-hack/
├── api/              # Backend (Bun + Elysia)
│   ├── src/
│   │   ├── db/       # Database schemas
│   │   ├── lib/      # SDK clients
│   │   └── service/  # Business logic
│   │       ├── experiment/
│   │       ├── ai/
│   │       └── browser/
│   └── package.json
│
├── web/              # Frontend (Next.js)
│   ├── src/
│   │   ├── app/      # Pages (App Router)
│   │   ├── components/
│   │   └── query/    # API client
│   └── package.json
│
└── gh-webhook/       # GitHub webhook server
```

---

## 🔌 API Endpoints

```
GET    /experiment           List all experiments
POST   /experiment           Create experiment
GET    /experiment/:id       Get details
DELETE /experiment/:id       Delete experiment
POST   /experiment/from-webhook  GitHub PR webhook
```

---

## 🤖 AI Services

| Service | Model | Purpose |
|---------|-------|---------|
| Feature Extraction | Gemini | Extract features from PR summaries |
| Task Generation | Gemini | Create natural browser tasks |
| Log Analysis | Gemini | Extract UX insights |
| Variant Generation | Gemini | Generate improvement ideas |
| Social Post | Gemini | Create social media content |
| Code Implementation | Claude | Write actual code changes |

---

## 🗄️ Database Schema

### Core Tables
- **experiments** - Top-level experiment metadata
- **variants** - Control + experimental variants
- **code_agents** - Claude Code agent sessions
- **agents** - Browser agent sessions

---

## 🎭 Two Modes

### 1. Manual Mode (Main Flow)
```
User inputs repo + goal
  → System finds problems
  → Generates solutions
  → Tests variants
  → Shows results
```

### 2. DevRel Mode (GitHub Webhook)
```
PR merged to main
  → Webhook triggers flow
  → Creates sandbox with new code
  → Browser agent demonstrates features
  → Generates social media post
  → Ready to share!
```

---

## ⚡ Quick Start

```bash
# Backend
cd api
bun install
bun run db:push
bun run dev        # Terminal 1 (port 8000)
bun run inngest    # Terminal 2 (jobs)

# Frontend
cd web
npm install
npm run dev        # Port 3000
```

### Environment Variables
```env
DATABASE_URL=postgresql://...
DAYTONA_API_KEY=xxx
ANTHROPIC_API_KEY=xxx
GOOGLE_AI_API_KEY=xxx
INNGEST_EVENT_KEY=xxx
```

---

## 📈 Performance

| Metric | Traditional | This System |
|--------|-------------|-------------|
| Time to test 3 variants | 2-4 weeks | 5-10 minutes |
| Manual effort | High | Minimal |
| Parallel testing | No | Yes (5+) |
| Implementation | Manual | Autonomous |
| Environment setup | Complex | Automated |

---

## 🎯 Use Cases

### E-commerce
- Product filtering improvements
- Checkout flow optimization
- Search functionality enhancement

### SaaS
- Onboarding flow testing
- Dashboard layout optimization
- Feature discoverability

### Content Sites
- Navigation improvements
- Reading experience optimization
- Mobile responsiveness

### DevRel
- Feature demonstrations
- Release announcements
- Social media content generation

---

## 🏆 Key Innovations

1. **First autonomous UX testing platform**
2. **Combines 3 complex SDKs** (Daytona, Claude Code, browser-use)
3. **Natural user simulation** (not rigid scripts)
4. **Parallel isolated environments**
5. **End-to-end automation**

---

## 📞 Resources

- **Full Analysis:** `PROJECT_ANALYSIS.md`
- **API Docs:** `api/API_REFERENCE.md`
- **Architecture:** `api/apiStructure.md`
- **Main README:** `README.md`
- **Pull Request:** `PR_DESCRIPTION.md`

---

## 🎨 UI Components

### Dashboard
- Experiment list with status
- Create new experiment form
- Feature showcase cards

### Experiment Detail
- Control variant preview
- Experimental variants grid
- Browser test results
- Screenshot gallery
- Social post preview (DevRel mode)

---

## 💡 Pro Tips

1. **Parallel Testing:** Create 5+ variants at once
2. **Natural Tasks:** Let browser agent explore freely
3. **Specific Goals:** More specific = better results
4. **DevRel Flow:** Perfect for feature announcements
5. **Audit Trail:** Check Claude's modified files

---

## 🔮 Future Ideas

- Auto-create GitHub PRs for winners
- Real user traffic integration
- Visual regression testing
- Performance metrics (Core Web Vitals)
- Multi-page user journeys
- Mobile app testing

---

**Built for Daytona Hacksprint 2025**  
**Repository:** https://github.com/Omkar399/daytona-hack

