# AXIOM - Autonomous UX Experimentation Platform

> AI agents that find UX problems, write code to fix them, and test the results - automatically.

**Built for:** Daytona Hacksprint 2025

---

## <img src="https://img.icons8.com/ios-filled/50/000000/goal.png" alt="Target" width="28"/> Inspiration

Every product team knows the pain: you ship a feature, suspect users are struggling, but testing takes **weeks**. Traditional A/B testing requires:
- <img src="https://img.icons8.com/fluent/48/clock.png" alt="Clock" width="20"/> Manual variant creation (3-5 days)
- <img src="https://img.icons8.com/fluent/48/laptop.png" alt="Laptop" width="20"/> Developer time for implementation (1-2 weeks)  
- <img src="https://img.icons8.com/fluent/48/test-tube.png" alt="Test" width="20"/> Testing and analysis (3-7 days)

We wondered: **What if AI could do all of this autonomously?**

What if you could describe a UX problem and watch as AI:
- <img src="https://img.icons8.com/fluent/48/search.png" alt="Search" width="20"/> Explores your site like a real user
- <img src="https://img.icons8.com/fluent/48/innovation.png" alt="Innovation" width="20"/> Generates improvement ideas
- <img src="https://img.icons8.com/fluent/48/code.png" alt="Code" width="20"/> Writes the code to implement fixes
- <img src="https://img.icons8.com/fluent/48/test-tube.png" alt="Test" width="20"/> Tests every variant in parallel
- <img src="https://img.icons8.com/fluent/48/bar-chart.png" alt="Chart" width="20"/> Shows you which solution works best

**All in minutes, not weeks.**

That's why we built **AXIOM** - the world's first fully autonomous UX experimentation platform.

---

## <img src="https://img.icons8.com/fluent/50/innovation.png" alt="Innovation" width="28"/> What it does

AXIOM is an **AI-powered A/B testing platform** that revolutionizes how teams optimize user experience:

### <img src="https://img.icons8.com/fluent/48/rocket.png" alt="Rocket" width="24"/> Give it two things:
1. **GitHub repository URL**
2. **UX problem description** (e.g., "Users can't find products easily")

### <img src="https://img.icons8.com/fluent/48/lightning-bolt.png" alt="Lightning" width="24"/> Watch it work its magic:

**<img src="https://img.icons8.com/fluent/48/search.png" alt="Search" width="22"/> 1. Find Problems**
- Browser-use agents explore your site like real users
- Click, scroll, search naturally (not rigid scripts)
- Document friction points and UX issues
- Capture screenshots at every step

**<img src="https://img.icons8.com/fluent/48/innovation.png" alt="Innovation" width="22"/> 2. Generate Solutions**
- AI analyzes the problems found
- Creates 3-5 concrete improvement suggestions
- Each suggestion is specific and implementable

**<img src="https://img.icons8.com/fluent/48/code.png" alt="Code" width="22"/> 3. Implement Fixes Autonomously**
- Creates isolated Daytona sandbox for each variant
- Claude Code agents read your codebase
- Make surgical code changes to implement improvements
- Track every file modified and change made

**<img src="https://img.icons8.com/fluent/48/test-tube.png" alt="Test" width="22"/> 4. Test Everything in Parallel**
- Browser agents test each variant automatically
- Compare results against control
- Extract insights and success metrics
- Identify winning solutions

**<img src="https://img.icons8.com/fluent/48/bar-chart.png" alt="Chart" width="22"/> 5. Present Results**
- Live preview URLs for every variant
- Side-by-side comparison
- UX insights for each variant
- Clear recommendation for deployment

### <img src="https://img.icons8.com/fluent/48/clock.png" alt="Clock" width="24"/> The Result: 
**Traditional A/B testing: 2-4 weeks**  
**AXIOM: 5-10 minutes**

---

## <img src="https://img.icons8.com/fluent/50/engineering.png" alt="Build" width="28"/> How we built it

### <img src="https://img.icons8.com/fluent/48/artificial-intelligence.png" alt="AI" width="24"/> Three-Agent Architecture

