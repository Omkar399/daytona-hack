# Project Analysis: Autonomous UX Experimentation Platform

**Date:** November 15, 2024  
**Project:** Daytona Hacksprint 2025  
**Repository:** https://github.com/Omkar399/daytona-hack

---

## 🎯 Executive Summary

This is an **AI-powered autonomous UX experimentation platform** that revolutionizes A/B testing by automatically:
- **Finding UX problems** using browser automation
- **Generating solutions** with AI
- **Implementing fixes** autonomously with Claude Code
- **Testing variants** in parallel isolated environments
- **Comparing results** to identify winning solutions

**What traditionally takes weeks, this system does in minutes.**

---

## 🏗️ System Architecture

### Three-Agent Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    User Input                            │
│       (GitHub Repo + UX Problem Description)             │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│            AGENT 1: Browser-use                          │
│        (Find Problems - Real User Simulation)            │
│  • Explores site like a real user                        │
│  • Documents UX issues and friction points               │
│  • Captures screenshots at each step                     │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│            AGENT 2: Daytona                              │
│        (Isolate Work - Parallel Sandboxes)               │
│  • Creates isolated cloud environments                   │
│  • Clones repositories in each sandbox                   │
│  • Manages development servers                           │
│  • Provides public preview URLs                          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│            AGENT 3: Claude Code                          │
│        (Write Fixes - Autonomous Implementation)         │
│  • Reads codebase autonomously                           │
│  • Implements UX improvements                            │
│  • Makes surgical code changes                           │
│  • Reports back modified files                           │
└─────────────────────────────────────────────────────────┘
```

---

## 📦 Tech Stack

### Backend (API)
- **Runtime:** Bun (Fast JavaScript runtime)
- **Framework:** Elysia (Lightweight, type-safe REST framework)
- **Database:** PostgreSQL with Drizzle ORM
- **Job Queue:** Inngest (Durable execution for long-running workflows)
- **AI/ML:**
  - Claude Code Agent SDK (autonomous code implementation)
  - Browser-use SDK (browser automation)
  - Google Gemini (log analysis and insights)
  - Anthropic Claude (code generation)
- **Infrastructure:** Daytona SDK (cloud sandboxes)

### Frontend (Web)
- **Framework:** Next.js 15.5.6 (App Router)
- **UI Library:** React 19 with Server Components
- **Styling:** Tailwind CSS 4
- **Components:** 
  - Radix UI (Accessible components)
  - Framer Motion (Animations)
  - shadcn/ui (Component library)
- **State Management:** TanStack Query (React Query)

### Additional Services
- **GitHub Webhooks:** Express.js server for PR automation
- **Process Management:** PM2 (for dev servers in sandboxes)

---

## 🔄 Complete Workflow

### Phase 1: Problem Discovery
```
1. User provides:
   ├─> GitHub Repository URL
   └─> UX Goal/Problem Description

2. System creates Control Variant:
   ├─> Daytona creates isolated sandbox
   ├─> Clones repository
   ├─> Installs dependencies (npm install)
   ├─> Starts dev server (pm2 start npm -- run dev)
   └─> Gets public preview URL
```

### Phase 2: Problem Analysis
```
3. Browser Agent explores site:
   ├─> AI generates natural user tasks
   ├─> Browser agent simulates real user behavior
   ├─> Clicks, scrolls, searches naturally
   ├─> Documents friction points
   └─> Captures screenshots at each step

4. AI analyzes browser logs:
   ├─> Gemini AI extracts insights
   ├─> Identifies confirmed issues
   ├─> Documents user experience
   └─> Highlights friction points
```

### Phase 3: Solution Generation
```
5. AI generates 3-5 specific UX improvements:
   ├─> Based on control variant analysis
   ├─> Concrete, implementable changes
   ├─> Addresses identified issues
   └─> Examples:
       • "Add sticky filter sidebar with price/category"
       • "Implement search with real-time autocomplete"
       • "Create quick-view modal for products"
