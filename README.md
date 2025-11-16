<div align="center">

# 🚀 AXIOM

### Autonomous UX Experimentation Platform

> AI agents that find UX problems, write code to fix them, and test the results - automatically.

[![Built with Daytona](https://img.shields.io/badge/Built%20with-Daytona-blue)](https://www.daytona.io/)
[![Powered by Claude](https://img.shields.io/badge/Powered%20by-Claude-orange)](https://www.anthropic.com/)
[![Uses Browser-use](https://img.shields.io/badge/Uses-Browser--use-green)](https://browser-use.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Built for Daytona Hacksprint 2025** 🏆

[Demo Video](#) • [DevPost Submission](./DEVPOST_SUBMISSION.md) • [Documentation](#documentation)

</div>

---

## 📖 Table of Contents

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

## 🎯 What is AXIOM?

**AXIOM** is the world's first **fully autonomous UX experimentation platform**. Give it a GitHub repository and describe a UX problem - watch as AI agents explore your site, generate solutions, write code, and test everything in parallel.

### The Magic ✨

Traditional A/B testing: **2-4 weeks**  
AXIOM: **5-10 minutes**

That's a **200-300x speed improvement**!

---

## 😫 The Problem

Every product team knows this pain:

- 📊 Traditional A/B testing takes **weeks**
- 👨‍💻 Requires **3-5 days** for manual variant creation
- ⏰ **1-2 weeks** of developer time for implementation
- 🧪 **3-7 days** for testing and analysis
- 💸 Expensive and resource-intensive

**What if AI could do all of this autonomously?**

---

## 💡 Our Solution

AXIOM orchestrates three powerful AI systems to work together:

### 🤖 Three-Agent Architecture

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

## 🔄 How It Works

### Simple 5-Step Process

**Step 1: Find Problems** 🔍  
Browser-use agents explore your site like real users, clicking, scrolling, and documenting friction points.

**Step 2: Generate Solutions** 💡  
AI analyzes problems and creates 3-5 concrete improvement suggestions.

**Step 3: Implement Fixes** ⚙️  
Claude Code agents autonomously write code in isolated Daytona sandboxes for each variant.

**Step 4: Test Everything** 🧪  
Browser agents test each variant automatically in parallel.

**Step 5: Present Results** 📊  
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
                  Deploy Winner! 🎉
```

---

## 🛠️ Tech Stack

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

## 🚀 Getting Started

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

## 📝 Usage Example

### E-commerce Product Discovery

**Input:**
```
Repository: github.com/yourcompany/ecommerce
Problem: "Users can't find products easily"
```

**AXIOM Output (5 minutes later):**

✅ **Variant 1:** Price filter sidebar  
→ *Result: Users find products 40% faster*

❌ **Variant 2:** Category dropdown  
→ *Result: Users found it confusing*

✅ **Variant 3:** Search with autocomplete  
→ *Result: 60% engagement increase*

**Decision:** Deploy Variants 1 + 3 → Combined solution

### SaaS Onboarding Flow

**Input:**
```
Repository: github.com/yourcompany/saas-app
Problem: "New users don't complete onboarding"
```

**AXIOM Output:**

✅ **Variant 1:** Progress indicator → 25% more completions  
✅ **Variant 2:** Skip optional steps → 40% more completions  
❌ **Variant 3:** Gamification → No significant impact

**Decision:** Deploy Variants 1 + 2 → 65% total improvement

---

## 🏗️ Architecture

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

## ⭐ Key Features

### 🎯 Core Features

- ✅ **Autonomous Problem Discovery** - AI explores your site like real users
- ✅ **Parallel Sandbox Orchestration** - 5+ variants running simultaneously
- ✅ **Autonomous Code Implementation** - Claude Code writes production-ready fixes
- ✅ **Natural Browser Testing** - Realistic user behavior, not rigid scripts
- ✅ **Real-time Progress Tracking** - Watch experiments unfold live
- ✅ **Live Preview URLs** - Test every variant instantly

### 🚀 Advanced Features

- ✅ **Twitter/X Auto-Posting** - Share feature updates automatically
- ✅ **Error Monitoring with Sentry** - Track issues in production
- ✅ **Durable Workflows** - Jobs survive crashes and resume automatically
- ✅ **Full Audit Trail** - Track every AI decision and code change
- ✅ **Beautiful Modern UI** - Dark mode, animations, responsive design

---

## 💪 Challenges We Solved

### 1. 🔥 Daytona Process Management
**Problem:** Dev servers would die randomly in cloud sandboxes.

**Solution:** Integrated PM2 process manager for reliable long-running processes.

### 2. 🔗 Claude Code Communication
**Problem:** Autonomous agents need to report results back from isolated sandboxes.

**Solution:** Built webhook callback system with custom reporting scripts.

### 3. ⚙️ Parallel Job Orchestration
**Problem:** Coordinating 5+ async workflows simultaneously.

**Solution:** Leveraged Inngest's durable step functions with automatic retries.

### 4. 🧠 Browser Log Analysis
**Problem:** Raw browser logs are massive and noisy (thousands of lines).

**Solution:** Structured AI extraction with Gemini - filter noise, extract insights.

### 5. ⏱️ Sandbox Creation Timeouts
**Problem:** Daytona sandboxes timeout under load.

**Solution:** Exponential backoff retry mechanism with proper error handling.

### 6. 🎯 Prompt Engineering
**Problem:** Generic prompts led to vague or incomplete implementations.

**Solution:** Context-rich prompts with repo structure, file paths, and examples.

---

## 🔮 What's Next

### Short-term (Next 3 months)
- 🔀 Auto-deploy winning variants with GitHub PRs
- 📸 Visual regression testing with screenshot diffs
- ⚡ Performance metrics (Core Web Vitals)
- 🗺️ Multi-page user journey testing

### Medium-term (3-6 months)
- 📊 Real user traffic integration (Google Analytics)
- 🔔 Slack/Discord notifications
- 🎥 Video recordings of browser sessions
- 🎨 Custom browser task templates

### Long-term (6+ months)
- 🌍 Multi-framework support (Vue, Angular, Svelte)
- 📱 Mobile app testing (React Native, Flutter)
- ♿ Accessibility testing (WCAG compliance)
- 🔍 SEO impact analysis
- 💰 ROI calculations per variant
- 🏢 Enterprise features (teams, RBAC, compliance)

---

## 🤝 Contributing

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

## 📚 Documentation

- **[DevPost Submission](./DEVPOST_SUBMISSION.md)** - Full hackathon submission
- **[API Reference](./api/API_REFERENCE.md)** - Backend API documentation
- **[Frontend Guide](./web/README.md)** - Frontend setup and components
- **[Database Schema](./web/src/query/dbSchema.md)** - Database structure

---

## 👥 Team

**Built by:** Omkar & Nihal  
**For:** Daytona Hacksprint 2025  
**Repository:** [github.com/Omkar399/daytona-hack](https://github.com/Omkar399/daytona-hack)

---

## 🙏 Acknowledgments

Huge thanks to:
- **[Daytona](https://www.daytona.io/)** for revolutionizing development environments
- **[Anthropic](https://www.anthropic.com/)** for Claude Code's autonomous capabilities
- **[Browser-use](https://browser-use.com/)** for natural user simulation
- **[Inngest](https://www.inngest.com/)** for making durable execution accessible
- **The open-source community** for incredible tools and libraries

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### ⚡ From weeks to minutes - that's the power of AXIOM

**Made with ❤️ for Daytona Hacksprint 2025**

[⬆ Back to Top](#-axiom)

</div>
