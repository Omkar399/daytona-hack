# AXIOM - Autonomous UX Experimentation Platform

> AI agents that find UX problems, write code to fix them, and test the results - automatically.

**Built for:** Daytona Hacksprint 2025

---

## 🎯 Inspiration

Every product team knows the pain: you ship a feature, suspect users are struggling, but testing takes **weeks**. Traditional A/B testing requires:
- ⏰ Manual variant creation (3-5 days)
- 💻 Developer time for implementation (1-2 weeks)  
- 🧪 Testing and analysis (3-7 days)

We wondered: **What if AI could do all of this autonomously?**

What if you could describe a UX problem and watch as AI:
- 🔍 Explores your site like a real user
- 💡 Generates improvement ideas
- ✍️ Writes the code to implement fixes
- 🧪 Tests every variant in parallel
- 📊 Shows you which solution works best

**All in minutes, not weeks.**

That's why we built **AXIOM** - the world's first fully autonomous UX experimentation platform.

---

## 💡 What it does

AXIOM is an **AI-powered A/B testing platform** that revolutionizes how teams optimize user experience:

### 🚀 Give it two things:
1. **GitHub repository URL**
2. **UX problem description** (e.g., "Users can't find products easily")

### ⚡ Watch it work its magic:

**🔍 1. Find Problems**
- Browser-use agents explore your site like real users
- Click, scroll, search naturally (not rigid scripts)
- Document friction points and UX issues
- Capture screenshots at every step

**💡 2. Generate Solutions**
- AI analyzes the problems found
- Creates 3-5 concrete improvement suggestions
- Each suggestion is specific and implementable

**✍️ 3. Implement Fixes Autonomously**
- Creates isolated Daytona sandbox for each variant
- Claude Code agents read your codebase
- Make surgical code changes to implement improvements
- Track every file modified and change made

**🧪 4. Test Everything in Parallel**
- Browser agents test each variant automatically
- Compare results against control
- Extract insights and success metrics
- Identify winning solutions

**📊 5. Present Results**
- Live preview URLs for every variant
- Side-by-side comparison
- UX insights for each variant
- Clear recommendation for deployment

### ⏱️ The Result: 
**Traditional A/B testing: 2-4 weeks**  
**AXIOM: 5-10 minutes**

---

## 🏗️ How we built it

### 🎭 Three-Agent Architecture

We orchestrated three powerful AI systems to work together seamlessly:

**1. 🌐 Browser-use Agent** (Problem Discovery)
```
Role: Real User Simulator
- Explores site with natural user behavior
- Documents UX friction points
- Captures visual evidence
- Provides detailed interaction logs
```

**2. ☁️ Daytona** (Isolation Layer)
```
Role: Parallel Environment Manager
- Creates isolated cloud sandboxes
- Clones repositories per variant
- Manages development servers
- Provides public preview URLs
```

**3. 🤖 Claude Code Agent** (Solution Implementation)
```
Role: Autonomous Code Writer
- Reads entire codebase
- Implements UX improvements
- Makes targeted surgical changes
- Reports modifications back
```

### 🛠️ Tech Stack

**Backend (API):**
- 🟠 **Bun** - Lightning-fast JavaScript runtime
- ⚡ **Elysia** - Type-safe REST framework
- 🐘 **PostgreSQL** - Reliable data persistence
- 🔄 **Drizzle ORM** - Type-safe database queries
- 📦 **Inngest** - Durable execution for long-running workflows

**AI/ML Services:**
- 🧠 **Claude Code Agent SDK** - Autonomous code implementation
- 🌐 **Browser-use SDK** - Natural browser automation
- 🤖 **Google Gemini 2.0** - Log analysis and insights
- 💭 **Anthropic Claude** - Intelligent code generation
- ☁️ **Daytona SDK** - Cloud sandbox orchestration

**Frontend:**
- ⚛️ **Next.js 15** - React App Router with Server Components
- 🎨 **Tailwind CSS 4** - Modern styling
- 🎭 **Framer Motion** - Smooth animations
- 🔲 **shadcn/ui** - Beautiful component library
- 📊 **TanStack Query** - Powerful data synchronization

**Infrastructure:**
- ⚙️ **PM2** - Process management in sandboxes
- 🔗 **GitHub Webhooks** - Automated DevRel workflows
- 🚀 **Express.js** - Webhook server

### 🔄 Complete Workflow Pipeline