```

### Phase 4: Parallel Implementation (Per Variant)
```
6. For EACH suggestion (runs in parallel):
   ├─> Create new Daytona sandbox
   ├─> Clone repository
   ├─> Install dependencies
   ├─> Spawn Claude Code agent with prompt:
   │   "Implement: [specific UX improvement]
   │    Repository is in /workspace
   │    Make the changes and report modified files"
   ├─> Claude autonomously:
   │   • Reads the codebase
   │   • Understands the structure
   │   • Implements the improvement
   │   • Tests the changes
   │   • Reports back results
   ├─> Start dev server (pm2)
   ├─> Get preview URL
   └─> Browser agent tests new variant
```

### Phase 5: Results & Comparison
```
7. Compare all variants:
   ├─> Control vs Variant 1 vs Variant 2 vs Variant 3
   ├─> Browser agent tests each
   ├─> AI analyzes each test result
   ├─> Compares success metrics
   └─> Identifies winning solution(s)

8. Present results to user:
   ├─> Live preview URLs for each variant
   ├─> Side-by-side comparison
   ├─> UX insights for each
   └─> Recommendation for deployment
```

---

## 📂 Project Structure

```
daytona-hack/
├── api/                          # Backend API (Bun + Elysia)
│   ├── src/
│   │   ├── db/                   # Database entities (Drizzle ORM)
│   │   │   ├── experiment.db.ts  # Experiment schema
│   │   │   ├── variant.db.ts     # Variant schema
│   │   │   ├── agent.db.ts       # Browser agent schema
│   │   │   └── codeAgent.db.ts   # Claude Code agent schema
│   │   │
│   │   ├── lib/                  # Shared libraries & clients
│   │   │   ├── daytona.ts        # Daytona SDK client
│   │   │   ├── browser-use.ts    # Browser-use SDK client
│   │   │   ├── inngest.ts        # Inngest configuration
│   │   │   ├── env.ts            # Environment validation
│   │   │   └── client.ts         # Database client
│   │   │
│   │   ├── service/              # Business logic (service-oriented)
│   │   │   ├── experiment/
│   │   │   │   ├── Experiment.service.ts  # Routes & logic
│   │   │   │   └── Experiment.jobs.ts     # Background jobs
│   │   │   ├── ai/
│   │   │   │   └── Ai.service.ts          # AI/ML services
│   │   │   └── browser/
│   │   │       └── Browser.service.ts     # Browser automation
│   │   │
│   │   └── index.ts              # Application entry point
│   │
│   ├── package.json              # Dependencies
│   └── drizzle.config.ts         # Database configuration
│
├── web/                          # Frontend (Next.js 15)
│   ├── src/
│   │   ├── app/                  # Next.js App Router
│   │   │   ├── page.tsx          # Dashboard home
│   │   │   ├── layout.tsx        # Root layout
│   │   │   └── experiments/
│   │   │       └── [id]/page.tsx # Experiment detail view
│   │   │
│   │   ├── components/
│   │   │   ├── experiment/       # Experiment-specific components
│   │   │   │   ├── DashboardContainer.tsx
│   │   │   │   ├── ExperimentForm.tsx
│   │   │   │   ├── ExperimentDetailContainer.tsx
│   │   │   │   ├── DevRel/       # DevRel workflow components
│   │   │   │   │   ├── BrowserTaskCard.tsx
│   │   │   │   │   ├── SandboxCard.tsx
│   │   │   │   │   ├── ScreenshotsCard.tsx
│   │   │   │   │   └── SocialPostCard.tsx
│   │   │   │   └── ...
│   │   │   └── ui/               # Reusable UI components
│   │   │       ├── advanced/     # Custom components
│   │   │       └── ...           # shadcn/ui components
│   │   │
│   │   ├── query/                # API client & React Query
│   │   │   ├── api-client.ts
│   │   │   └── experiment.query.ts
│   │   │
│   │   └── hooks/                # Custom React hooks
│   │
│   └── package.json
│
├── gh-webhook/                   # GitHub webhook listener
│   ├── server.js                 # Express server
│   └── package.json
│
├── frontend-starter-template/    # Legacy template (to be removed)
│
└── README.md                     # Project documentation
```

---

## 🗄️ Database Schema

### Core Entities

#### 1. Experiments Table
```typescript
{
  id: string                      // experiment_xyz123
  createdAt: timestamp
  updatedAt: timestamp
  repoUrl: string                 // GitHub repository URL
  goal: string                    // UX problem description
  status: 'pending' | 'running' | 'completed' | 'failed'
  variantSuggestions: string[]    // AI-generated improvement suggestions
}
```

#### 2. Variants Table
```typescript
{
  id: string                      // variant_xyz123
  createdAt: timestamp
  experimentId: string            // FK to experiments
  daytonaSandboxId: string        // Daytona sandbox ID
  publicUrl: string               // Live preview URL
  type: 'control' | 'experiment'  // Control or experimental variant
  suggestion: string              // UX improvement being tested
  analysis: {
    success: boolean
    summary: string
    insights: string[]
    issues: string[]
  }
}
```

#### 3. Code Agents Table
```typescript
{
  id: string
  experimentId: string            // FK to experiments
  variantId: string               // FK to variants
  claudeSessionId: string         // Claude Code session ID
  daytonaSandboxId: string        // Daytona sandbox ID
  suggestion: string              // What to implement
  implementationPrompt: string    // Full prompt for Claude
  status: 'pending' | 'running' | 'completed' | 'failed'
  implementationSummary: string   // Claude's report
  filesModified: string[]         // List of changed files
  codeChanges: Array<{
    file: string
    changes: string
  }>
  logs: string                    // Full execution logs
}
```

---

## 🔌 API Endpoints

### Experiments
```
GET    /experiment           - List all experiments
POST   /experiment           - Create new experiment
GET    /experiment/:id       - Get experiment details
DELETE /experiment/:id       - Delete experiment
DELETE /experiment/all/clear - Clear all experiments
POST   /experiment/from-webhook - Create from GitHub webhook
```

### System
```
GET /              - Health check
GET /health        - Health check
```

### Inngest (Background Jobs)
```
POST /inngest      - Inngest webhook endpoint
```

---

## 🤖 AI Services

### 1. Feature Extraction
**Purpose:** Extract key features from CodeRabbit PR summaries  
**Model:** Google Gemini 2.0 Flash Lite  
**Input:** CodeRabbit summary text  
**Output:** Array of user-facing features to test

### 2. Browser Task Generation
**Purpose:** Generate natural user exploration tasks  
**Model:** Google Gemini 2.0 Flash Lite  
**Input:** UX goal, URL, optional features list  
**Output:** Natural language task prompt for browser agent

### 3. Browser Log Analysis
**Purpose:** Extract UX insights from browser automation logs  
**Model:** Google Gemini 2.0 Flash Lite  
**Input:** Browser logs, original goal  
**Output:** 
```typescript
{
  success: boolean
  summary: string
  insights: string
  issues: string
}
```

### 4. Variant Generation
**Purpose:** Generate concrete UX improvement suggestions  
**Model:** Google Gemini 2.0 Flash Lite  
**Input:** Control variant analysis, original goal  
**Output:** Array of 3-5 specific, implementable improvements

### 5. Social Media Post Generation
**Purpose:** Create engaging social media posts for new features  
**Model:** Google Gemini 2.0 Flash Lite  
**Input:** Feature title, summary, screenshots  
**Output:**
```typescript
{
  content: string
  hashtags: string[]
  platform: 'twitter' | 'linkedin' | 'all'
}
```

---

## 🎭 DevRel Flow

**Special mode triggered by GitHub PR merge webhooks**

### Workflow
```
1. PR merged to main
   └─> GitHub webhook triggers /experiment/from-webhook

