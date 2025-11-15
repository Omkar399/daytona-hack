# How The System Works - Complete Workflow

## Overview

This is an **autonomous UX experimentation system** that automatically:
1. Tests your website with AI browser agents
2. Identifies UX problems
3. Generates code fixes
4. Tests variants in isolated sandboxes
5. Shows you which variant performs best

---

## Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     USER INTERFACE                          │
│              (Next.js Dashboard at :3000)                   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ User fills form:
                     │ - GitHub Repo URL
                     │ - Goal: "Increase signup conversion"
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              BACKEND API (Elysia at :8000)                  │
│                                                              │
│  POST /experiment                                           │
│  ┌────────────────────────────────────────┐                │
│  │ 1. Create Experiment Record            │                │
│  │    - Generate unique ID                 │                │
│  │    - Save to PostgreSQL                 │                │
│  │    - Status: "pending"                  │                │
│  └───────────────┬────────────────────────┘                │
│                  │                                          │
│                  ▼                                          │
│  ┌────────────────────────────────────────┐                │
│  │ 2. Trigger Inngest Job                 │                │
│  │    inngestClient.send({                 │                │
│  │      name: "experiment/run",            │                │
│  │      data: { experiment }               │                │
│  │    })                                    │                │
│  └───────────────┬────────────────────────┘                │
└──────────────────┼──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│              INNGEST JOB ORCHESTRATION                      │
│         (Background Job Runner - event/run)                 │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
        ┌─────────────────────────────┐
        │  STEP 1: Initialize Control │
        └─────────────┬───────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              DAYTONA SDK INTEGRATION                        │
│                                                              │
│  ┌────────────────────────────────────┐                     │
│  │ 1. Create Sandbox                  │                     │
│  │    daytona.create({                 │                     │
│  │      language: "typescript",        │                     │
│  │      public: true                   │                     │
│  │    })                               │                     │
│  │    → Returns: { id, name, url }     │                     │
│  └───────────────┬────────────────────┘                     │
│                  │                                          │
│  ┌───────────────▼────────────────────┐                     │
│  │ 2. Clone Repository                │                     │
│  │    sandbox.git.clone(               │                     │
│  │      "https://github.com/...",      │                     │
│  │      "workspace/commerce"           │                     │
│  │    )                                │                     │
│  └───────────────┬────────────────────┘                     │
│                  │                                          │
│  ┌───────────────▼────────────────────┐                     │
│  │ 3. Install Dependencies            │                     │
│  │    sandbox.process.executeCommand(  │                     │
│  │      "npm install",                 │                     │
│  │      "workspace/commerce"           │                     │
│  │    )                                │                     │
│  └───────────────┬────────────────────┘                     │
│                  │                                          │
│  ┌───────────────▼────────────────────┐                     │
│  │ 4. Start Dev Server (PM2)          │                     │
│  │    sandbox.process.executeCommand(  │                     │
│  │      "pm2 start npm -- run dev",    │                     │
│  │      "workspace/commerce"           │                     │
│  │    )                                │                     │
│  │    → Dev server running on :3000    │                     │
│  └───────────────┬────────────────────┘                     │
│                  │                                          │
│  ┌───────────────▼────────────────────┐                     │
│  │ 5. Get Preview URL                 │                     │
│  │    sandbox.getPreviewLink(3000)     │                     │
│  │    → Returns: "https://preview.daytona.io/..."           │
│  └───────────────┬────────────────────┘                     │
│                  │                                          │
│  ┌───────────────▼────────────────────┐                     │
│  │ 6. Save Control Variant to DB      │                     │
│  │    - daytonaSandboxId               │                     │
│  │    - publicUrl                      │                     │
│  │    - type: "control"                │                     │
│  └────────────────────────────────────┘                     │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
        ┌─────────────────────────────┐
        │  STEP 2: Run Browser Agent  │
        └─────────────┬───────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              GOOGLE GEMINI AI                               │