```
┌─────────────────────────────────────────────────┐
│  User Input: Repo URL + UX Problem             │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  PHASE 1: Create Control Variant               │
│  • Daytona creates isolated sandbox            │
│  • Clone repo, install dependencies            │
│  • Start dev server with PM2                   │
│  • Get public preview URL                      │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  PHASE 2: Discover Problems                    │
│  • Browser agent explores site naturally       │
│  • Document UX issues and friction             │
│  • AI (Gemini) analyzes browser logs           │
│  • Extract actionable insights                 │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  PHASE 3: Generate Solutions                   │
│  • AI analyzes control variant results         │
│  • Generate 3-5 specific improvements          │
│  • Each suggestion is concrete & implementable │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  PHASE 4: Implement in Parallel (Per Variant)  │
│  FOR EACH SUGGESTION:                          │
│    1. Create new Daytona sandbox               │
│    2. Clone repository                         │
│    3. Spawn Claude Code agent                  │
│    4. Agent implements improvement             │
│    5. Start dev server                         │
│    6. Get preview URL                          │
│    7. Browser agent tests variant              │
│  ALL VARIANTS RUN SIMULTANEOUSLY!              │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  PHASE 5: Compare & Recommend                  │
│  • Compare all variants vs control             │
│  • AI analyzes test results                    │
│  • Calculate success metrics                   │
│  • Present recommendations                     │
│  • Show live previews                          │
└─────────────────────────────────────────────────┘
```

### 🏛️ Architecture Highlights

**Service-Oriented Design:**
```
api/src/
├── lib/          # SDK clients (Daytona, Browser-use, Inngest)
├── service/      # Business logic (Experiment, AI, Browser)
├── db/           # Database entities & schemas
└── index.ts      # Application entry point
```

**Durable Job Execution:**
- Inngest manages complex multi-step workflows
- Automatic retries on failures
- State persistence across steps
- Parallel job execution
- Full observability

**Database Schema:**
- **Experiments** - Track UX testing sessions
- **Variants** - Control and experimental versions
- **Code Agents** - Claude Code implementation tracking
- **Browser Agents** - Test execution records

---

## 🚧 Challenges we ran into

### 1. 🔥 Daytona Process Management
**Problem:** Dev servers need to run indefinitely in cloud sandboxes, but processes would die randomly.

**Solution:** Integrated PM2 process manager into each Daytona sandbox:
```bash
pm2 start npm --name "dev-server" -- run dev
pm2 logs dev-server
```
This ensures dev servers stay alive and we can monitor them reliably.

---

### 2. 🔗 Claude Code Communication
**Problem:** Claude Code agents run autonomously in sandboxes - how do they report results back?

**Solution:** Built a webhook callback system:
- Inject custom reporting script into Claude's workspace
- Claude posts results to our API when done
- Track implementation status in real-time
- Full audit trail of every file modified

---

### 3. ⚙️ Parallel Job Orchestration
**Problem:** Coordinating multiple async workflows (5+ sandboxes creating, testing, and reporting simultaneously)

**Solution:** Leveraged Inngest's step functions:
```typescript
await step.run('create-sandbox', async () => {...})
await step.run('spawn-agent', async () => {...})
await step.run('test-variant', async () => {...})
```
Each step is durable, retryable, and properly sequenced.

---

### 4. 🧠 Browser Log Analysis
**Problem:** Raw browser logs are massive, noisy, and unstructured (thousands of lines)

**Solution:** Structured AI extraction with Gemini:
- Feed logs + original goal to Gemini
- Extract only actionable insights
- Format as structured JSON
- Filter out noise and focus on UX issues

---

### 5. ⏱️ Sandbox Creation Timeouts
**Problem:** Daytona sandboxes sometimes timeout during creation under load

**Solution:** Exponential backoff retry mechanism:
```typescript
// Retry up to 3 times with increasing delays
for (let i = 0; i < 3; i++) {
  try {
    return await daytona.create({...})
  } catch (error) {
    if (i < 2) await sleep(2 ** i * 1000)
  }
}
```

---

### 6. 🎯 Prompt Engineering for Accurate Results
**Problem:** Generic prompts led to vague suggestions or incomplete implementations

**Solution:** Crafted precise, context-rich prompts:
- Include full repository structure
- Specify exact file paths
- Provide before/after examples
- Request structured output format
- Iterate based on agent feedback

---

## 🏆 Accomplishments that we're proud of

### 🌟 First Fully Autonomous UX Testing Platform
We successfully integrated **three complex SDKs** (Daytona, Claude Code, Browser-use) into a cohesive autonomous workflow. No other tool does end-to-end UX experimentation without human intervention.

---