2. System creates experiment
   ├─> Uses PR title as goal
   ├─> Extracts CodeRabbit summary
   └─> Starts DevRel flow

3. DevRel Flow:
   ├─> Create Daytona sandbox
   ├─> Clone merged code
   ├─> Start dev server
   ├─> Extract new features from PR summary
   ├─> Generate browser test task focusing on new features
   ├─> Run browser agent to demonstrate features
   ├─> Collect screenshots at each step
   ├─> Generate social media post with screenshots
   └─> Present results for sharing

4. Output:
   ├─> Live demo URL
   ├─> Screenshot gallery showing new features
   ├─> Ready-to-post social media content (Twitter + LinkedIn)
   └─> Automated feature demonstration
```

### Use Case
Perfect for DevRel teams who need to:
- Quickly demonstrate new features after PR merge
- Generate social media content automatically
- Create visual proof of improvements
- Share live demos with community

---

## 🚀 Key Innovations

### 1. **Autonomous End-to-End Testing**
- Traditional A/B testing requires manual variant creation
- This system does everything automatically: problem finding → solution generation → implementation → testing

### 2. **Parallel Isolated Environments**
- Each variant runs in its own Daytona sandbox
- No conflicts, no interference
- True parallel experimentation (5+ variants at once)

### 3. **Natural User Simulation**
- Browser agents behave like real users
- Not rigid step-by-step scripts
- Exploratory, adaptive behavior

### 4. **AI-Powered Code Implementation**
- Claude Code reads the entire codebase
- Makes surgical, targeted changes
- Full audit trail of modifications

### 5. **Complete Workflow Orchestration**
- Inngest provides durable execution
- Jobs survive crashes and retries
- Multi-step workflows with state management

---

## 🎨 UI/UX Features

### Dashboard
- **Welcome card** with call-to-action
- **Experiment list** with status indicators
- **Feature cards** explaining system capabilities
- **Real-time status updates** using React Query

### Experiment Detail View
- **Control variant display** with live preview
- **Experimental variants grid** with screenshots
- **Browser task card** showing test details
- **Sandbox info** (ID, status, URL)
- **Screenshots gallery** from browser tests
- **Social post preview** (for DevRel flow)

### Design System
- **Dark mode** optimized (clean, professional)
- **Grid beams background** (animated)
- **Card-based layout** (shadcn/ui)
- **Smooth animations** (Framer Motion)
- **Responsive design** (Tailwind CSS)

---

## 🔧 Technical Challenges Solved

### 1. Daytona Process Management
**Problem:** Dev servers need to run indefinitely in sandboxes  
**Solution:** PM2 process manager in each sandbox
```bash
pm2 start npm --name "vite-dev-server" -- run dev
```

### 2. Claude Code Communication
**Problem:** Claude agents need to report results back  
**Solution:** Webhook system + polling mechanism

### 3. Parallel Job Orchestration
**Problem:** Multiple async jobs with dependencies  
**Solution:** Inngest step functions with proper state management

### 4. Browser Log Analysis
**Problem:** Raw logs are noisy and unstructured  
**Solution:** Gemini AI structured extraction with specific prompts

### 5. Sandbox Timeout Handling
**Problem:** Sandbox creation can timeout  
**Solution:** Retry mechanism with exponential backoff (3 attempts)

---

## 📊 Use Cases

### 1. E-commerce UX Testing
```
Problem: "Users can't find products easily"
Result:
  ✓ Variant 1: Price filter sidebar (users find products 40% faster)
  ✓ Variant 2: Category dropdown (users find it confusing)
  ✓ Variant 3: Search with autocomplete (users love it)
