# AXIOM - AI-Powered DevRel Automation

> Turn every PR merge into engaging social media content - automatically.

**Built for:** Daytona Hacksprint 2025

---

## <img src="https://img.icons8.com/ios-filled/50/000000/goal.png" alt="Target" width="28"/> Inspiration

Every Developer Relations team faces the same challenge: **You ship amazing features, but creating social media content takes hours.**

The manual process is exhausting:
- <img src="https://img.icons8.com/fluent/48/code.png" alt="Code" width="20"/> PR gets merged → Code ships to production
- <img src="https://img.icons8.com/fluent/48/clock.png" alt="Clock" width="20"/> DevRel team manually reviews changes (1-2 hours)
- <img src="https://img.icons8.com/fluent/48/laptop.png" alt="Laptop" width="20"/> Spin up the app to take screenshots (30-60 minutes)
- <img src="https://img.icons8.com/fluent/48/camera.png" alt="Camera" width="20"/> Manually capture screenshots of new features (30 minutes)
- <img src="https://img.icons8.com/fluent/48/edit.png" alt="Edit" width="20"/> Write engaging social media posts (30-60 minutes)
- <img src="https://img.icons8.com/fluent/48/twitter.png" alt="Twitter" width="20"/> Post to Twitter/LinkedIn manually

**Total time: 3-5 hours per feature release** 😰

We wondered: **What if AI could do ALL of this automatically when a PR merges?**

That's why we built **AXIOM** - the world's first fully autonomous DevRel content generation platform.

---

## <img src="https://img.icons8.com/fluent/50/innovation.png" alt="Innovation" width="28"/> What it does

AXIOM is an **AI-powered DevRel automation platform** that turns every GitHub PR merge into ready-to-post social media content:

### <img src="https://img.icons8.com/fluent/48/workflow.png" alt="Workflow" width="24"/> The Complete Automation

**When you merge a PR, AXIOM automatically:**

**<img src="https://img.icons8.com/fluent/48/webhook.png" alt="Webhook" width="22"/> 1. Detects the Merge**
- GitHub webhook triggers instantly on PR merge
- Extracts PR title, description, and CodeRabbit AI summary
- Identifies what features/changes were added

**<img src="https://img.icons8.com/fluent/48/cloud.png" alt="Cloud" width="22"/> 2. Spins Up Live Demo**
- Creates isolated Daytona sandbox with merged code
- Clones repository and installs dependencies
- Starts development server with your latest changes
- Gets public preview URL for testing

**<img src="https://img.icons8.com/fluent/48/bot.png" alt="Bot" width="22"/> 3. Demonstrates New Features**
- AI analyzes CodeRabbit summary to identify key changes
- Browser-use agents explore your app like real users
- Agents naturally interact with new features (click, scroll, navigate)
- Captures what changed and how users will experience it

**<img src="https://img.icons8.com/fluent/48/camera.png" alt="Camera" width="22"/> 4. Captures Professional Screenshots**
- Takes screenshots at each interaction step
- Shows new features in action
- Captures user flows and visual changes
- Collects multiple angles for best presentation

**<img src="https://img.icons8.com/fluent/48/artificial-intelligence.png" alt="AI" width="22"/> 5. Generates Social Media Posts**
- Google Gemini AI creates engaging post copy
- Tailored versions for Twitter (280 chars) AND LinkedIn (detailed)
- Includes relevant hashtags and call-to-action
- References screenshots automatically

**<img src="https://img.icons8.com/fluent/48/dashboard.png" alt="Dashboard" width="22"/> 6. Presents Everything in Dashboard**
- Beautiful UI showing all generated content
- Screenshot gallery ready to download
- Copy Twitter + LinkedIn posts with one click
- Live demo link to share

### <img src="https://img.icons8.com/fluent/48/lightning-bolt.png" alt="Lightning" width="24"/> The Result: 