We orchestrated three powerful AI systems to work together seamlessly:

**1. <img src="https://img.icons8.com/fluent/48/web.png" alt="Browser" width="20"/> Browser-use Agent** (Problem Discovery)
```
Role: Real User Simulator
- Explores site with natural user behavior
- Documents UX friction points
- Captures visual evidence
- Provides detailed interaction logs
```

**2. <img src="https://img.icons8.com/fluent/48/cloud.png" alt="Cloud" width="20"/> Daytona** (Isolation Layer)
```
Role: Parallel Environment Manager
- Creates isolated cloud sandboxes
- Clones repositories per variant
- Manages development servers
- Provides public preview URLs
```

**3. <img src="https://img.icons8.com/fluent/48/bot.png" alt="Robot" width="20"/> Claude Code Agent** (Solution Implementation)
```
Role: Autonomous Code Writer
- Reads entire codebase
- Implements UX improvements
- Makes targeted surgical changes
- Reports modifications back
```

### <img src="https://img.icons8.com/fluent/48/settings.png" alt="Tools" width="24"/> Tech Stack

**Backend (API):**
- <img src="https://img.icons8.com/fluent/24/bun.png" alt="Bun" width="18"/> **Bun** - Lightning-fast JavaScript runtime
- <img src="https://img.icons8.com/fluent/24/lightning-bolt.png" alt="Fast" width="18"/> **Elysia** - Type-safe REST framework
- <img src="https://img.icons8.com/fluent/24/database.png" alt="Database" width="18"/> **PostgreSQL** - Reliable data persistence
- <img src="https://img.icons8.com/fluent/24/synchronize.png" alt="Sync" width="18"/> **Drizzle ORM** - Type-safe database queries
- <img src="https://img.icons8.com/fluent/24/package.png" alt="Package" width="18"/> **Inngest** - Durable execution for long-running workflows

**AI/ML Services:**
- <img src="https://img.icons8.com/fluent/24/brain.png" alt="AI" width="18"/> **Claude Code Agent SDK** - Autonomous code implementation
- <img src="https://img.icons8.com/fluent/24/web.png" alt="Browser" width="18"/> **Browser-use SDK** - Natural browser automation
- <img src="https://img.icons8.com/fluent/24/bot.png" alt="Bot" width="18"/> **Google Gemini 2.0** - Log analysis and insights
- <img src="https://img.icons8.com/fluent/24/artificial-intelligence.png" alt="AI" width="18"/> **Anthropic Claude** - Intelligent code generation
- <img src="https://img.icons8.com/fluent/24/cloud.png" alt="Cloud" width="18"/> **Daytona SDK** - Cloud sandbox orchestration

**Frontend:**
- <img src="https://img.icons8.com/fluent/24/react.png" alt="React" width="18"/> **Next.js 15** - React App Router with Server Components
- <img src="https://img.icons8.com/fluent/24/paint-palette.png" alt="Design" width="18"/> **Tailwind CSS 4** - Modern styling
- <img src="https://img.icons8.com/fluent/24/animation.png" alt="Animation" width="18"/> **Framer Motion** - Smooth animations
- <img src="https://img.icons8.com/fluent/24/template.png" alt="Components" width="18"/> **shadcn/ui** - Beautiful component library
- <img src="https://img.icons8.com/fluent/24/bar-chart.png" alt="Data" width="18"/> **TanStack Query** - Powerful data synchronization

**Infrastructure:**
- <img src="https://img.icons8.com/fluent/24/settings.png" alt="Settings" width="18"/> **PM2** - Process management in sandboxes
- <img src="https://img.icons8.com/fluent/24/link.png" alt="Link" width="18"/> **GitHub Webhooks** - Automated DevRel workflows
- <img src="https://img.icons8.com/fluent/24/rocket.png" alt="Deploy" width="18"/> **Express.js** - Webhook server

### <img src="https://img.icons8.com/fluent/48/workflow.png" alt="Workflow" width="24"/> Complete Workflow Pipeline

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