│                                                              │
│  ┌────────────────────────────────────┐                     │
│  │ Generate Browser Task Prompt       │                     │
│  │                                    │                     │
│  │ Input:                             │                     │
│  │ - Goal: "Increase signup"          │                     │
│  │ - URL: preview URL                 │                     │
│  │                                    │                     │
│  │ Output: Natural task like:         │                     │
│  │ "Visit the website and browse as   │                     │
│  │  a customer looking to sign up.    │                     │
│  │  Try to complete the signup flow   │                     │
│  │  and note any confusion or         │                     │
│  │  friction points you encounter."   │                     │
│  └───────────────┬────────────────────┘                     │
└──────────────────┼──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│              BROWSER-USE SDK                                │
│                                                              │
│  ┌────────────────────────────────────┐                     │
│  │ 1. Create Browser Task             │                     │
│  │    browserUse.tasks.createTask({    │                     │
│  │      task: "Visit website...",      │                     │
│  │      startUrl: preview URL          │                     │
│  │    })                               │                     │
│  │    → Returns: { id, liveUrl }       │                     │
│  └───────────────┬────────────────────┘                     │
│                  │                                          │
│                  │ AI Agent "thinks" and acts:              │
│                  │ - Opens browser                          │
│                  │ - Navigates website                      │
│                  │ - Clicks buttons                         │
│                  │ - Fills forms                            │
│                  │ - Takes screenshots                      │
│                  │ - Records observations                   │
│                  │                                          │
│  ┌───────────────▼────────────────────┐                     │
│  │ 2. Wait for Task Completion        │                     │
│  │    Poll every 3 seconds until:      │                     │
│  │    - status === "finished"          │                     │
│  │    - status === "stopped"           │                     │
│  └───────────────┬────────────────────┘                     │
│                  │                                          │
│  ┌───────────────▼────────────────────┐                     │
│  │ 3. Collect Screenshots             │                     │
│  │    browserUse.tasks.getTaskSteps()  │                     │
│  │    → Returns array of steps with:   │                     │
│  │      - screenshotUrl                │                     │
│  │      - description                  │                     │
│  │      - memory (agent thoughts)      │                     │
│  └────────────────────────────────────┘                     │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│              GOOGLE GEMINI AI (Again)                       │
│                                                              │
│  ┌────────────────────────────────────┐                     │
│  │ Analyze Browser Logs               │                     │
│  │                                    │                     │
│  │ Input:                             │                     │
│  │ - Browser agent logs               │                     │
│  │ - Original goal                    │                     │
│  │                                    │                     │
│  │ Output:                            │                     │
│  │ {                                  │                     │
│  │   success: true,                   │                     │
│  │   summary: "Agent successfully...",│                     │
│  │   insights: "Found that signup...",│                     │
│  │   issues: "Confusing form layout"  │                     │
│  │ }                                  │                     │
│  └───────────────┬────────────────────┘                     │
│                  │                                          │
│  ┌───────────────▼────────────────────┐                     │
│  │ Generate Variant Suggestions       │                     │                     │
│  │                                    │                     │
│  │ Input:                             │                     │
│  │ - Control test results             │                     │
│  │ - Issues found                     │                     │
│  │                                    │                     │
│  │ Output: Array of suggestions:      │                     │
│  │ [                                  │                     │
│  │   "Simplify signup form layout",   │                     │
│  │   "Add clear error messages",      │                     │
│  │   "Make CTA button more prominent" │                     │
│  │ ]                                  │                     │
│  └────────────────────────────────────┘                     │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
        ┌─────────────────────────────┐
        │  STEP 3: Implement Variants │
        │   (For each suggestion)     │
        └─────────────┬───────────────┘
                      │
                      ▼ (Parallel execution)