**Manual Process: 3-5 hours per feature**  
**AXIOM: 3-5 minutes, fully automated**  
**That's a 95% time reduction!** 🚀

---

## <img src="https://img.icons8.com/fluent/50/engineering.png" alt="Build" width="28"/> How we built it

### <img src="https://img.icons8.com/fluent/48/workflow.png" alt="Workflow" width="24"/> Complete Workflow

```
┌─────────────────────────────────────────────────┐
│  GitHub PR Merged                               │
│  (CodeRabbit analyzes changes)                  │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  GitHub Webhook → Triggers /from-webhook        │
│  Payload: PR title, body, CodeRabbit summary    │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  AXIOM Backend: Create Experiment               │
│  • Parse PR data and CodeRabbit summary         │
│  • Store experiment in database                 │
│  • Trigger Inngest job for processing           │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  Step 1: Create Daytona Sandbox                 │
│  • Clone repository with merged changes         │
│  • Install dependencies (npm/pnpm/yarn)         │
│  • Start dev server with PM2                    │
│  • Get public preview URL                       │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  Step 2: Extract Features (Gemini AI)           │
│  • Feed CodeRabbit summary to AI                │
│  • Identify user-facing changes                 │
│  • Extract key features to demonstrate          │
│  • Example: ["Dark mode toggle", "Search bar"]  │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  Step 3: Generate Browser Task (Gemini AI)      │
│  • AI creates exploration prompt                │
│  • Focuses on demonstrating new features        │
│  • Natural language instructions                │
│  • Example: "Explore the new dark mode..."      │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  Step 4: Run Browser Agent (Browser-use)        │
│  • Browser-use agent visits preview URL         │
│  • Autonomously explores and interacts          │
│  • Demonstrates new features naturally          │
│  • Captures screenshots at each step            │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  Step 5: Collect Screenshots                    │
│  • Extract screenshot URLs from browser steps   │
│  • Attach descriptions to each image            │
│  • Organize in chronological order              │
│  • Store URLs for easy access                   │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  Step 6: Generate Social Posts (Gemini AI)      │
│  • Input: PR title, summary, screenshots        │
│  • Generate Twitter post (280 char limit)       │
│  • Generate LinkedIn post (detailed version)    │
│  • Add relevant hashtags and CTA                │
│  • Format with emojis and engagement hooks      │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  Dashboard: Present Results                     │
│  • Display Twitter + LinkedIn posts             │
│  • Show screenshot gallery                      │
│  • Provide live demo link                       │
│  • Copy-to-clipboard for easy posting           │
└─────────────────────────────────────────────────┘
```

### <img src="https://img.icons8.com/fluent/48/settings.png" alt="Tools" width="24"/> Tech Stack

**Backend (API):**
- <img src="https://img.icons8.com/fluent/24/bun.png" alt="Bun" width="18"/> **Bun** - Lightning-fast JavaScript runtime
- <img src="https://img.icons8.com/fluent/24/lightning-bolt.png" alt="Fast" width="18"/> **Elysia** - Type-safe REST framework for Bun
- <img src="https://img.icons8.com/fluent/24/database.png" alt="Database" width="18"/> **PostgreSQL** - Reliable data persistence
- <img src="https://img.icons8.com/fluent/24/synchronize.png" alt="Sync" width="18"/> **Drizzle ORM** - Type-safe database queries
- <img src="https://img.icons8.com/fluent/24/package.png" alt="Package" width="18"/> **Inngest** - Durable execution for multi-step workflows

**AI/ML Services:**
- <img src="https://img.icons8.com/fluent/24/bot.png" alt="Bot" width="18"/> **Google Gemini 2.0 Flash Lite** - Feature extraction, task generation, social post creation
- <img src="https://img.icons8.com/fluent/24/web.png" alt="Browser" width="18"/> **Browser-use SDK** - Natural browser automation for feature demonstration
- <img src="https://img.icons8.com/fluent/24/artificial-intelligence.png" alt="AI" width="18"/> **CodeRabbit AI** - Automatic PR summary generation (integrated via GitHub)
- <img src="https://img.icons8.com/fluent/24/cloud.png" alt="Cloud" width="18"/> **Daytona SDK** - Cloud sandbox orchestration