### ⚡ 100x Speed Improvement
**Before AXIOM:** 2-4 weeks for A/B testing  
**With AXIOM:** 5-10 minutes  
**That's a 200-300x time reduction!**

---

### 🎯 Production-Grade Architecture
- Service-oriented design for scalability
- Durable job execution (survives crashes)
- Full type safety with TypeScript
- Comprehensive error handling
- Real-time progress tracking
- Complete audit trails

---

### 🧪 Parallel Variant Testing
Most tools test variants sequentially. AXIOM tests **5+ variants simultaneously** in isolated environments with zero interference.

---

### 🤖 Natural User Simulation
Our browser agents don't follow rigid scripts - they explore naturally like real users:
- Click around organically
- Try different paths
- Search and filter
- Identify genuine friction points

This provides **realistic UX insights**, not synthetic test data.

---

### 🎨 Beautiful, Modern UI
Built a polished Next.js 15 frontend with:
- Real-time experiment tracking
- Live variant previews
- Screenshot galleries
- Smooth animations
- Dark mode optimized
- Responsive design

---

### 📦 Bonus: DevRel Workflow
Created automated feature announcement system:
- Triggers on GitHub PR merge
- Spins up demo sandbox
- Browser agent demonstrates new features
- Captures screenshots
- Generates social media posts
- Perfect for developer advocates!

---

## 📚 What we learned

### 🧠 AI Agent Orchestration is Hard
Coordinating three different AI systems (Browser-use, Claude Code, Gemini) taught us:
- Each SDK has unique behaviors and quirks
- Prompt engineering is critical for accuracy
- Error handling must be robust (agents can fail unpredictably)
- Logging is essential for debugging autonomous systems
- State management across agents requires careful design

---

### ☁️ Cloud Sandboxes Enable True Parallelism
Daytona's isolated environments unlocked capabilities we couldn't achieve locally:
- Spin up 10+ environments simultaneously
- No resource conflicts
- Public URLs for immediate testing
- Clean slate for every variant
- Easy cleanup after experiments

**Lesson:** Infrastructure-as-code is the future of testing.

---

### 🔄 Durable Execution is a Game-Changer
Inngest's step functions transformed our architecture:
- No more worrying about crashes mid-workflow
- Automatic retries on failures
- State persists across steps
- Easy debugging with step-by-step logs
- Parallel execution made simple

**Lesson:** Long-running workflows need durable execution engines.

---

### 🎯 Prompt Engineering > Model Size
We learned that **well-crafted prompts** beat using larger models:
- Gemini 2.0 Flash Lite (small, fast) with good prompts outperformed larger models with vague prompts
- Context matters more than model capabilities
- Structured output formats (JSON) improve reliability
- Few-shot examples dramatically improve accuracy

**Lesson:** Invest time in prompt engineering, not just model selection.

---

### 🏗️ Service-Oriented Architecture Scales
Separating concerns into services proved invaluable:
- Easy to add new features
- Services can evolve independently
- Clear boundaries reduce bugs
- Testing becomes straightforward
- Multiple developers can work in parallel

**Lesson:** Plan architecture early, even for hackathons.

---

### 👥 Real User Simulation > Synthetic Tests
Natural browser automation provides insights that rigid scripts miss:
- Agents discover unexpected UX issues
- Behavior is more realistic
- Results are more trustworthy
- Users actually behave like our agents

**Lesson:** AI-powered exploration beats pre-scripted tests.

---

## 🚀 What's next for AXIOM

### 🎯 Short-term (Next 3 months)

**🔀 Auto-Deploy Winning Variants**
- Create GitHub PRs automatically for winning solutions
- Include A/B test results in PR description
- Auto-merge based on success thresholds

**📸 Visual Regression Testing**
- Screenshot diffs before/after changes
- Highlight visual changes for review
- Catch unintended UI breaks

**⚡ Performance Metrics**
- Track Core Web Vitals per variant
- Measure load times
- Monitor bundle sizes
- Optimize winning variants

**🗺️ Multi-Page User Journeys**
- Test complete user flows (homepage → product → checkout)
- Identify drop-off points
- Optimize entire funnels

---

### 🎯 Medium-term (3-6 months)

**📊 Real User Traffic Integration**
- Connect to Google Analytics
- A/B test with real users
- Calculate statistical significance
- Revenue impact analysis

**🔔 Notifications & Alerts**
- Slack integration for experiment completion
- Discord webhooks
- Email summaries
- Real-time progress updates

**🎥 Video Recordings**
- Record browser sessions
- Watch exactly what agents do
- Share videos with team
- Better debugging