┌─────────────────────────────────────────────────────────────┐
│              CLAUDE CODE SDK                                │
│                                                              │
│  For each variant suggestion:                               │
│                                                              │
│  ┌────────────────────────────────────┐                     │
│  │ 1. Create New Sandbox              │                     │
│  │    (Same as Step 1)                 │                     │
│  └───────────────┬────────────────────┘                     │
│                  │                                          │
│  ┌───────────────▼────────────────────┐                     │
│  │ 2. Spawn Claude Code Agent         │                     │
│  │    - Agent reads codebase           │                     │
│  │    - Understands context            │                     │
│  │    - Implements the suggestion      │                     │
│  │    - Makes surgical code changes    │                     │
│  │    - Reports back via webhook       │                     │
│  └───────────────┬────────────────────┘                     │
│                  │                                          │
│  ┌───────────────▼────────────────────┐                     │
│  │ 3. Start Dev Server                │                     │
│  │    - PM2 runs dev server            │                     │
│  │    - Get preview URL                │                     │
│  └───────────────┬────────────────────┘                     │
│                  │                                          │
│  ┌───────────────▼────────────────────┐                     │
│  │ 4. Save Variant to DB              │                     │
│  │    - variantId                      │                     │
│  │    - daytonaSandboxId               │                     │
│  │    - publicUrl                      │                     │
│  │    - suggestion text                │                     │
│  │    - type: "experiment"             │                     │
│  └────────────────────────────────────┘                     │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
        ┌─────────────────────────────┐
        │  STEP 4: Test Each Variant  │
        │   (Same as Step 2)          │
        └─────────────┬───────────────┘
                      │
                      ▼
        [Run browser agent on each variant]
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              RESULTS COMPARISON                             │
│                                                              │
│  Control Variant:    Variant A:      Variant B:            │
│  - Success: 60%      - Success: 78%  - Success: 45%        │
│  - Issues: High      - Issues: Low   - Issues: High        │
│                                                              │
│  → Variant A wins! (78% success rate)                      │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│              UPDATE DATABASE                                │
│                                                              │
│  - Update experiment status: "completed"                    │
│  - Store variant results                                    │
│  - Update analysis data                                     │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│              FRONTEND UPDATES                               │
│                                                              │
│  React Query:                                                │
│  - Polls /experiment/:id                                     │
│  - Refetches every few seconds                              │
│  - Updates UI automatically                                 │
│                                                              │
│  User sees:                                                  │
│  - Real-time progress                                        │
│  - Status updates                                            │
│  - Screenshots                                               │
│  - Variant comparisons                                       │
│  - Winner identified                                         │
└─────────────────────────────────────────────────────────────┘
```

---

## Detailed Step-by-Step Execution

### **Step 1: User Creates Experiment**

**Frontend (`web/src/app/page.tsx`)**
```typescript
// User fills form and clicks "Start Experiment"
const { startExperiment } = useStartExperimentMutation();

startExperiment({
  repoUrl: "https://github.com/user/repo",
  goal: "Increase signup conversion"
});
```

**Backend (`api/src/service/experiment/Experiment.service.ts`)**
```typescript
// POST /experiment endpoint
const newExperiment = {
  id: generateId('experiment'),
  repoUrl: body.repoUrl,
  goal: body.goal,
  status: 'pending'
};

await db.insert(experimentsTable).values(newExperiment);