## <img src="https://img.icons8.com/fluent/50/problem.png" alt="Challenge" width="28"/> Challenges we ran into

### 1. <img src="https://img.icons8.com/fluent/24/fire-element.png" alt="Fire" width="20"/> Daytona Process Management
**Problem:** Dev servers need to run indefinitely in cloud sandboxes, but processes would die randomly.

**Solution:** Integrated PM2 process manager into each Daytona sandbox:
```bash
pm2 start npm --name "dev-server" -- run dev
pm2 logs dev-server
```
This ensures dev servers stay alive and we can monitor them reliably.

---

### 2. <img src="https://img.icons8.com/fluent/24/link.png" alt="Link" width="20"/> Claude Code Communication
**Problem:** Claude Code agents run autonomously in sandboxes - how do they report results back?

**Solution:** Built a webhook callback system:
- Inject custom reporting script into Claude's workspace
- Claude posts results to our API when done
- Track implementation status in real-time
- Full audit trail of every file modified

---

### 3. <img src="https://img.icons8.com/fluent/24/settings.png" alt="Settings" width="20"/> Parallel Job Orchestration
**Problem:** Coordinating multiple async workflows (5+ sandboxes creating, testing, and reporting simultaneously)

**Solution:** Leveraged Inngest's step functions:
```typescript
await step.run('create-sandbox', async () => {...})
await step.run('spawn-agent', async () => {...})
await step.run('test-variant', async () => {...})
```
Each step is durable, retryable, and properly sequenced.

---

### 4. <img src="https://img.icons8.com/fluent/24/brain.png" alt="Brain" width="20"/> Browser Log Analysis
**Problem:** Raw browser logs are massive, noisy, and unstructured (thousands of lines)

**Solution:** Structured AI extraction with Gemini:
- Feed logs + original goal to Gemini
- Extract only actionable insights
- Format as structured JSON
- Filter out noise and focus on UX issues

---

### 5. <img src="https://img.icons8.com/fluent/24/clock.png" alt="Clock" width="20"/> Sandbox Creation Timeouts
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

### 6. <img src="https://img.icons8.com/fluent/24/goal.png" alt="Target" width="20"/> Prompt Engineering for Accurate Results
**Problem:** Generic prompts led to vague suggestions or incomplete implementations

**Solution:** Crafted precise, context-rich prompts:
- Include full repository structure
- Specify exact file paths
- Provide before/after examples
- Request structured output format
- Iterate based on agent feedback

---

## <img src="https://img.icons8.com/fluent/50/trophy.png" alt="Trophy" width="28"/> Accomplishments that we're proud of

### <img src="https://img.icons8.com/fluent/24/star.png" alt="Star" width="20"/> First Fully Autonomous UX Testing Platform
We successfully integrated **three complex SDKs** (Daytona, Claude Code, Browser-use) into a cohesive autonomous workflow. No other tool does end-to-end UX experimentation without human intervention.

---

### <img src="https://img.icons8.com/fluent/24/lightning-bolt.png" alt="Lightning" width="20"/> 100x Speed Improvement
**Before AXIOM:** 2-4 weeks for A/B testing  
**With AXIOM:** 5-10 minutes  
**That's a 200-300x time reduction!**

---

### <img src="https://img.icons8.com/fluent/24/goal.png" alt="Target" width="20"/> Production-Grade Architecture
- Service-oriented design for scalability
- Durable job execution (survives crashes)
- Full type safety with TypeScript
- Comprehensive error handling
- Real-time progress tracking
- Complete audit trails

---

### <img src="https://img.icons8.com/fluent/24/test-tube.png" alt="Test" width="20"/> Parallel Variant Testing
Most tools test variants sequentially. AXIOM tests **5+ variants simultaneously** in isolated environments with zero interference.

---

### <img src="https://img.icons8.com/fluent/24/bot.png" alt="Bot" width="20"/> Natural User Simulation
Our browser agents don't follow rigid scripts - they explore naturally like real users:
- Click around organically
- Try different paths
- Search and filter
- Identify genuine friction points

