# 🚀 AXIOM - AI-Powered DevRel Automation

## Turn every PR merge into engaging social media content - automatically.

**Built for:** Daytona Hacksprint 2025

---

## 🎯 Inspiration

Every Developer Relations team faces the same challenge: **You ship amazing features, but creating social media content takes hours.**

### The Manual Process is Exhausting:

| Step | Time Required |
|------|---------------|
| 💻 PR gets merged → Code ships to production | Instant |
| ⏰ DevRel team manually reviews changes | 1-2 hours |
| 🖥️ Spin up the app to take screenshots | 30-60 minutes |
| 📸 Manually capture screenshots of new features | 30 minutes |
| ✍️ Write engaging social media posts | 30-60 minutes |
| 🐦 Post to Twitter/LinkedIn manually | 15 minutes |

**Total time: 3-5 hours per feature release** 😰

### The Vision

We wondered: **What if AI could do ALL of this automatically when a PR merges?**

That's why we built **AXIOM** - the world's first fully autonomous DevRel content generation platform.

---

## 💡 What it does

AXIOM is an **AI-powered DevRel automation platform** that turns every GitHub PR merge into ready-to-post social media content.

### ⚡ The Complete Automation

**When you merge a PR, AXIOM automatically:**

#### 1. 🔔 Detects the Merge
- GitHub webhook triggers instantly on PR merge
- Extracts PR title, description, and CodeRabbit AI summary
- Identifies what features/changes were added

#### 2. ☁️ Spins Up Live Demo
- Creates isolated Daytona sandbox with merged code
- Clones repository and installs dependencies
- Starts development server with your latest changes
- Gets public preview URL for testing

#### 3. 🤖 Demonstrates New Features
- AI analyzes CodeRabbit summary to identify key changes
- Browser-use agents explore your app like real users
- Agents naturally interact with new features (click, scroll, navigate)
- Captures what changed and how users will experience it

#### 4. 📸 Captures Professional Screenshots
- Takes screenshots at each interaction step
- Shows new features in action
- Captures user flows and visual changes
- Collects multiple angles for best presentation

#### 5. 🧠 Generates Social Media Posts
- Google Gemini AI creates engaging post copy
- Tailored versions for Twitter (280 chars) AND LinkedIn (detailed)
- Includes relevant hashtags and call-to-action
- References screenshots automatically

#### 6. 📊 Presents Everything in Dashboard
- Beautiful UI showing all generated content
- Screenshot gallery ready to download
- Copy Twitter + LinkedIn posts with one click
- Live demo link to share

---

### ⚡ The Result

| Metric | Before AXIOM | With AXIOM | Savings |
|--------|--------------|------------|---------|
| **Time per feature** | 3-5 hours | 3-5 minutes | ⚡ **95% reduction** |
| **Human involvement** | 100% manual | 0% manual | ✨ Fully automated |
| **Consistency** | Varies | Always high | 🎯 Professional quality |

---

## 🏗️ How we built it

### 🔄 Complete Workflow

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

### 🛠️ Tech Stack

#### Backend (API)
- ⚡ **Bun** - Lightning-fast JavaScript runtime
- 🚀 **Elysia** - Type-safe REST framework for Bun
- 🗄️ **PostgreSQL** - Reliable data persistence
- 🔄 **Drizzle ORM** - Type-safe database queries
- 📦 **Inngest** - Durable execution for multi-step workflows

#### AI/ML Services
- 🧠 **Google Gemini 2.0 Flash Lite** - Feature extraction, task generation, social post creation
- 🌐 **Browser-use SDK** - Natural browser automation for feature demonstration
- 🤖 **CodeRabbit AI** - Automatic PR summary generation (integrated via GitHub)
- ☁️ **Daytona SDK** - Cloud sandbox orchestration

#### Frontend
- ⚛️ **Next.js 15** - React App Router with Server Components
- 🎨 **Tailwind CSS 4** - Modern styling
- ✨ **Framer Motion** - Smooth animations
- 🧩 **shadcn/ui** - Beautiful component library
- 📊 **TanStack Query** - Real-time data synchronization

#### Infrastructure
- ⚙️ **PM2** - Process management for dev servers in sandboxes
- 🔗 **Express.js** - GitHub webhook listener
- 🐙 **GitHub Webhooks** - PR merge detection