// Trigger background job
await createExperimentJob({ experiment: newExperiment });
```

---

### **Step 2: Inngest Job Orchestration**

**Job Definition (`api/src/service/experiment/Experiment.jobs.ts`)**
```typescript
export const runExperimentJob = inngestClient.createFunction(
  { id: 'run-experiment' },
  { event: 'experiment/run' },
  async ({ event, step }) => {
    // Step 1: Initialize control variant
    const sandboxResult = await step.run('init-repo', async () => {
      return await ExperimentService.initRepository(
        experiment.repoUrl,
        experiment.id
      );
    });

    // Step 2: Run browser agent
    const browserResult = await step.run('spawn-browser-agent', async () => {
      // ... browser testing logic
    });

    // Step 3: Collect screenshots
    const screenshots = await step.run('collect-screenshots', async () => {
      // ... screenshot extraction
    });

    // Step 4: Generate social post (for DevRel flow)
    const post = await step.run('generate-social-post', async () => {
      // ... AI post generation
    });
  }
);
```

**Inngest** handles:
- [✓] Step-by-step execution
- [✓] Retry logic if steps fail
- [✓] State persistence
- [✓] Error handling

---

### **Step 3: Daytona Sandbox Creation**

**Implementation (`api/src/service/experiment/Experiment.service.ts`)**
```typescript
static async initRepository(repoUrl: string, experimentId: string) {
  // 1. Create isolated sandbox
  const sandbox = await daytona.create({
    language: 'typescript',
    public: true  // Makes it accessible via public URL
  });
  // → Sandbox created: { id: "sandbox-123", name: "...", ... }

  // 2. Clone repository
  await sandbox.git.clone(repoUrl, 'workspace/commerce');
  // → Code now in /workspace/commerce in the sandbox

  // 3. Install dependencies
  await sandbox.process.executeCommand('npm install', 'workspace/commerce');
  // → Dependencies installed

  // 4. Start dev server with PM2 (keeps it running)
  await sandbox.process.executeCommand(
    'pm2 start npm --name "vite-dev-server" -- run dev',
    'workspace/commerce'
  );
  // → Dev server running on port 3000 inside sandbox

  // 5. Get public preview URL
  const previewUrl = await sandbox.getPreviewLink(3000);
  // → Returns: "https://sandbox-123.daytona.io"

  // 6. Save to database
  await db.insert(variantsTable).values({
    id: generateId('variant'),
    experimentId,
    daytonaSandboxId: sandbox.id,
    publicUrl: previewUrl.url,
    type: 'control'
  });

  return { sandbox, variant };
}
```

**Key Points**:
- Each sandbox is **completely isolated**
- Dev server runs inside sandbox via **PM2** (process manager)
- **Public URL** allows browser agents to access it
- **Database** tracks all sandboxes and their URLs

---

### **Step 4: Browser Agent Testing**

**Task Generation (`api/src/service/ai/Ai.service.ts`)**
```typescript
static async generateBrowserTaskPrompt(goal: string, url: string) {
  // Uses Google Gemini AI to create natural task
  const { text } = await generateText({
    model: google('gemini-2.0-flash-lite'),
    prompt: `Create a natural browsing task for: ${goal}`
  });

  // Returns something like:
  // "Visit the website and browse as a customer looking to sign up.
  //  Try to complete the signup flow and note any confusion or
  //  friction points you encounter."
}
```

**Browser Agent Execution (`api/src/service/browser/Browser.service.ts`)**
```typescript
static async createTask(task: string, url: string) {
  // Create browser task
  const taskData = await browserUse.tasks.createTask({
    task: task,      // Natural language task
    startUrl: url    // Starting URL (preview URL)
  });

  // Returns: { id: "task-456", liveUrl: "..." }
  // liveUrl shows real-time browser session
}
```

**What Browser Agent Does**:
1. Opens browser at preview URL
2. "Thinks" about the task (AI reasoning)
3. Navigates website naturally
4. Clicks, scrolls, fills forms
5. Takes screenshots at key moments
6. Records observations
7. Reports findings

**Collecting Results**:
```typescript
// Wait for task to complete
const completedTask = await BrowserService.waitForTaskCompletion(taskId);

// Get all steps with screenshots
const steps = await BrowserService.getTaskSteps(taskId);

// Extract screenshots
const screenshots = steps
  .filter(step => step.screenshotUrl)
  .map(step => ({
    url: step.screenshotUrl,
    description: step.memory || step.nextGoal
  }));