**Frontend:**
- <img src="https://img.icons8.com/fluent/24/react.png" alt="React" width="18"/> **Next.js 15** - React App Router with Server Components
- <img src="https://img.icons8.com/fluent/24/paint-palette.png" alt="Design" width="18"/> **Tailwind CSS 4** - Modern styling
- <img src="https://img.icons8.com/fluent/24/animation.png" alt="Animation" width="18"/> **Framer Motion** - Smooth animations
- <img src="https://img.icons8.com/fluent/24/template.png" alt="Components" width="18"/> **shadcn/ui** - Beautiful component library
- <img src="https://img.icons8.com/fluent/24/bar-chart.png" alt="Data" width="18"/> **TanStack Query** - Real-time data synchronization

**Infrastructure:**
- <img src="https://img.icons8.com/fluent/24/settings.png" alt="Settings" width="18"/> **PM2** - Process management for dev servers in sandboxes
- <img src="https://img.icons8.com/fluent/24/webhook.png" alt="Webhook" width="18"/> **Express.js** - GitHub webhook listener
- <img src="https://img.icons8.com/fluent/24/github.png" alt="GitHub" width="18"/> **GitHub Webhooks** - PR merge detection

---

## <img src="https://img.icons8.com/fluent/50/problem.png" alt="Challenge" width="28"/> Challenges we ran into

### 1. <img src="https://img.icons8.com/fluent/24/fire-element.png" alt="Fire" width="20"/> Keeping Dev Servers Alive in Sandboxes

**Problem:** Development servers in Daytona sandboxes would randomly die, breaking the workflow.

**Solution:** Integrated PM2 process manager into each sandbox:
```bash
pm2 start npm --name "dev-server" -- run dev
pm2 logs dev-server # Monitor in real-time
```
PM2 ensures dev servers stay alive indefinitely and provides automatic restarts if crashes occur.

---

### 2. <img src="https://img.icons8.com/fluent/24/brain.png" alt="Brain" width="20"/> Extracting Relevant Features from CodeRabbit Summaries

**Problem:** CodeRabbit summaries contain lots of technical details - how do we identify user-facing features?

**Solution:** Built AI-powered feature extraction:
- Feed CodeRabbit summary to Gemini AI
- Prompt specifically asks for "user-facing features" and "UI/UX changes"
- Filters out internal refactoring and dependency updates
- Returns clean list: `["Dark mode toggle", "Product search bar"]`

**Key insight:** Be explicit in prompts about what to include/exclude.

---

### 3. <img src="https://img.icons8.com/fluent/24/bot.png" alt="Bot" width="20"/> Natural Feature Demonstration with Browser Agents

**Problem:** Rigid scripts don't show features naturally. How do we make agents explore like real users?

**Solution:** Two-phase AI approach:
1. **Gemini generates exploratory task** based on features identified
2. **Browser-use agent executes** with natural, adaptive behavior

Example task: "Explore the new dark mode feature. Try toggling it on and off, and browse different pages to see how it looks."

Browser agent navigates naturally, not following rigid click-by-click instructions.

---

### 4. <img src="https://img.icons8.com/fluent/24/workflow.png" alt="Workflow" width="20"/> Coordinating Multi-Step Async Workflows

**Problem:** Each experiment involves 6+ async steps - sandboxes, browser agents, AI calls, database updates.

**Solution:** Leveraged Inngest's step functions for durable execution:
```typescript
await step.run('create-sandbox', async () => {...})
await step.run('extract-features', async () => {...})
await step.run('run-browser-agent', async () => {...})
await step.run('generate-social-post', async () => {...})
```