Deploy: Variants 1 + 3
```

### 2. Checkout Flow Optimization
```
Problem: "Checkout process is confusing, cart abandonment high"
Result:
  ✓ Variant 1: Single-page checkout (reduces steps, improves completion)
  ✓ Variant 2: Progress indicator (helps users understand where they are)
  ✓ Variant 3: Guest checkout option (removes friction)
Deploy: All three variants together
```

### 3. Mobile Navigation Improvement
```
Problem: "Mobile menu is hard to find"
Result:
  ✓ Variant 1: Hamburger icon with label (more discoverable)
  ✓ Variant 2: Bottom navigation bar (easier thumb access)
  ✓ Variant 3: Sticky header with menu (always visible)
Deploy: Variant 2 (best UX scores)
```

### 4. DevRel Feature Announcement
```
Trigger: PR merged with new dark mode feature
Result:
  ✓ Sandbox created with merged code
  ✓ Browser agent demonstrates dark mode toggle
  ✓ Screenshots captured at each step
  ✓ Social media post generated:
    "🌙 Dark mode is here! Experience our sleek new theme..."
  ✓ Ready to share on Twitter + LinkedIn
```

---

## 🌟 Strengths

1. **Fully Automated** - Minimal human intervention required
2. **Parallel Execution** - Test multiple variants simultaneously
3. **Isolated Environments** - No conflicts between variants
4. **Comprehensive Testing** - Real user simulation, not synthetic
5. **AI-Powered** - Smart analysis and implementation
6. **Audit Trail** - Full visibility into what changed
7. **Fast Iteration** - Minutes instead of weeks
8. **Modern Stack** - Latest technologies and best practices
9. **Scalable Architecture** - Service-oriented, job-based
10. **Developer-Friendly** - Well-documented, clear patterns

---

## 🔮 Future Enhancements

### Short-term
- [ ] Auto-create GitHub PRs for winning variants
- [ ] Visual regression testing (screenshot diffs)
- [ ] Performance metrics tracking (Core Web Vitals)
- [ ] Multi-page user journey testing
- [ ] A/B test analytics dashboard

### Medium-term
- [ ] Real user traffic integration (Google Analytics)
- [ ] Automated deployment pipeline
- [ ] Slack/Discord notifications
- [ ] Custom browser agent tasks
- [ ] Video recordings of browser sessions

### Long-term
- [ ] Multi-framework support (Vue, Angular, Svelte)
- [ ] Mobile app testing (React Native, Flutter)
- [ ] Accessibility testing automation (a11y)
- [ ] SEO impact analysis
- [ ] Cost-benefit analysis per variant

---

## 🛠️ Development Setup

### Prerequisites
```bash
# Required
- Node.js 18+
- Bun runtime
- PostgreSQL database
- Daytona API key
- Anthropic API key
- Google AI API key
```

### Backend Setup
```bash
cd api
bun install
bun run db:push              # Initialize database

