<div align="center">

# <img src="https://img.icons8.com/fluent/48/rocket.png" alt="Rocket" width="32"/> AXIOM

### Autonomous UX Experimentation Platform

> AI agents that find UX problems, write code to fix them, and test the results - automatically.

[![Built with Daytona](https://img.shields.io/badge/Built%20with-Daytona-blue)](https://www.daytona.io/)
[![Powered by Claude](https://img.shields.io/badge/Powered%20by-Claude-orange)](https://www.anthropic.com/)
[![Uses Browser-use](https://img.shields.io/badge/Uses-Browser--use-green)](https://browser-use.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Built for Daytona Hacksprint 2025** <img src="https://img.icons8.com/fluent/48/trophy.png" alt="Trophy" width="20"/>

[Demo Video](#) • [DevPost Submission](./DEVPOST_SUBMISSION.md) • [Documentation](#documentation)

</div>

---

## <img src="https://img.icons8.com/fluent/48/book.png" alt="Book" width="24"/> Table of Contents

- [What is AXIOM?](#what-is-axiom)
- [The Problem](#the-problem)
- [Our Solution](#our-solution)
- [How It Works](#how-it-works)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage Example](#usage-example)
- [Architecture](#architecture)
- [Key Features](#key-features)
- [Challenges We Solved](#challenges-we-solved)
- [What's Next](#whats-next)
- [Contributing](#contributing)
- [Team](#team)

---

## <img src="https://img.icons8.com/fluent/48/goal.png" alt="Target" width="24"/> What is AXIOM?

**AXIOM** is the world's first **fully autonomous UX experimentation platform**. Give it a GitHub repository and describe a UX problem - watch as AI agents explore your site, generate solutions, write code, and test everything in parallel.

### The Magic <img src="https://img.icons8.com/fluent/48/magic-wand.png" alt="Magic" width="20"/>

Traditional A/B testing: **2-4 weeks**  
AXIOM: **5-10 minutes**

That's a **200-300x speed improvement**!

---

## <img src="https://img.icons8.com/fluent/48/worried.png" alt="Problem" width="24"/> The Problem

Every product team knows this pain:

- <img src="https://img.icons8.com/fluent/48/bar-chart.png" alt="Chart" width="18"/> Traditional A/B testing takes **weeks**
- <img src="https://img.icons8.com/fluent/48/laptop.png" alt="Developer" width="18"/> Requires **3-5 days** for manual variant creation
- <img src="https://img.icons8.com/fluent/48/clock.png" alt="Clock" width="18"/> **1-2 weeks** of developer time for implementation
- <img src="https://img.icons8.com/fluent/48/test-tube.png" alt="Testing" width="18"/> **3-7 days** for testing and analysis
- <img src="https://img.icons8.com/fluent/48/money.png" alt="Money" width="18"/> Expensive and resource-intensive

**What if AI could do all of this autonomously?**

---

## <img src="https://img.icons8.com/fluent/48/innovation.png" alt="Solution" width="24"/> Our Solution

AXIOM orchestrates three powerful AI systems to work together:

### <img src="https://img.icons8.com/fluent/48/bot.png" alt="Robot" width="24"/> Three-Agent Architecture

```
┌─────────────────────────────────────────────┐
│  1. Browser-use Agent (Problem Discovery)  │
│     → Explores site like a real user       │
│     → Documents UX friction points         │
│     → Captures visual evidence             │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│  2. Daytona (Isolation Layer)              │
│     → Creates isolated cloud sandboxes     │
│     → Manages parallel environments        │
│     → Provides public preview URLs         │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│  3. Claude Code Agent (Implementation)     │
│     → Reads entire codebase               │
│     → Implements UX improvements          │
│     → Makes targeted surgical changes     │
└───────────────────────────────────────────┘
```

---

## <img src="https://img.icons8.com/fluent/48/synchronize.png" alt="Process" width="24"/> How It Works

### Simple 5-Step Process

**Step 1: Find Problems** <img src="https://img.icons8.com/fluent/48/search.png" alt="Search" width="18"/>  
Browser-use agents explore your site like real users, clicking, scrolling, and documenting friction points.

**Step 2: Generate Solutions** <img src="https://img.icons8.com/fluent/48/innovation.png" alt="Innovation" width="18"/>  
AI analyzes problems and creates 3-5 concrete improvement suggestions.

**Step 3: Implement Fixes** <img src="https://img.icons8.com/fluent/48/settings.png" alt="Settings" width="18"/>  
Claude Code agents autonomously write code in isolated Daytona sandboxes for each variant.

**Step 4: Test Everything** <img src="https://img.icons8.com/fluent/48/test-tube.png" alt="Test" width="18"/>  
Browser agents test each variant automatically in parallel.

**Step 5: Present Results** <img src="https://img.icons8.com/fluent/48/bar-chart.png" alt="Chart" width="18"/>  
Review live previews, compare insights, and deploy the winner.

### Visual Workflow

```
Input: GitHub Repo + UX Problem
         ↓
    Create Control
         ↓
  Discover Problems ───→ Generate Solutions (3-5 variants)
         ↓                        ↓
         └──────→ Implement & Test (in parallel)
                          ↓
                   Compare Results
                          ↓
                  Deploy Winner! <img src="https://img.icons8.com/fluent/48/party-baloons.png" alt="Celebrate" width="16"/>
```

---

## <img src="https://img.icons8.com/fluent/48/toolbox.png" alt="Tools" width="24"/> Tech Stack

### Backend
- **Bun** - Lightning-fast JavaScript runtime
- **Elysia** - Type-safe REST framework
- **PostgreSQL** - Reliable data persistence
- **Drizzle ORM** - Type-safe database queries
- **Inngest** - Durable execution for long-running workflows

### Frontend
- **Next.js 15** - React App Router with Server Components
- **React 19** - Latest React features
- **Tailwind CSS 4** - Modern utility-first styling
- **Framer Motion** - Smooth animations
- **shadcn/ui** - Beautiful component library
- **TanStack Query** - Powerful data synchronization

### AI & Automation
- **Claude Code Agent SDK** - Autonomous code implementation
- **Browser-use SDK** - Natural browser automation
- **Google Gemini 2.0** - Log analysis and insights
- **Anthropic Claude** - Intelligent code generation
- **Daytona SDK** - Cloud sandbox orchestration

### DevOps & Monitoring
- **PM2** - Process management in sandboxes
- **Sentry** - Error tracking and monitoring
- **GitHub Webhooks** - Automated DevRel workflows

---

## <img src="https://img.icons8.com/fluent/48/rocket.png" alt="Rocket" width="24"/> Getting Started

### Prerequisites

- **Bun** (for backend)
- **Node.js 18+** (for frontend)
- **PostgreSQL** database
- API keys for: Daytona, Anthropic Claude, Google AI, Inngest

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Omkar399/daytona-hack.git
cd daytona-hack
```

2. **Set up environment variables**

Create `.env` files in both `api/` and `web/` directories:

```bash
# api/.env
DATABASE_URL="postgresql://..."
DAYTONA_API_KEY="your_daytona_key"
ANTHROPIC_API_KEY="your_anthropic_key"
GOOGLE_AI_API_KEY="your_google_ai_key"
INNGEST_EVENT_KEY="your_inngest_key"
INNGEST_SIGNING_KEY="your_inngest_signing_key"

# web/.env.local
NEXT_PUBLIC_API_URL="http://localhost:8000"
```

3. **Install dependencies & start services**

```bash
# Terminal 1: Backend API
cd api
bun install
bun run db:push
bun run dev        # Runs on http://localhost:8000

# Terminal 2: Inngest Worker
cd api
bun run inngest    # Job orchestration

# Terminal 3: Frontend
cd web
npm install
npm run dev        # Runs on http://localhost:3000
```

4. **Open your browser**
```
http://localhost:3000
```

---

## <img src="https://img.icons8.com/fluent/48/edit.png" alt="Usage" width="24"/> Usage Example

### E-commerce Product Discovery

**Input:**
```
Repository: github.com/yourcompany/ecommerce
Problem: "Users can't find products easily"
```

**AXIOM Output (5 minutes later):**

<img src="https://img.icons8.com/fluent/48/checkmark.png" alt="Success" width="16"/> **Variant 1:** Price filter sidebar  
→ *Result: Users find products 40% faster*

<img src="https://img.icons8.com/fluent/48/cancel.png" alt="Failed" width="16"/> **Variant 2:** Category dropdown  
→ *Result: Users found it confusing*

<img src="https://img.icons8.com/fluent/48/checkmark.png" alt="Success" width="16"/> **Variant 3:** Search with autocomplete  
→ *Result: 60% engagement increase*

**Decision:** Deploy Variants 1 + 3 → Combined solution

### SaaS Onboarding Flow

**Input:**
```
Repository: github.com/yourcompany/saas-app
Problem: "New users don't complete onboarding"
```

**AXIOM Output:**

<img src="https://img.icons8.com/fluent/48/checkmark.png" alt="Success" width="16"/> **Variant 1:** Progress indicator → 25% more completions  
<img src="https://img.icons8.com/fluent/48/checkmark.png" alt="Success" width="16"/> **Variant 2:** Skip optional steps → 40% more completions  
<img src="https://img.icons8.com/fluent/48/cancel.png" alt="Failed" width="16"/> **Variant 3:** Gamification → No significant impact

**Decision:** Deploy Variants 1 + 2 → 65% total improvement

---

## <img src="https://img.icons8.com/fluent/48/engineering.png" alt="Architecture" width="24"/> Architecture

### Service-Oriented Design

```
api/
├── src/
│   ├── lib/           # SDK clients (Daytona, Browser-use, Inngest)
│   ├── service/       # Business logic
│   │   ├── ai/        # AI operations (Gemini analysis)
│   │   ├── browser/   # Browser automation
│   │   └── experiment/# Experiment orchestration
│   ├── db/            # Database entities & schemas
│   └── index.ts       # Application entry point

web/
├── src/
│   ├── app/           # Next.js pages
│   ├── components/    # React components
│   │   ├── experiment/# Experiment UI
│   │   └── ui/        # Reusable UI components
│   ├── query/         # API client & queries
│   └── hooks/         # Custom React hooks
```

### Database Schema

- **Experiments** - Track UX testing sessions
- **Variants** - Control and experimental versions
- **Code Agents** - Claude Code implementation tracking
- **Browser Agents** - Test execution records

### Durable Job Execution with Inngest

```typescript
// Automatic retries, state persistence, parallel execution
await step.run('create-sandbox', async () => {...})
await step.run('spawn-agent', async () => {...})
await step.run('test-variant', async () => {...})
```

---

## <img src="https://img.icons8.com/fluent/48/star.png" alt="Star" width="24"/> Key Features

### <img src="https://img.icons8.com/fluent/48/goal.png" alt="Target" width="20"/> Core Features

- <img src="https://img.icons8.com/fluent/48/checkmark.png" alt="Check" width="16"/> **Autonomous Problem Discovery** - AI explores your site like real users
- <img src="https://img.icons8.com/fluent/48/checkmark.png" alt="Check" width="16"/> **Parallel Sandbox Orchestration** - 5+ variants running simultaneously
- <img src="https://img.icons8.com/fluent/48/checkmark.png" alt="Check" width="16"/> **Autonomous Code Implementation** - Claude Code writes production-ready fixes
- <img src="https://img.icons8.com/fluent/48/checkmark.png" alt="Check" width="16"/> **Natural Browser Testing** - Realistic user behavior, not rigid scripts
- <img src="https://img.icons8.com/fluent/48/checkmark.png" alt="Check" width="16"/> **Real-time Progress Tracking** - Watch experiments unfold live
- <img src="https://img.icons8.com/fluent/48/checkmark.png" alt="Check" width="16"/> **Live Preview URLs** - Test every variant instantly

### <img src="https://img.icons8.com/fluent/48/rocket.png" alt="Rocket" width="20"/> Advanced Features

- <img src="https://img.icons8.com/fluent/48/checkmark.png" alt="Check" width="16"/> **Twitter/X Auto-Posting** - Share feature updates automatically
- <img src="https://img.icons8.com/fluent/48/checkmark.png" alt="Check" width="16"/> **Error Monitoring with Sentry** - Track issues in production
- <img src="https://img.icons8.com/fluent/48/checkmark.png" alt="Check" width="16"/> **Durable Workflows** - Jobs survive crashes and resume automatically
- <img src="https://img.icons8.com/fluent/48/checkmark.png" alt="Check" width="16"/> **Full Audit Trail** - Track every AI decision and code change
- <img src="https://img.icons8.com/fluent/48/checkmark.png" alt="Check" width="16"/> **Beautiful Modern UI** - Dark mode, animations, responsive design

---

## <img src="https://img.icons8.com/fluent/48/muscle.png" alt="Strength" width="24"/> Challenges We Solved

### 1. <img src="https://img.icons8.com/fluent/48/fire.png" alt="Fire" width="20"/> Daytona Process Management
**Problem:** Dev servers would die randomly in cloud sandboxes.

**Solution:** Integrated PM2 process manager for reliable long-running processes.

### 2. <img src="https://img.icons8.com/fluent/48/link.png" alt="Link" width="20"/> Claude Code Communication
**Problem:** Autonomous agents need to report results back from isolated sandboxes.

**Solution:** Built webhook callback system with custom reporting scripts.

### 3. <img src="https://img.icons8.com/fluent/48/settings.png" alt="Settings" width="20"/> Parallel Job Orchestration
**Problem:** Coordinating 5+ async workflows simultaneously.

**Solution:** Leveraged Inngest's durable step functions with automatic retries.

### 4. <img src="https://img.icons8.com/fluent/48/brain.png" alt="Brain" width="20"/> Browser Log Analysis
**Problem:** Raw browser logs are massive and noisy (thousands of lines).

**Solution:** Structured AI extraction with Gemini - filter noise, extract insights.

### 5. <img src="https://img.icons8.com/fluent/48/clock.png" alt="Clock" width="20"/> Sandbox Creation Timeouts
**Problem:** Daytona sandboxes timeout under load.

**Solution:** Exponential backoff retry mechanism with proper error handling.

### 6. <img src="https://img.icons8.com/fluent/48/goal.png" alt="Target" width="20"/> Prompt Engineering
**Problem:** Generic prompts led to vague or incomplete implementations.

**Solution:** Context-rich prompts with repo structure, file paths, and examples.

---

## <img src="https://img.icons8.com/fluent/48/crystal-ball.png" alt="Future" width="24"/> What's Next

### Short-term (Next 3 months)
- <img src="https://img.icons8.com/fluent/48/code-fork.png" alt="Fork" width="16"/> Auto-deploy winning variants with GitHub PRs
- <img src="https://img.icons8.com/fluent/48/camera.png" alt="Camera" width="16"/> Visual regression testing with screenshot diffs
- <img src="https://img.icons8.com/fluent/48/lightning-bolt.png" alt="Speed" width="16"/> Performance metrics (Core Web Vitals)
- <img src="https://img.icons8.com/fluent/48/map.png" alt="Map" width="16"/> Multi-page user journey testing

### Medium-term (3-6 months)
- <img src="https://img.icons8.com/fluent/48/bar-chart.png" alt="Analytics" width="16"/> Real user traffic integration (Google Analytics)
- <img src="https://img.icons8.com/fluent/48/bell.png" alt="Notifications" width="16"/> Slack/Discord notifications
- <img src="https://img.icons8.com/fluent/48/video.png" alt="Video" width="16"/> Video recordings of browser sessions
- <img src="https://img.icons8.com/fluent/48/template.png" alt="Template" width="16"/> Custom browser task templates

### Long-term (6+ months)
- <img src="https://img.icons8.com/fluent/48/globe.png" alt="Globe" width="16"/> Multi-framework support (Vue, Angular, Svelte)
- <img src="https://img.icons8.com/fluent/48/smartphone.png" alt="Mobile" width="16"/> Mobile app testing (React Native, Flutter)
- <img src="https://img.icons8.com/fluent/48/accessibility.png" alt="Accessibility" width="16"/> Accessibility testing (WCAG compliance)
- <img src="https://img.icons8.com/fluent/48/search.png" alt="SEO" width="16"/> SEO impact analysis
- <img src="https://img.icons8.com/fluent/48/money.png" alt="Money" width="16"/> ROI calculations per variant
- <img src="https://img.icons8.com/fluent/48/organization.png" alt="Enterprise" width="16"/> Enterprise features (teams, RBAC, compliance)

---

## <img src="https://img.icons8.com/fluent/48/handshake.png" alt="Handshake" width="24"/> Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Write clean, documented code
- Follow existing code style
- Add tests for new features
- Update documentation as needed

---

## <img src="https://img.icons8.com/fluent/48/book.png" alt="Documentation" width="24"/> Documentation

- **[DevPost Submission](./DEVPOST_SUBMISSION.md)** - Full hackathon submission
- **[API Reference](./api/API_REFERENCE.md)** - Backend API documentation
- **[Frontend Guide](./web/README.md)** - Frontend setup and components
- **[Database Schema](./web/src/query/dbSchema.md)** - Database structure

---

## <img src="https://img.icons8.com/fluent/48/group.png" alt="Team" width="24"/> Team

**Built by:** Omkar & Nihal  
**For:** Daytona Hacksprint 2025  
**Repository:** [github.com/Omkar399/daytona-hack](https://github.com/Omkar399/daytona-hack)

---

## <img src="https://img.icons8.com/fluent/48/thank-you.png" alt="Thanks" width="24"/> Acknowledgments

Huge thanks to:
- **[Daytona](https://www.daytona.io/)** for revolutionizing development environments
- **[Anthropic](https://www.anthropic.com/)** for Claude Code's autonomous capabilities
- **[Browser-use](https://browser-use.com/)** for natural user simulation
- **[Inngest](https://www.inngest.com/)** for making durable execution accessible
- **The open-source community** for incredible tools and libraries

---

## <img src="https://img.icons8.com/fluent/48/certificate.png" alt="License" width="24"/> License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### <img src="https://img.icons8.com/fluent/48/lightning-bolt.png" alt="Speed" width="20"/> From weeks to minutes - that's the power of AXIOM

**Made with <img src="https://img.icons8.com/fluent/48/love.png" alt="Love" width="16"/> for Daytona Hacksprint 2025**

[<img src="https://img.icons8.com/fluent/48/up-arrow.png" alt="Up" width="16"/> Back to Top](#-axiom)

</div>