This provides **realistic UX insights**, not synthetic test data.

---

### <img src="https://img.icons8.com/fluent/24/paint-palette.png" alt="Design" width="20"/> Beautiful, Modern UI
Built a polished Next.js 15 frontend with:
- Real-time experiment tracking
- Live variant previews
- Screenshot galleries
- Smooth animations
- Dark mode optimized
- Responsive design

---

### <img src="https://img.icons8.com/fluent/24/package.png" alt="Package" width="20"/> Bonus: DevRel Workflow
Created automated feature announcement system:
- Triggers on GitHub PR merge
- Spins up demo sandbox
- Browser agent demonstrates new features
- Captures screenshots
- Generates social media posts
- Perfect for developer advocates!

---

## <img src="https://img.icons8.com/fluent/50/book.png" alt="Book" width="28"/> What we learned

### <img src="https://img.icons8.com/fluent/24/brain.png" alt="Brain" width="20"/> AI Agent Orchestration is Hard
Coordinating three different AI systems (Browser-use, Claude Code, Gemini) taught us:
- Each SDK has unique behaviors and quirks
- Prompt engineering is critical for accuracy
- Error handling must be robust (agents can fail unpredictably)
- Logging is essential for debugging autonomous systems
- State management across agents requires careful design

---

### <img src="https://img.icons8.com/fluent/24/cloud.png" alt="Cloud" width="20"/> Cloud Sandboxes Enable True Parallelism
Daytona's isolated environments unlocked capabilities we couldn't achieve locally:
- Spin up 10+ environments simultaneously
- No resource conflicts
- Public URLs for immediate testing
- Clean slate for every variant
- Easy cleanup after experiments

**Lesson:** Infrastructure-as-code is the future of testing.

---

### <img src="https://img.icons8.com/fluent/24/workflow.png" alt="Workflow" width="20"/> Durable Execution is a Game-Changer
Inngest's step functions transformed our architecture:
- No more worrying about crashes mid-workflow
- Automatic retries on failures
- State persists across steps
- Easy debugging with step-by-step logs
- Parallel execution made simple

**Lesson:** Long-running workflows need durable execution engines.

---

### <img src="https://img.icons8.com/fluent/24/goal.png" alt="Target" width="20"/> Prompt Engineering > Model Size
We learned that **well-crafted prompts** beat using larger models:
- Gemini 2.0 Flash Lite (small, fast) with good prompts outperformed larger models with vague prompts
- Context matters more than model capabilities
- Structured output formats (JSON) improve reliability
- Few-shot examples dramatically improve accuracy

**Lesson:** Invest time in prompt engineering, not just model selection.

---

### <img src="https://img.icons8.com/fluent/24/engineering.png" alt="Engineering" width="20"/> Service-Oriented Architecture Scales
Separating concerns into services proved invaluable:
- Easy to add new features
- Services can evolve independently
- Clear boundaries reduce bugs
- Testing becomes straightforward
- Multiple developers can work in parallel

**Lesson:** Plan architecture early, even for hackathons.

---

### <img src="https://img.icons8.com/fluent/24/user.png" alt="User" width="20"/> Real User Simulation > Synthetic Tests
Natural browser automation provides insights that rigid scripts miss:
- Agents discover unexpected UX issues
- Behavior is more realistic
- Results are more trustworthy
- Users actually behave like our agents

**Lesson:** AI-powered exploration beats pre-scripted tests.

---

## <img src="https://img.icons8.com/fluent/50/rocket.png" alt="Rocket" width="28"/> What's next for AXIOM

### <img src="https://img.icons8.com/fluent/24/goal.png" alt="Target" width="20"/> Short-term (Next 3 months)

**<img src="https://img.icons8.com/fluent/20/merge-git.png" alt="Merge" width="16"/> Auto-Deploy Winning Variants**
- Create GitHub PRs automatically for winning solutions
- Include A/B test results in PR description
- Auto-merge based on success thresholds

**<img src="https://img.icons8.com/fluent/20/camera.png" alt="Camera" width="16"/> Visual Regression Testing**
- Screenshot diffs before/after changes
- Highlight visual changes for review
- Catch unintended UI breaks