Benefits:
- Each step is retryable if it fails
- State persists across steps
- Easy debugging with step-by-step logs
- No manual orchestration code

---

### 5. <img src="https://img.icons8.com/fluent/24/twitter.png" alt="Twitter" width="20"/> Creating Engaging Social Media Copy

**Problem:** Generic AI posts sound robotic. How do we make posts engaging and authentic?

**Solution:** Crafted detailed prompt with:
- Tone guidance: "Enthusiastic, professional, friendly"
- Character limits: "Under 280 chars for Twitter"
- Structure requirements: "Value/benefit, excitement, CTA"
- Examples of good vs. bad posts

Result: Posts that sound human and drive engagement.

---

### 6. <img src="https://img.icons8.com/fluent/24/clock.png" alt="Clock" width="20"/> Handling Webhook Duplicates

**Problem:** GitHub sometimes sends duplicate webhook events, creating duplicate experiments.

**Solution:** Deduplication check before creating experiments:
```typescript
// Check if experiment already exists for this PR
const existingExperiments = await db
  .select()
  .from(experimentsTable)
  .where(eq(experimentsTable.repoUrl, repoUrl))
  .limit(1);

if (existingExperiments[0]?.goal === prTitle) {
  return { message: 'Duplicate ignored' };
}
```

---

## <img src="https://img.icons8.com/fluent/50/trophy.png" alt="Trophy" width="28"/> Accomplishments that we're proud of

### <img src="https://img.icons8.com/fluent/24/star.png" alt="Star" width="20"/> First Fully Autonomous DevRel Content Generator

We successfully built the **first end-to-end automated system** that goes from PR merge → social media posts with zero human intervention. No other tool automates the entire DevRel workflow.

---

### <img src="https://img.icons8.com/fluent/24/lightning-bolt.png" alt="Lightning" width="20"/> 95% Time Reduction for DevRel Teams

**Before AXIOM:** 3-5 hours per feature announcement  
**With AXIOM:** 3-5 minutes, fully automated  
**Time saved:** 2.5-5 hours per release

For teams shipping 2-3 features per week, that's **10-15 hours saved per week** = 40-60 hours/month!

---

### <img src="https://img.icons8.com/fluent/24/artificial-intelligence.png" alt="AI" width="20"/> Four-AI Orchestration

Successfully coordinated **four different AI systems** to work together seamlessly:
1. **CodeRabbit AI** - PR analysis and summaries
2. **Google Gemini** - Feature extraction, task generation, social posts
3. **Browser-use** - Natural feature demonstration
4. **Daytona** - Automated cloud sandbox provisioning

---

### <img src="https://img.icons8.com/fluent/24/workflow.png" alt="Workflow" width="20"/> Production-Ready Architecture

Built with enterprise-grade practices:
- Durable job execution (survives crashes)
- Type-safe end-to-end (TypeScript + Drizzle)
- Comprehensive error handling
- Real-time progress tracking
- Full audit trail
- Webhook signature verification
- Scalable service-oriented design

---

### <img src="https://img.icons8.com/fluent/24/camera.png" alt="Camera" width="20"/> Natural Feature Screenshots

Browser agents capture screenshots that look like **real user sessions**, not synthetic test screenshots. They show features in context, with natural interactions.

---

### <img src="https://img.icons8.com/fluent/24/twitter.png" alt="Twitter" width="20"/> Platform-Optimized Social Posts

Generates **separate optimized versions** for each platform:
- **Twitter:** Punchy, under 280 characters, exciting
- **LinkedIn:** Detailed, professional, longer format
- **Hashtags:** Relevant and engaging
- **CTAs:** Clear call-to-action

---

## <img src="https://img.icons8.com/fluent/50/book.png" alt="Book" width="28"/> What we learned

### <img src="https://img.icons8.com/fluent/24/artificial-intelligence.png" alt="AI" width="20"/> Multi-AI Orchestration Requires Careful Design