---

## 🚧 Challenges we ran into

### 1. 🔥 Keeping Dev Servers Alive in Sandboxes

**Problem:** Development servers in Daytona sandboxes would randomly die, breaking the workflow.

**Solution:** Integrated PM2 process manager into each sandbox:

```bash
pm2 start npm --name "dev-server" -- run dev
pm2 logs dev-server # Monitor in real-time
```

PM2 ensures dev servers stay alive indefinitely and provides automatic restarts if crashes occur.

---

### 2. 🧠 Extracting Relevant Features from CodeRabbit Summaries

**Problem:** CodeRabbit summaries contain lots of technical details - how do we identify user-facing features?

**Solution:** Built AI-powered feature extraction:
- Feed CodeRabbit summary to Gemini AI
- Prompt specifically asks for "user-facing features" and "UI/UX changes"
- Filters out internal refactoring and dependency updates
- Returns clean list: `["Dark mode toggle", "Product search bar"]`

**Key insight:** Be explicit in prompts about what to include/exclude.

---

### 3. 🤖 Natural Feature Demonstration with Browser Agents

**Problem:** Rigid scripts don't show features naturally. How do we make agents explore like real users?

**Solution:** Two-phase AI approach:
1. **Gemini generates exploratory task** based on features identified
2. **Browser-use agent executes** with natural, adaptive behavior

Example task: *"Explore the new dark mode feature. Try toggling it on and off, and browse different pages to see how it looks."*

Browser agent navigates naturally, not following rigid click-by-click instructions.

---

### 4. 🔄 Coordinating Multi-Step Async Workflows

**Problem:** Each experiment involves 6+ async steps - sandboxes, browser agents, AI calls, database updates.

**Solution:** Leveraged Inngest's step functions for durable execution:

```typescript
await step.run('create-sandbox', async () => {...})
await step.run('extract-features', async () => {...})
await step.run('run-browser-agent', async () => {...})
await step.run('generate-social-post', async () => {...})
```

**Benefits:**
- ✅ Each step is retryable if it fails
- ✅ State persists across steps
- ✅ Easy debugging with step-by-step logs
- ✅ No manual orchestration code

---

### 5. 🐦 Creating Engaging Social Media Copy

**Problem:** Generic AI posts sound robotic. How do we make posts engaging and authentic?

**Solution:** Crafted detailed prompt with:
- 🎯 Tone guidance: "Enthusiastic, professional, friendly"
- 📏 Character limits: "Under 280 chars for Twitter"
- 📝 Structure requirements: "Value/benefit, excitement, CTA"
- 📋 Examples of good vs. bad posts

**Result:** Posts that sound human and drive engagement.

---

### 6. ⏱️ Handling Webhook Duplicates

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

## 🏆 Accomplishments that we're proud of

### ⭐ First Fully Autonomous DevRel Content Generator

We successfully built the **first end-to-end automated system** that goes from PR merge → social media posts with zero human intervention. No other tool automates the entire DevRel workflow.

---

### ⚡ 95% Time Reduction for DevRel Teams

| Metric | Time |
|--------|------|
| **Before AXIOM** | 3-5 hours per feature |
| **With AXIOM** | 3-5 minutes, fully automated |
| **Time saved per release** | 2.5-5 hours |

For teams shipping 2-3 features per week, that's **10-15 hours saved per week** = **40-60 hours/month!**

---

### 🤖 Four-AI Orchestration

Successfully coordinated **four different AI systems** to work together seamlessly:

1. **CodeRabbit AI** - PR analysis and summaries
2. **Google Gemini** - Feature extraction, task generation, social posts
3. **Browser-use** - Natural feature demonstration
4. **Daytona** - Automated cloud sandbox provisioning

---

### 🏗️ Production-Ready Architecture

Built with enterprise-grade practices:

- ✅ Durable job execution (survives crashes)
- ✅ Type-safe end-to-end (TypeScript + Drizzle)
- ✅ Comprehensive error handling
- ✅ Real-time progress tracking
- ✅ Full audit trail
- ✅ Webhook signature verification
- ✅ Scalable service-oriented design

---

### 📸 Natural Feature Screenshots

Browser agents capture screenshots that look like **real user sessions**, not synthetic test screenshots. They show features in context, with natural interactions.