**<img src="https://img.icons8.com/fluent/20/lightning-bolt.png" alt="Speed" width="16"/> Performance Metrics**
- Track Core Web Vitals per variant
- Measure load times
- Monitor bundle sizes
- Optimize winning variants

**<img src="https://img.icons8.com/fluent/20/map.png" alt="Map" width="16"/> Multi-Page User Journeys**
- Test complete user flows (homepage → product → checkout)
- Identify drop-off points
- Optimize entire funnels

---

### <img src="https://img.icons8.com/fluent/24/goal.png" alt="Target" width="20"/> Medium-term (3-6 months)

**<img src="https://img.icons8.com/fluent/20/bar-chart.png" alt="Chart" width="16"/> Real User Traffic Integration**
- Connect to Google Analytics
- A/B test with real users
- Calculate statistical significance
- Revenue impact analysis

**<img src="https://img.icons8.com/fluent/20/bell.png" alt="Bell" width="16"/> Notifications & Alerts**
- Slack integration for experiment completion
- Discord webhooks
- Email summaries
- Real-time progress updates

**<img src="https://img.icons8.com/fluent/20/video.png" alt="Video" width="16"/> Video Recordings**
- Record browser sessions
- Watch exactly what agents do
- Share videos with team
- Better debugging

**<img src="https://img.icons8.com/fluent/20/paint-palette.png" alt="Customize" width="16"/> Custom Browser Tasks**
- Let users write custom test scenarios
- Template library for common flows
- Industry-specific templates (e-commerce, SaaS, etc.)

---

### <img src="https://img.icons8.com/fluent/24/goal.png" alt="Target" width="20"/> Long-term (6+ months)

**<img src="https://img.icons8.com/fluent/20/globe.png" alt="Globe" width="16"/> Multi-Framework Support**
- Vue.js applications
- Angular applications
- Svelte applications
- Static sites (Jekyll, Hugo)

**<img src="https://img.icons8.com/fluent/20/smartphone-tablet.png" alt="Mobile" width="16"/> Mobile App Testing**
- React Native support
- Flutter support
- Native iOS/Android
- Cross-platform testing

**<img src="https://img.icons8.com/fluent/20/accessibility.png" alt="Accessibility" width="16"/> Accessibility Testing**
- Automated a11y audits
- WCAG compliance checks
- Screen reader simulation
- Keyboard navigation testing

**<img src="https://img.icons8.com/fluent/20/search.png" alt="Search" width="16"/> SEO Impact Analysis**
- Track SEO metrics per variant
- Monitor search rankings
- Optimize for Core Web Vitals
- Structured data validation

**<img src="https://img.icons8.com/fluent/20/money.png" alt="Money" width="16"/> Cost-Benefit Analysis**
- Calculate implementation costs
- Estimate revenue impact
- ROI projections per variant
- Budget optimization recommendations

**<img src="https://img.icons8.com/fluent/20/building.png" alt="Enterprise" width="16"/> Enterprise Features**
- Team collaboration
- Role-based access control
- Audit logs and compliance
- White-label options
- On-premise deployment

---

## <img src="https://img.icons8.com/fluent/50/video.png" alt="Demo" width="28"/> Example Use Cases

### <img src="https://img.icons8.com/fluent/24/shopping-cart.png" alt="Shopping" width="20"/> E-commerce: Product Discovery
**Input:**  
"Users can't find products easily on our clothing store"

**AXIOM's Output:**
- <img src="https://img.icons8.com/fluent/16/checkmark.png" alt="Check" width="14"/> **Variant 1:** Price filter sidebar → Users find products 40% faster
- <img src="https://img.icons8.com/fluent/16/cancel.png" alt="X" width="14"/> **Variant 2:** Category dropdown → Users found it confusing
- <img src="https://img.icons8.com/fluent/16/checkmark.png" alt="Check" width="14"/> **Variant 3:** Search with autocomplete → Users loved it, 60% engagement increase