Coordinating 4 different AI systems taught us:
- Each AI has unique behaviors and latencies
- Prompt engineering is **critical** for consistent outputs
- Error handling must be robust (AI can fail unpredictably)
- Structured outputs (JSON) improve reliability dramatically
- Clear system boundaries prevent cascading failures

**Lesson:** Treat AI systems like microservices - clear inputs/outputs, error boundaries, fallbacks.

---

### <img src="https://img.icons8.com/fluent/24/cloud.png" alt="Cloud" width="20"/> Cloud Sandboxes Are Essential for Automation

Daytona's isolated environments were game-changing:
- Spin up clean environments instantly
- No local setup or configuration
- Public URLs make testing seamless
- True isolation prevents conflicts
- Automatic cleanup after completion

**Lesson:** Cloud development environments are the future of CI/CD and automation.

---

### <img src="https://img.icons8.com/fluent/24/workflow.png" alt="Workflow" width="20"/> Durable Execution Is Non-Negotiable

Inngest's step functions transformed our reliability:
- Workflows survive crashes and restarts
- Automatic retries on transient failures
- State persists across steps
- Easy debugging with step logs
- No manual state management code

**Lesson:** For complex workflows, use a durable execution engine from day one.

---

### <img src="https://img.icons8.com/fluent/24/goal.png" alt="Target" width="20"/> Prompt Engineering > Model Selection

We discovered that **well-crafted prompts** matter more than model size:
- Gemini 2.0 Flash Lite (small) with great prompts outperformed larger models with vague prompts
- Context and examples are crucial
- Structured outputs (JSON schemas) improve accuracy
- Iterative refinement based on real outputs is essential

**Lesson:** Invest time in prompt engineering, not just picking the latest/largest model.

---

### <img src="https://img.icons8.com/fluent/24/bot.png" alt="Bot" width="20"/> Natural Automation Beats Rigid Scripts

Browser-use's natural exploration provides better results than traditional automation:
- Agents discover edge cases we didn't consider
- Screenshots look authentic (like real users)
- Demonstrations feel genuine, not robotic
- Flexible to handle unexpected UI changes

**Lesson:** AI-powered automation is more robust than hardcoded scripts.

---

### <img src="https://img.icons8.com/fluent/24/user.png" alt="User" width="20"/> DevRel Teams Need Better Tools

Through building this, we realized:
- DevRel is severely under-tooled (mostly manual work)
- Content creation is repetitive and time-consuming
- Teams want to focus on strategy, not screenshot capture
- Automation can 10x DevRel productivity

**Lesson:** There's huge opportunity in DevRel tooling and automation.

---

## <img src="https://img.icons8.com/fluent/50/rocket.png" alt="Rocket" width="28"/> What's next for AXIOM

### <img src="https://img.icons8.com/fluent/24/goal.png" alt="Target" width="20"/> Short-term (Next 3 months)

**<img src="https://img.icons8.com/fluent/20/twitter.png" alt="Twitter" width="16"/> Direct Twitter/LinkedIn Posting**
- Integrate Twitter API for automatic posting
- LinkedIn API for company page updates
- Schedule posts for optimal times
- Track engagement metrics automatically

**<img src="https://img.icons8.com/fluent/20/video.png" alt="Video" width="16"/> Video Demos Instead of Screenshots**
- Record browser sessions as MP4 videos
- Create GIF animations of key interactions
- Auto-generate video with narration
- Perfect for Twitter video posts

**<img src="https://img.icons8.com/fluent/20/edit.png" alt="Edit" width="16"/> Custom Post Templates**
- Let teams define their brand voice
- Custom hashtag preferences
- Company-specific formatting
- Template library for different feature types

**<img src="https://img.icons8.com/fluent/20/bell.png" alt="Bell" width="16"/> Multi-Channel Distribution**
- Slack notifications when content is ready
- Discord integration
- Email summaries
- Webhook to custom systems