---

### 🐦 Platform-Optimized Social Posts

Generates **separate optimized versions** for each platform:

- **Twitter:** Punchy, under 280 characters, exciting
- **LinkedIn:** Detailed, professional, longer format
- **Hashtags:** Relevant and engaging
- **CTAs:** Clear call-to-action

---

## 📚 What we learned

### 🤖 Multi-AI Orchestration Requires Careful Design

Coordinating 4 different AI systems taught us:

- Each AI has unique behaviors and latencies
- Prompt engineering is **critical** for consistent outputs
- Error handling must be robust (AI can fail unpredictably)
- Structured outputs (JSON) improve reliability dramatically
- Clear system boundaries prevent cascading failures

**💡 Lesson:** Treat AI systems like microservices - clear inputs/outputs, error boundaries, fallbacks.

---

### ☁️ Cloud Sandboxes Are Essential for Automation

Daytona's isolated environments were game-changing:

- ⚡ Spin up clean environments instantly
- 🎯 No local setup or configuration
- 🌐 Public URLs make testing seamless
- 🔒 True isolation prevents conflicts
- 🧹 Automatic cleanup after completion

**💡 Lesson:** Cloud development environments are the future of CI/CD and automation.

---

### 🔄 Durable Execution Is Non-Negotiable

Inngest's step functions transformed our reliability:

- ♻️ Workflows survive crashes and restarts
- 🔁 Automatic retries on transient failures
- 💾 State persists across steps
- 🐛 Easy debugging with step logs
- 🚫 No manual state management code

**💡 Lesson:** For complex workflows, use a durable execution engine from day one.

---

### 🎯 Prompt Engineering > Model Selection

We discovered that **well-crafted prompts** matter more than model size:

- Gemini 2.0 Flash Lite (small) with great prompts outperformed larger models with vague prompts
- Context and examples are crucial
- Structured outputs (JSON schemas) improve accuracy
- Iterative refinement based on real outputs is essential

**💡 Lesson:** Invest time in prompt engineering, not just picking the latest/largest model.

---

### 🤖 Natural Automation Beats Rigid Scripts

Browser-use's natural exploration provides better results than traditional automation:

- 🔍 Agents discover edge cases we didn't consider
- 📸 Screenshots look authentic (like real users)
- ✨ Demonstrations feel genuine, not robotic
- 🔧 Flexible to handle unexpected UI changes

**💡 Lesson:** AI-powered automation is more robust than hardcoded scripts.

---

### 👥 DevRel Teams Need Better Tools

Through building this, we realized:

- 🛠️ DevRel is severely under-tooled (mostly manual work)
- ⏱️ Content creation is repetitive and time-consuming
- 🎯 Teams want to focus on strategy, not screenshot capture
- 📈 Automation can 10x DevRel productivity

**💡 Lesson:** There's huge opportunity in DevRel tooling and automation.

---

## 🚀 What's next for AXIOM

### 🎯 Short-term (Next 3 months)

#### 🐦 Direct Twitter/LinkedIn Posting
- Integrate Twitter API for automatic posting
- LinkedIn API for company page updates
- Schedule posts for optimal times
- Track engagement metrics automatically

#### 🎥 Video Demos Instead of Screenshots
- Record browser sessions as MP4 videos
- Create GIF animations of key interactions
- Auto-generate video with narration
- Perfect for Twitter video posts

#### ✍️ Custom Post Templates
- Let teams define their brand voice
- Custom hashtag preferences
- Company-specific formatting
- Template library for different feature types

#### 🔔 Multi-Channel Distribution
- Slack notifications when content is ready
- Discord integration
- Email summaries
- Webhook to custom systems

---

### 🎯 Medium-term (3-6 months)

#### 📊 Analytics Dashboard
- Track post performance (likes, shares, comments)
- A/B test different post styles
- Identify best-performing features
- ROI metrics for DevRel efforts

#### 📝 Blog Post Generation
- Generate full technical blog posts from PRs
- Include code examples and explanations
- SEO optimization
- Markdown export for publishing

#### 📱 YouTube Shorts / TikTok
- Generate short-form video content
- Vertical format optimization
- Trending music integration
- Auto-upload to platforms

