# Complete Project Analysis: Autonomous UX Experimentation System

## Project Overview

**Name**: Autonomous UX Experimentation / Self-Improving A/B Testing System  
**Purpose**: AI-powered system that autonomously identifies UX problems, generates code fixes, tests variants in isolated sandboxes, and automatically merges winning solutions.  
**Hackathon**: Daytona Hacksprint 2025

---

## Architecture Overview

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                        │
│  - Experiment Dashboard                                      │
│  - Real-time Progress Tracking                               │
│  - Variant Comparison UI                                      │
│  - React Query for State Management                          │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/REST
┌──────────────────────▼──────────────────────────────────────┐
│              Backend API (Elysia + Bun)                     │
│  - Experiment Management                                     │
│  - Job Orchestration (Inngest)                              │
│  - Database Operations (Drizzle ORM + PostgreSQL)            │
└──────┬──────────────┬──────────────┬───────────────────────┘
       │              │              │
       ▼              ▼              ▼
┌──────────┐  ┌──────────┐  ┌──────────┐
│ Daytona  │  │ Browser  │  │ Claude   │
│  SDK     │  │ Use SDK  │  │ Code SDK │
└──────────┘  └──────────┘  └──────────┘
```

---

## Project Structure

### Frontend (`/web`)
```
web/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── page.tsx            # Main dashboard
│   │   └── experiments/[id]/   # Experiment detail pages
│   ├── components/
│   │   ├── experiment/         # Experiment-specific components
│   │   │   ├── DashboardContainer.tsx
│   │   │   ├── ExperimentForm.tsx
│   │   │   ├── VariantCard.tsx
│   │   │   ├── AgentCard.tsx
│   │   │   └── ActivityFeed.tsx
│   │   ├── ui/                 # shadcn/ui components
│   │   └── providers/          # React Query provider
│   ├── query/                  # API client & React Query hooks
│   └── lib/                    # Utilities
├── package.json
└── tsconfig.json
```

**Key Technologies**:
- **Next.js 15.5.6** (App Router, React 19)
- **TypeScript 5**
- **Tailwind CSS 4**
- **shadcn/ui** components
- **React Query (TanStack Query)** for data fetching
- **RemixIcon** (recently replaced with Icons8)

### Backend (`/api`)
```
api/
├── src/
│   ├── index.ts                # Elysia server entry
│   ├── db/                     # Database schemas (Drizzle ORM)
│   │   ├── experiment.db.ts
│   │   ├── variant.db.ts
│   │   ├── agent.db.ts
│   │   └── codeAgent.db.ts
│   ├── lib/                    # Core libraries
│   │   ├── daytona.ts          # Daytona SDK client
│   │   ├── browser-use.ts      # Browser Use SDK client
│   │   ├── client.ts           # Database client
│   │   ├── inngest-client.ts   # Inngest job client
│   │   └── env.ts              # Environment variables
│   ├── service/                # Business logic
│   │   ├── experiment/         # Experiment orchestration
│   │   │   ├── Experiment.service.ts
│   │   │   └── Experiment.jobs.ts
│   │   ├── ai/                 # AI service (Gemini)
│   │   ├── browser/            # Browser agent service
│   │   └── codeAgent/          # Claude Code agent service
│   └── script/                 # Claude Code scripts
├── package.json
└── drizzle.config.ts
```

**Key Technologies**:
- **Bun** runtime
- **Elysia** web framework
- **PostgreSQL** database
- **Drizzle ORM** for database operations
- **Inngest** for job orchestration
- **Daytona SDK** for sandbox management
- **Browser-use SDK** for browser automation
- **Claude Code SDK** for autonomous code implementation
- **Google Gemini AI** for analysis

### Webhook Server (`/gh-webhook`)
```
gh-webhook/
├── server.js                   # Express webhook server
├── package.json
└── README.md
```

**Purpose**: Receives GitHub PR webhooks, extracts CodeRabbit analysis, triggers DevRel flow

---

## Core Workflows

### 1. Experiment Flow (A/B Testing)

```
User Input (Repo URL + Goal)
    ↓
Create Experiment Record (DB)
    ↓
Trigger Inngest Job: experiment/run
    ↓