```

---

### **Step 5: AI Analysis**

**Analyze Logs (`api/src/service/ai/Ai.service.ts`)**
```typescript
static async analyzeBrowserLogs(logs: string, goal: string) {
  const { text } = await generateText({
    model: google('gemini-2.0-flash-lite'),
    prompt: `Analyze these browser logs for goal: ${goal}...`
  });

  // Returns JSON:
  // {
  //   success: true,
  //   summary: "Agent successfully navigated...",
  //   insights: "Found that signup form has confusing layout",
  //   issues: "Too many fields, unclear error messages"
  // }
}
```

**Generate Variants**:
```typescript
static async generateExperimentVariants(controlResults, goal) {
  // AI generates 3-5 specific improvement suggestions
  return [
    "Simplify signup form to 3 fields",
    "Add clear inline validation",
    "Make CTA button larger and more prominent"
  ];
}
```

---

### **Step 6: Variant Implementation**

For each suggestion, a **Claude Code agent** runs:

1. **New sandbox created** (parallel to others)
2. **Repository cloned** into sandbox
3. **Claude Code agent spawned**:
   ```javascript
   // Agent receives instructions:
   "Repository is in /workspace/commerce.
    Simplify the signup form to only 3 fields:
    - Email
    - Password
    - Confirm Password
    Remove all other fields."
   ```
4. **Agent reads codebase**, understands structure
5. **Agent makes changes** to relevant files
6. **Agent tests changes** (if configured)
7. **Dev server started** with new code
8. **Preview URL obtained**
9. **Variant saved** to database

---

### **Step 7: Frontend Real-Time Updates**

**React Query (`web/src/query/experiment.query.ts`)**
```typescript
// Polls API every few seconds
export const useExperimentDetailQuery = (experimentId: string) => {
  const query = useQuery({
    queryKey: ['experiment', experimentId],
    queryFn: async () => {
      return API_CLIENT.fetch(`/experiment/${experimentId}`);
    },
    refetchInterval: 5000  // Refetch every 5 seconds
  });

  return { experiment: query.data, ...query };
};
```

**UI Updates Automatically**:
- Experiment status changes (pending → running → completed)
- New variants appear as they're created
- Screenshots load when available
- Progress indicators update
- Results comparison shows winner

---

## Key Technologies & Their Roles

### **Daytona SDK**
- **What**: Isolated cloud development environments
- **Why**: Each variant needs its own clean environment
- **How**: Creates sandboxes, clones repos, runs dev servers

### **Browser-Use SDK**
- **What**: AI-powered browser automation
- **Why**: Realistic user testing without manual work
- **How**: AI agents navigate sites naturally and capture insights

### **Claude Code SDK**
- **What**: Autonomous code implementation
- **Why**: Automatically write code fixes
- **How**: Reads codebase, makes surgical changes, tests

### **Google Gemini AI**
- **What**: AI analysis and generation
- **Why**: Generate tasks, analyze results, create content
- **How**: Multiple prompts for different tasks (task generation, analysis, post generation)

### **Inngest**
- **What**: Job orchestration platform
- **Why**: Coordinate complex multi-step workflows
- **How**: Step-by-step execution with retry logic and state management

### **React Query**
- **What**: Data fetching and caching
- **Why**: Real-time updates without manual polling
- **How**: Automatic refetching and optimistic updates

---

## Real-World Example Flow

**User Input:**
- Repo: `github.com/example/ecommerce`
- Goal: "Users can't find products easily"

**System Execution:**

1. [✓] **Creates sandbox** → Clones repo → Starts dev server
2. [✓] **Browser agent tests** → "Browse as customer looking for products"
3. [✓] **Agent finds issues** → "No search bar visible", "No filters available"
4. [✓] **AI analyzes** → Confirms problem, suggests fixes
5. [✓] **AI generates variants**:
   - Variant A: "Add search bar in header"
   - Variant B: "Add filter sidebar with categories"
   - Variant C: "Add both search and filters"
6. [✓] **Claude Code implements each**:
   - 3 new sandboxes created
   - 3 agents write code in parallel
   - 3 dev servers running
7. [✓] **Browser agents test each variant**
8. [✓] **Results compared**:
   - Variant B performs best (78% success rate)
   - Variant A: 60%
   - Variant C: 45% (too cluttered)
9. [✓] **Dashboard shows winner** → User can deploy Variant B

**Total Time**: ~10-15 minutes for complete flow

---

## What Makes It Special

1. **Fully Autonomous**: No manual coding required
2. **Parallel Execution**: Multiple variants tested simultaneously
3. **Real Testing**: AI agents act like real users
4. **Isolated Environments**: Each variant completely separate
5. **Real-time Feedback**: UI updates as work progresses
6. **AI-Powered**: End-to-end AI decision making

---

## Data Flow Summary

```
User → Frontend → API → Inngest → 
  ├─> Daytona (sandboxes)
  ├─> Browser-Use (testing)
  ├─> Claude Code (implementation)
  └─> Gemini AI (analysis)
     ↓
Database ← Results ← Agents ← Sandboxes
     ↓
Frontend ← React Query ← API
```

---

*This is how the autonomous UX experimentation system works!*