# Terminal 1: API server
bun run dev                  # Port 8000

# Terminal 2: Inngest worker
bun run inngest              # Background jobs
```

### Frontend Setup
```bash
cd web
npm install
npm run dev                  # Port 3000
```

### Environment Variables
```env
# Backend (api/.env)
DATABASE_URL=postgresql://...
DAYTONA_API_KEY=your_key
ANTHROPIC_API_KEY=your_key
GOOGLE_AI_API_KEY=your_key
INNGEST_EVENT_KEY=your_key

# Webhook (gh-webhook/.env)
GH_WEBHOOK_SECRET=your_secret
GH_TOKEN=your_github_token
SANDBOX_URL=http://localhost:8000
```

---

## 📈 Performance Metrics

### Time Savings
- **Traditional A/B Testing:** 2-4 weeks
  - Manual variant creation: 3-5 days
  - Development: 1-2 weeks
  - Testing: 3-7 days
  
- **This System:** 5-10 minutes
  - Control variant: 2 minutes
  - 3 experimental variants: 6 minutes (parallel)
  - Testing all variants: 2 minutes (parallel)

### Resource Efficiency
- **Sandboxes:** Isolated, on-demand creation
- **Parallel execution:** 5+ variants simultaneously
- **Auto-cleanup:** Resources freed after experiments

---

## 🏆 Hackathon Submission Highlights

### What Makes This Special
1. **First autonomous UX testing platform** combining:
   - Browser automation (browser-use)
   - AI code implementation (Claude Code)
   - Cloud sandboxes (Daytona)

2. **Real-world value:**
   - Solves actual pain point (slow A/B testing)
   - Production-ready architecture
   - Scalable design

3. **Technical excellence:**
   - Service-oriented architecture
   - Durable job execution (Inngest)
   - Modern frontend (Next.js 15 + React 19)
   - Full type safety (TypeScript)

4. **Innovation:**
   - Natural user simulation (not rigid scripts)
   - AI-powered analysis and implementation
   - Complete audit trail

---

## 📞 Repository Information

- **GitHub:** https://github.com/Omkar399/daytona-hack
- **Branch:** main
- **License:** Not specified
- **Contributors:** Omkar (primary), Nihal (contributor on nihals-branch)

---

## 🎯 Conclusion

This is a **production-grade autonomous UX experimentation platform** that successfully integrates three complex SDKs (Daytona, Claude Code, Browser-use) into a cohesive, automated workflow. It solves real business problems (slow A/B testing) with elegant technical solutions (parallel sandboxes, AI analysis, durable execution).

The architecture is solid, the implementation is comprehensive, and the potential impact is significant. This is exactly the kind of system that could transform how companies approach UX optimization.

**Built for:** Daytona Hacksprint 2025  
**Powered by:** Daytona + Claude Code + Browser-use  
**Vision:** Make UX testing fast, automated, and intelligent