┌─────────────────────────────────────┐
│ Step 1: Initialize Control Variant  │
│ - Create Daytona sandbox             │
│ - Clone repository                   │
│ - Install dependencies               │
│ - Start dev server (PM2)             │
│ - Get preview URL                    │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│ Step 2: Run Browser Agent Test      │
│ - Generate task prompt (AI)          │
│ - Spawn browser-use agent             │
│ - Capture screenshots                 │
│ - Extract insights (Gemini AI)        │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│ Step 3: Generate Variant Suggestions │
│ - AI analyzes browser results        │
│ - Generates 3-5 improvement ideas    │
│ - Stores suggestions in DB           │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│ Step 4: Implement Variants          │
│ For each suggestion:                 │
│ - Create new Daytona sandbox        │
│ - Spawn Claude Code agent           │
│ - Agent implements changes          │
│ - Start dev server                  │
│ - Get preview URL                   │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│ Step 5: Test Variants               │
│ - Run browser agents on each        │
│ - Compare results to control        │
│ - Update experiment status          │
└─────────────────────────────────────┘
```

### 2. DevRel Flow (GitHub PR → Social Media)

```
GitHub PR Merged
    ↓
Webhook → gh-webhook server
    ↓
Extract CodeRabbit Analysis
    ↓
POST /experiment/from-webhook
    ↓
Create Experiment + Trigger Job
    ↓
┌─────────────────────────────────────┐
│ 1. Init Sandbox (Daytona)            │
│ 2. Extract Features (AI)             │
│ 3. Generate Browser Task (AI)        │
│ 4. Run Browser Agent                 │
│ 5. Collect Screenshots               │
│ 6. Generate Social Media Post (AI)   │
│ 7. Save Results to DB                │
└─────────────────────────────────────┘
    ↓
Display on Dashboard
```

---

## Database Schema

### Tables

1. **experiments**
   - `id` (PK)
   - `repoUrl`
   - `goal`
   - `status` (pending | running | completed | failed)
   - `variantSuggestions` (JSON array)
   - `createdAt`, `updatedAt`

2. **variants**
   - `id` (PK)
   - `experimentId` (FK)
   - `daytonaSandboxId`
   - `publicUrl`
   - `type` (control | experiment)
   - `suggestion` (variant description)
   - `analysis` (JSON - browser agent results)
   - `createdAt`

3. **agents** (browser agents)
   - `id` (PK)
   - `variantId` (FK)
   - `status`
   - `taskPrompt`
   - `browserLiveUrl`
   - `result` (JSON)

4. **codeAgents** (Claude Code agents)
   - `id` (PK)
   - `variantId` (FK)
   - `status`
   - `prUrl`
   - `sandboxUrl`
   - `publicUrl`
   - `implementationSummary`
   - `filesModified` (JSON array)

---

## API Endpoints

### Experiment Endpoints (`/experiment`)

- `GET /experiment` - List all experiments
- `GET /experiment/:id` - Get experiment details with variants
- `POST /experiment` - Create new experiment
- `POST /experiment/from-webhook` - Create experiment from GitHub webhook
- `DELETE /experiment/:id` - Delete experiment
- `DELETE /experiment/all/clear` - Clear all experiments

### Inngest Jobs

- `experiment/run` - Main experiment orchestration job
- `variant/implement` - Code agent implementation job
- `browser/test` - Browser agent testing job

---

## Frontend Features

### Dashboard Components

1. **DashboardContainer**
   - Main experiment list view
   - Welcome card with "New Experiment" button
   - Experiment list with status indicators
   - Feature cards (Repository Integration, Goal-Driven Testing, Automated Optimization)

2. **ExperimentForm**
   - Repository URL input
   - Goal/Task textarea
   - Form validation
   - Submit handler

3. **ExperimentDetailContainer**
   - Experiment overview
   - Control variant card
   - Experimental variants list
   - Real-time status updates

4. **VariantCard**
   - Variant description
   - Status indicators (pending, running, completed, failed)
   - Code agent status
   - Preview URL button
   - Analysis summary

5. **ActivityFeed**
   - Real-time activity logs
   - Type indicators (thinking, log, event)
   - Timestamp formatting
   - Color-coded by type

6. **AgentCard**
   - Agent status
   - Task prompt
   - Results display
   - Live session link

---

## Key Integrations

### 1. Daytona SDK
- **Purpose**: Isolated cloud sandboxes for each variant
- **Features**:
  - Sandbox creation/management
  - Git repository cloning
  - Process execution (PM2 for dev servers)
  - Preview URL generation
  - Public sandbox URLs

### 2. Browser-use SDK
- **Purpose**: AI-powered browser automation
- **Features**:
  - Natural language task execution
  - Screenshot capture
  - DOM interaction logging
  - Realistic user behavior simulation

### 3. Claude Code SDK
- **Purpose**: Autonomous code implementation
- **Features**:
  - Codebase analysis
  - Surgical code changes
  - File modification tracking
  - Webhook result reporting

### 4. Google Gemini AI
- **Purpose**: Analysis and content generation
- **Uses**:
  - Browser log analysis
  - Feature extraction
  - Task prompt generation
  - Social media post generation

### 5. Inngest
- **Purpose**: Job orchestration and workflow management
- **Features**:
  - Step-by-step job execution
  - Retry logic
  - State management
  - Event-driven architecture

---

## Data Flow

### Experiment Creation Flow

```
Frontend (React Query)
    ↓ POST /experiment