---

### <img src="https://img.icons8.com/fluent/24/goal.png" alt="Target" width="20"/> Medium-term (3-6 months)

**<img src="https://img.icons8.com/fluent/20/bar-chart.png" alt="Chart" width="16"/> Analytics Dashboard**
- Track post performance (likes, shares, comments)
- A/B test different post styles
- Identify best-performing features
- ROI metrics for DevRel efforts

**<img src="https://img.icons8.com/fluent/20/blog.png" alt="Blog" width="16"/> Blog Post Generation**
- Generate full technical blog posts from PRs
- Include code examples and explanations
- SEO optimization
- Markdown export for publishing

**<img src="https://img.icons8.com/fluent/20/youtube.png" alt="YouTube" width="16"/> YouTube Shorts / TikTok**
- Generate short-form video content
- Vertical format optimization
- Trending music integration
- Auto-upload to platforms

**<img src="https://img.icons8.com/fluent/20/diversity.png" alt="Multiple" width="16"/> Multi-Language Support**
- Translate posts to multiple languages
- Localized hashtags
- Regional best practices
- Timezone-aware scheduling

---

### <img src="https://img.icons8.com/fluent/24/goal.png" alt="Target" width="20"/> Long-term (6+ months)

**<img src="https://img.icons8.com/fluent/20/calendar.png" alt="Calendar" width="16"/> Content Calendar Planning**
- Plan feature releases around content calendar
- Batch multiple features for coordinated launches
- Campaign management
- Content strategy recommendations

**<img src="https://img.icons8.com/fluent/20/collaboration.png" alt="Team" width="16"/> Team Collaboration Features**
- Review and approve posts before publishing
- Assign tasks to team members
- Comment and feedback system
- Version control for post copy

**<img src="https://img.icons8.com/fluent/20/puzzle.png" alt="Integration" width="16"/> Product Hunt / Hacker News Integration**
- Auto-generate Product Hunt launch posts
- Hacker News "Show HN" posts
- Reddit post optimization
- Cross-platform campaign orchestration

**<img src="https://img.icons8.com/fluent/20/api.png" alt="API" width="16"/> Public API & Zapier Integration**
- Public API for custom integrations
- Zapier/Make.com connectors
- Webhook triggers for other tools
- White-label options for agencies

---

## <img src="https://img.icons8.com/fluent/50/video.png" alt="Demo" width="28"/> Real-World Example

### <img src="https://img.icons8.com/fluent/24/github.png" alt="GitHub" width="20"/> Scenario: E-commerce Dark Mode Feature

**PR Merged:** "Add dark mode toggle to settings"  
**CodeRabbit Summary:** "Implemented dark mode with persistent user preference, theme toggle in settings, and smooth transitions"

**AXIOM's Automated Process:**

**1. Webhook received** → Experiment created  
**2. Sandbox spun up** → App deployed with dark mode  
**3. Features extracted:** 
- "Dark mode toggle in settings"
- "Persistent theme preference"
- "Smooth color transitions"

**4. Browser agent task:** "Explore the new dark mode feature. Navigate to settings, toggle dark mode on and off, and browse different pages to show the theme change."

**5. Screenshots captured (6 total):**
- Screenshot 1: Settings page with toggle
- Screenshot 2: Toggle switched to dark mode
- Screenshot 3: Homepage in dark mode
- Screenshot 4: Product page in dark mode
- Screenshot 5: Cart page in dark mode
- Screenshot 6: Toggle back to light mode

**6. Social posts generated:**

**Twitter:**
> 🌙 Dark mode is here! Your eyes will thank you. Toggle between light and dark themes seamlessly in settings. Try it now! #DarkMode #UX #WebDev #UserExperience