#### 🌍 Multi-Language Support
- Translate posts to multiple languages
- Localized hashtags
- Regional best practices
- Timezone-aware scheduling

---

### 🎯 Long-term (6+ months)

#### 📅 Content Calendar Planning
- Plan feature releases around content calendar
- Batch multiple features for coordinated launches
- Campaign management
- Content strategy recommendations

#### 👥 Team Collaboration Features
- Review and approve posts before publishing
- Assign tasks to team members
- Comment and feedback system
- Version control for post copy

#### 🧩 Product Hunt / Hacker News Integration
- Auto-generate Product Hunt launch posts
- Hacker News "Show HN" posts
- Reddit post optimization
- Cross-platform campaign orchestration

#### 🔌 Public API & Zapier Integration
- Public API for custom integrations
- Zapier/Make.com connectors
- Webhook triggers for other tools
- White-label options for agencies

---

## 🎬 Real-World Example

### 🌙 Scenario: E-commerce Dark Mode Feature

**PR Merged:** "Add dark mode toggle to settings"  
**CodeRabbit Summary:** "Implemented dark mode with persistent user preference, theme toggle in settings, and smooth transitions"

---

### ⚙️ AXIOM's Automated Process:

#### Step 1-2: Setup
- ✅ Webhook received → Experiment created
- ✅ Sandbox spun up → App deployed with dark mode

#### Step 3: Features Extracted
- 🌙 "Dark mode toggle in settings"
- 💾 "Persistent theme preference"
- ✨ "Smooth color transitions"

#### Step 4: Browser Agent Task
*"Explore the new dark mode feature. Navigate to settings, toggle dark mode on and off, and browse different pages to show the theme change."*

#### Step 5: Screenshots Captured (6 total)
1. 📸 Settings page with toggle
2. 📸 Toggle switched to dark mode
3. 📸 Homepage in dark mode
4. 📸 Product page in dark mode
5. 📸 Cart page in dark mode
6. 📸 Toggle back to light mode

---

### 📱 Social Posts Generated:

#### Twitter:
> 🌙 Dark mode is here! Your eyes will thank you. Toggle between light and dark themes seamlessly in settings. Try it now! #DarkMode #UX #WebDev #UserExperience

#### LinkedIn:
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

---

### 📊 Dashboard Results:

| Feature | Details |
|---------|---------|
| 🔗 **Live demo link** | `https://sandbox-abc123.daytona.dev` |
| 📸 **Screenshots** | 6 screenshots ready to download |
| 📋 **Copy buttons** | Twitter + LinkedIn posts |
| ⏱️ **Total time** | **4 minutes 32 seconds** |

---

## 🛠️ Built With

| Technology | Purpose |
|------------|---------|
| [Daytona](https://www.daytona.io/) | Cloud development environments |
| [Browser-use](https://browser-use.com/) | Natural browser automation |
| [Bun](https://bun.sh/) | Fast JavaScript runtime |
| [Elysia](https://elysiajs.com/) | Type-safe web framework |
| [Next.js](https://nextjs.org/) | React framework |
| [PostgreSQL](https://www.postgresql.org/) | Database |
| [Inngest](https://www.inngest.com/) | Durable execution |
| [TailwindCSS](https://tailwindcss.com/) | Styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Google Gemini](https://deepmind.google/technologies/gemini/) | AI for feature extraction and social posts |
| [CodeRabbit AI](https://coderabbit.ai/) | Automated PR reviews and summaries |

---

## 👥 Team

**Built by:** Omkar & Nihal  
**Repository:** [github.com/Omkar399/daytona-hack](https://github.com/Omkar399/daytona-hack)

---

## 🚀 Try AXIOM

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

## 🙏 Acknowledgments

Huge thanks to:

- ☁️ **Daytona** for revolutionizing cloud development environments
- 🌐 **Browser-use** for making browser automation natural and AI-powered
- 🤖 **CodeRabbit** for excellent PR analysis and summaries
- 📦 **Inngest** for making durable execution accessible
- 🧠 **Google** for Gemini API and incredible AI models
- 💻 **The open-source community** for amazing tools

---

<div align="center">

## ⚡ From 5 hours to 5 minutes - that's the power of AXIOM

**DevRel automation for the modern era**

**Made with ❤️ for Daytona Hacksprint 2025**

</div>