**🎨 Custom Browser Tasks**
- Let users write custom test scenarios
- Template library for common flows
- Industry-specific templates (e-commerce, SaaS, etc.)

---

### 🎯 Long-term (6+ months)

**🌍 Multi-Framework Support**
- Vue.js applications
- Angular applications
- Svelte applications
- Static sites (Jekyll, Hugo)

**📱 Mobile App Testing**
- React Native support
- Flutter support
- Native iOS/Android
- Cross-platform testing

**♿ Accessibility Testing**
- Automated a11y audits
- WCAG compliance checks
- Screen reader simulation
- Keyboard navigation testing

**🔍 SEO Impact Analysis**
- Track SEO metrics per variant
- Monitor search rankings
- Optimize for Core Web Vitals
- Structured data validation

**💰 Cost-Benefit Analysis**
- Calculate implementation costs
- Estimate revenue impact
- ROI projections per variant
- Budget optimization recommendations

**🏢 Enterprise Features**
- Team collaboration
- Role-based access control
- Audit logs and compliance
- White-label options
- On-premise deployment

---

## 🎬 Example Use Cases

### 🛒 E-commerce: Product Discovery
**Input:**  
"Users can't find products easily on our clothing store"

**AXIOM's Output:**
- ✅ **Variant 1:** Price filter sidebar → Users find products 40% faster
- ❌ **Variant 2:** Category dropdown → Users found it confusing
- ✅ **Variant 3:** Search with autocomplete → Users loved it, 60% engagement increase

**Deploy:** Variants 1 + 3 → Combined solution

---

### 💳 SaaS: Onboarding Flow
**Input:**  
"New users don't complete onboarding"

**AXIOM's Output:**
- ✅ **Variant 1:** Progress indicator → 25% more completions
- ✅ **Variant 2:** Skip optional steps → 40% more completions
- ❌ **Variant 3:** Gamification → No significant impact

**Deploy:** Variants 1 + 2 → 65% improvement total

---

### 📱 Mobile: Navigation UX
**Input:**  
"Mobile menu is hard to find"

**AXIOM's Output:**
- ✅ **Variant 1:** Hamburger with label → +20% discoverability
- ✅ **Variant 2:** Bottom navigation bar → +55% ease of use
- ✅ **Variant 3:** Sticky header → +30% visibility

**Deploy:** Variant 2 → Best overall UX scores

---

### 🎙️ DevRel: Feature Announcement
**Input:**  
PR merged: "Add dark mode support"

**AXIOM's Output:**
- ✅ Sandbox created with merged code
- ✅ Browser agent demonstrates dark mode
- ✅ Screenshots captured at each step
- ✅ Social media post generated:
  > "🌙 Dark mode is here! Experience our sleek new theme with one click. Your eyes will thank you. #darkmode #ux"
- ✅ Ready to share on Twitter + LinkedIn

---

## 🛠️ Built With

- [Daytona](https://www.daytona.io/) - Cloud development environments
- [Claude Code](https://www.anthropic.com/) - Autonomous code implementation
- [Browser-use](https://browser-use.com/) - Natural browser automation
- [Bun](https://bun.sh/) - Fast JavaScript runtime
- [Elysia](https://elysiajs.com/) - Type-safe web framework
- [Next.js](https://nextjs.org/) - React framework
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Inngest](https://www.inngest.com/) - Durable execution
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Google Gemini](https://deepmind.google/technologies/gemini/) - AI analysis

---

## 👥 Team

**Built by:** Omkar & Nihal  
**Repository:** [github.com/Omkar399/daytona-hack](https://github.com/Omkar399/daytona-hack)

---

## 🎯 Try AXIOM

**Setup:**
```bash
# Backend
cd api && bun install && bun run dev

# Inngest worker (separate terminal)
cd api && bun run inngest

# Frontend
cd web && npm install && npm run dev
```

**Visit:** http://localhost:3000

**Create your first experiment:**
1. Enter a GitHub repository URL
2. Describe a UX problem
3. Watch AXIOM work its magic! ✨

---

## 🙏 Acknowledgments

Huge thanks to:
- **Daytona** for revolutionizing development environments
- **Anthropic** for Claude Code's autonomous capabilities
- **Browser-use** for natural user simulation
- **Inngest** for making durable execution accessible
- **The open-source community** for incredible tools

---

<div align="center">

## ⚡ From weeks to minutes - that's the power of AXIOM

**Made with ❤️ for Daytona Hacksprint 2025**

</div>