**Deploy:** Variants 1 + 3 → Combined solution

---

### <img src="https://img.icons8.com/fluent/24/software.png" alt="SaaS" width="20"/> SaaS: Onboarding Flow
**Input:**  
"New users don't complete onboarding"

**AXIOM's Output:**
- <img src="https://img.icons8.com/fluent/16/checkmark.png" alt="Check" width="14"/> **Variant 1:** Progress indicator → 25% more completions
- <img src="https://img.icons8.com/fluent/16/checkmark.png" alt="Check" width="14"/> **Variant 2:** Skip optional steps → 40% more completions
- <img src="https://img.icons8.com/fluent/16/cancel.png" alt="X" width="14"/> **Variant 3:** Gamification → No significant impact

**Deploy:** Variants 1 + 2 → 65% improvement total

---

### <img src="https://img.icons8.com/fluent/24/smartphone-tablet.png" alt="Mobile" width="20"/> Mobile: Navigation UX
**Input:**  
"Mobile menu is hard to find"

**AXIOM's Output:**
- <img src="https://img.icons8.com/fluent/16/checkmark.png" alt="Check" width="14"/> **Variant 1:** Hamburger with label → +20% discoverability
- <img src="https://img.icons8.com/fluent/16/checkmark.png" alt="Check" width="14"/> **Variant 2:** Bottom navigation bar → +55% ease of use
- <img src="https://img.icons8.com/fluent/16/checkmark.png" alt="Check" width="14"/> **Variant 3:** Sticky header → +30% visibility

**Deploy:** Variant 2 → Best overall UX scores

---

### <img src="https://img.icons8.com/fluent/24/microphone.png" alt="DevRel" width="20"/> DevRel: Feature Announcement
**Input:**  
PR merged: "Add dark mode support"

**AXIOM's Output:**
- <img src="https://img.icons8.com/fluent/16/checkmark.png" alt="Check" width="14"/> Sandbox created with merged code
- <img src="https://img.icons8.com/fluent/16/checkmark.png" alt="Check" width="14"/> Browser agent demonstrates dark mode
- <img src="https://img.icons8.com/fluent/16/checkmark.png" alt="Check" width="14"/> Screenshots captured at each step
- <img src="https://img.icons8.com/fluent/16/checkmark.png" alt="Check" width="14"/> Social media post generated:
  > "<img src="https://img.icons8.com/fluent/16/moon-symbol.png" alt="Moon" width="14"/> Dark mode is here! Experience our sleek new theme with one click. Your eyes will thank you. #darkmode #ux"
- <img src="https://img.icons8.com/fluent/16/checkmark.png" alt="Check" width="14"/> Ready to share on Twitter + LinkedIn

---

## <img src="https://img.icons8.com/fluent/50/settings.png" alt="Tools" width="28"/> Built With

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

## <img src="https://img.icons8.com/fluent/50/user-group-man-man.png" alt="Team" width="28"/> Team

**Built by:** Omkar & Nihal  
**Repository:** [github.com/Omkar399/daytona-hack](https://github.com/Omkar399/daytona-hack)

---

## <img src="https://img.icons8.com/fluent/50/rocket.png" alt="Launch" width="28"/> Try AXIOM

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
3. Watch AXIOM work its magic! <img src="https://img.icons8.com/fluent/20/magic-wand.png" alt="Magic" width="16"/>

---

## <img src="https://img.icons8.com/fluent/50/thanks.png" alt="Thanks" width="28"/> Acknowledgments

Huge thanks to:
- **Daytona** for revolutionizing development environments
- **Anthropic** for Claude Code's autonomous capabilities
- **Browser-use** for natural user simulation
- **Inngest** for making durable execution accessible
- **The open-source community** for incredible tools

---

<div align="center">

## <img src="https://img.icons8.com/fluent/48/lightning-bolt.png" alt="Lightning" width="32"/> From weeks to minutes - that's the power of AXIOM

**Made with <img src="https://img.icons8.com/fluent/20/heart.png" alt="Love" width="16"/> for Daytona Hacksprint 2025**

</div>