**LinkedIn:**
> We're excited to announce the launch of our highly requested dark mode feature! 🌙
>
> This update includes:
> ✅ One-click theme toggle in settings
> ✅ Persistent theme preference across sessions
> ✅ Smooth transitions for a polished experience
>
> We've listened to your feedback and built a dark mode that's easy on the eyes during late-night shopping sessions. Try it out and let us know what you think!
>
> #DarkMode #ProductUpdate #UXDesign #WebDevelopment #EcommerceTech

**7. Dashboard shows:**
- Live demo link: `https://sandbox-abc123.daytona.dev`
- 6 screenshots ready to download
- Copy buttons for Twitter + LinkedIn posts
- Total time: **4 minutes 32 seconds**

---

## <img src="https://img.icons8.com/fluent/50/settings.png" alt="Tools" width="28"/> Built With

- [Daytona](https://www.daytona.io/) - Cloud development environments
- [Browser-use](https://browser-use.com/) - Natural browser automation
- [Bun](https://bun.sh/) - Fast JavaScript runtime
- [Elysia](https://elysiajs.com/) - Type-safe web framework
- [Next.js](https://nextjs.org/) - React framework
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Inngest](https://www.inngest.com/) - Durable execution
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Google Gemini](https://deepmind.google/technologies/gemini/) - AI for feature extraction and social posts
- [CodeRabbit AI](https://coderabbit.ai/) - Automated PR reviews and summaries

---

## <img src="https://img.icons8.com/fluent/50/user-group-man-man.png" alt="Team" width="28"/> Team

**Built by:** Omkar & Nihal  
**Repository:** [github.com/Omkar399/daytona-hack](https://github.com/Omkar399/daytona-hack)

---

## <img src="https://img.icons8.com/fluent/50/rocket.png" alt="Launch" width="28"/> Try AXIOM

### Setup:

**1. Backend:**
```bash
cd api
bun install
bun run db:push      # Initialize database
bun run dev          # Terminal 1: API server (port 8000)
bun run inngest      # Terminal 2: Background jobs
```

**2. Frontend:**
```bash
cd web
npm install
npm run dev          # Port 3000
```

**3. GitHub Webhook Server:**
```bash
cd gh-webhook
npm install
npm run dev          # Port 8080
```

**4. Configure GitHub Webhook:**
- Go to your repo → Settings → Webhooks
- Add webhook: `https://your-domain.com/github-webhook`
- Content type: `application/json`
- Secret: Generate with `openssl rand -hex 32`
- Events: Select "Pull requests"

**5. Environment Variables:**
```env
# api/.env
DATABASE_URL=postgresql://...
DAYTONA_API_KEY=your_key
GOOGLE_AI_API_KEY=your_gemini_key
INNGEST_EVENT_KEY=your_key
BROWSER_USE_API_KEY=your_key

# gh-webhook/.env
GH_WEBHOOK_SECRET=your_webhook_secret
GH_TOKEN=your_github_token
SANDBOX_URL=http://localhost:8000/experiment/from-webhook
```

**6. Test It:**
- Merge a PR to your repository
- AXIOM automatically processes it
- Visit `http://localhost:3000` to see results
- Copy generated posts and share on social media!

---

## <img src="https://img.icons8.com/fluent/50/thanks.png" alt="Thanks" width="28"/> Acknowledgments

Huge thanks to:
- **Daytona** for revolutionizing cloud development environments
- **Browser-use** for making browser automation natural and AI-powered
- **CodeRabbit** for excellent PR analysis and summaries
- **Inngest** for making durable execution accessible
- **Google** for Gemini API and incredible AI models
- **The open-source community** for amazing tools

---

<div align="center">

## <img src="https://img.icons8.com/fluent/48/lightning-bolt.png" alt="Lightning" width="32"/> From 5 hours to 5 minutes - that's the power of AXIOM

**DevRel automation for the modern era**

**Made with <img src="https://img.icons8.com/fluent/20/heart.png" alt="Love" width="16"/> for Daytona Hacksprint 2025**

</div>