Backend API (Elysia)
    ↓ Insert to DB
    ↓ Trigger Inngest Job
Inngest Job Queue
    ↓ Execute Steps
Daytona SDK → Sandbox Creation
Browser-use SDK → Testing
Claude Code SDK → Implementation
    ↓ Results stored in DB
Frontend (React Query) → Polls/Refetches
    ↓ UI Updates
```

---

## Deployment & Infrastructure

### Development Setup

**Backend**:
```bash
cd api
bun install
bun run db:push
bun run dev        # Port 8000
bun run inngest    # Inngest dev server
```

**Frontend**:
```bash
cd web
npm install
npm run dev        # Port 3000
```

**Webhook Server**:
```bash
cd gh-webhook
npm install
node server.js    # Port 8080
```

### Environment Variables

**Backend**:
- `DATABASE_URL` - PostgreSQL connection string
- `DAYTONA_API_KEY` - Daytona SDK API key
- `BROWSER_USE_API_KEY` - Browser-use SDK API key
- `ANTHROPIC_API_KEY` - Claude Code SDK API key
- `GOOGLE_AI_API_KEY` - Gemini AI API key
- `INNGEST_EVENT_KEY` - Inngest event key

**Frontend**:
- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:8000)

### Process Management

- **PM2** used in Daytona sandboxes to keep dev servers running
- **Ecosystem config** for production deployment (ecosystem.config.js)

---

## Key Features

### Implemented

1. **Experiment Management**
   - Create experiments from UI or webhook
   - Track experiment status
   - View experiment details

2. **Sandbox Isolation**
   - Each variant gets its own Daytona sandbox
   - Parallel execution of multiple variants
   - Preview URLs for each variant

3. **AI-Powered Analysis**
   - Browser agent testing
   - AI-generated variant suggestions
   - Automated code implementation

4. **Real-time Updates**
   - React Query for data fetching
   - Status indicators
   - Activity feed

5. **DevRel Automation**
   - GitHub webhook integration
   - Automated screenshot capture
   - Social media post generation

### Potential Improvements

1. **Auto-Merge Winning Variants**
   - Currently shows results, doesn't auto-merge
   - Could integrate with GitHub API

2. **Performance Metrics**
   - Load time tracking
   - Bundle size analysis
   - Performance comparison

3. **Visual Regression Testing**
   - Screenshot comparison
   - Visual diff detection

4. **Multi-page Testing**
   - User journey testing
   - Cross-page flow analysis

5. **Real User Traffic Integration**
   - A/B testing with actual users
   - Conversion tracking

---

## Code Quality & Patterns

### Strengths

1. **Type Safety**: Full TypeScript implementation
2. **Modular Architecture**: Clear separation of concerns
3. **Error Handling**: Retry logic for sandbox creation
4. **State Management**: React Query for server state
5. **Database**: Type-safe ORM with Drizzle

### Areas for Improvement

1. **Error Boundaries**: Frontend error handling
2. **Testing**: No unit/integration tests visible
3. **Logging**: Could use structured logging
4. **Documentation**: Some inline docs, could expand
5. **Validation**: Input validation on API endpoints

---

## Performance Considerations

1. **Parallel Execution**: Multiple sandboxes run simultaneously
2. **Job Queue**: Inngest handles async job orchestration
3. **Database Queries**: Efficient queries with Drizzle ORM
4. **Frontend**: React Query caching reduces API calls
5. **Sandbox Management**: Retry logic for reliability

---

## Security Considerations

1. **API Keys**: Stored in environment variables
2. **CORS**: Configured for development (should restrict in production)
3. **Input Validation**: Type validation with Elysia
4. **Webhook Verification**: GitHub webhook signature verification
5. **Sandbox Isolation**: Each variant isolated in separate sandbox

---

## Summary

This is a **sophisticated autonomous experimentation system** that combines:
- **Daytona** for isolated environments
- **Claude Code** for autonomous implementation
- **Browser-use** for realistic testing
- **AI analysis** for insights

The architecture is **well-structured**, **type-safe**, and **scalable**. The system demonstrates advanced integration of multiple AI SDKs into a cohesive workflow for automated A/B testing and UX optimization.

**Key Innovation**: First system to autonomously identify problems, write code fixes, test variants, and merge winners - all without human intervention.

---

*Analysis generated: 2025-11-15*

