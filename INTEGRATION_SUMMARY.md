# Integration Summary: Sentry + Galileo

## 🎯 Quick Overview

Adding **Sentry.io** and **Galileo.ai** to your project provides complete observability:

```
Your Current System:
❓ When experiments fail → Manual debugging
❓ When AI produces bad output → No visibility
❓ Performance bottlenecks → Hard to identify
❓ Costs → Unknown per experiment

With Sentry + Galileo:
✅ Failures tracked automatically with full context
✅ AI quality monitored and evaluated
✅ Performance bottlenecks identified
✅ Costs tracked per experiment
```

---

## 🚨 Sentry.io - Error Monitoring & Performance

### What It Tracks in Your Project

| Component | What Sentry Monitors | Why It Matters |
|-----------|---------------------|----------------|
| **Daytona Sandboxes** | Creation time, timeout failures, retry attempts | Sandbox creation is your biggest bottleneck |
| **Browser Agents** | Task failures, timeout errors, crash logs | Browser tests can hang or fail silently |
| **Claude Code** | Implementation failures, webhook errors | Code agents might fail to implement changes |
| **AI API Calls** | Rate limits, timeouts, invalid responses | Gemini/Claude APIs can fail or timeout |
| **Inngest Jobs** | Step failures, job duration, retry counts | Multi-step workflows need visibility |
| **Frontend** | React errors, API failures, user actions | Track user-facing issues |

### Real Example Alerts You'd Get

```
🚨 Alert: Experiment Failure Rate Spike
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5 experiments failed in the last hour
↑ 200% from baseline

Common error:
DaytonaTimeoutError: Sandbox creation timed out after 60s
  at ExperimentService.initRepository (line 216)
  
Affected experiments:
- experiment_abc123
- experiment_def456
- experiment_ghi789

Context:
- Region: us-east-1
- Time: 2:35 PM - 3:35 PM
- User impact: 5 failed experiments

Suggested action: Increase timeout or check Daytona status
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Performance Insights You'd See

```
📊 Performance Dashboard
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Experiment Flow Breakdown:

1. Sandbox Creation:     45s (🔴 +40% slower than usual)
2. Git Clone:            8s  (✅ Normal)
3. npm install:          23s (✅ Normal)
4. Dev Server Start:     12s (✅ Normal)
5. Browser Test:         94s (✅ Normal)
6. AI Analysis:          3s  (✅ Normal)

Total: 185s (🔴 Slower than 5min target)

Bottleneck: Daytona sandbox creation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🔬 Galileo.ai - LLM Observability

### What It Tracks in Your Project

| AI Task | Model | What Galileo Monitors | Why It Matters |
|---------|-------|----------------------|----------------|
| **Feature Extraction** | Gemini | Parse success rate, hallucinations | Bad parsing breaks the flow |
| **Task Generation** | Gemini | Task quality, prompt effectiveness | Bad tasks = bad tests |
| **Log Analysis** | Gemini | Analysis completeness, accuracy | Insights drive variant creation |
| **Variant Suggestions** | Gemini | Suggestion quality, specificity | Good suggestions = better variants |
| **Social Posts** | Gemini | Character count, hashtag quality | Social posts must be ready to use |
| **Code Implementation** | Claude | Success rate, file modification accuracy | Code changes must work |

### Real Example Insights You'd Get

```
🔬 Galileo Insights: Experiment experiment_abc123
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AI Call Summary:
├─ Total calls: 8
├─ Total cost: $0.023
├─ Avg latency: 1.2s
└─ Hallucinations: 0

Breakdown by Task:
┌──────────────────────────────────────────────┐
│ 1. Feature Extraction (Gemini Flash)        │
│    Input: 450 chars (CodeRabbit summary)    │
│    Output: ["Dark mode theme", "Settings"]  │
│    Quality: ✅ 100% (valid JSON)            │
│    Cost: $0.002                              │
│    Latency: 0.8s                             │
│    Hallucination: None detected              │
├──────────────────────────────────────────────┤
│ 2. Browser Task Generation (Gemini Flash)   │
│    Input: Goal + Features                    │
│    Output: 342 chars task prompt             │
│    Quality: ✅ 95% (natural, specific)      │
│    Cost: $0.003                              │
│    Latency: 1.1s                             │
│    Hallucination: None detected              │
├──────────────────────────────────────────────┤
│ 3. Log Analysis (Gemini Flash)               │
│    Input: 2,341 chars (browser logs)         │
│    Output: Structured insights               │
│    Quality: ✅ 100% (complete analysis)     │
│    Cost: $0.005                              │
│    Latency: 1.8s                             │
│    Hallucination: None detected              │
├──────────────────────────────────────────────┤
│ 4. Variant Generation (Gemini Flash)         │
│    Input: Control analysis                   │
│    Output: 3 variant suggestions             │
│    Quality: ⚠️  80% (1 vague suggestion)    │
│    Cost: $0.004                              │
│    Latency: 1.4s                             │
│    Issue: Variant 2 lacks specificity        │
├──────────────────────────────────────────────┤
│ 5. Social Post Generation (Gemini Flash)     │
│    Input: Title + Summary + 4 screenshots    │
│    Output: Twitter (245 chars) + LinkedIn    │
│    Quality: ✅ 98% (within limits)          │
│    Cost: $0.009                              │
│    Latency: 1.5s                             │
│    Hashtags: 5 (optimal range)               │
└──────────────────────────────────────────────┘

Recommendations:
🔧 Variant Generation prompt could be more specific
   Current success rate: 80%
   Try Prompt v2: "Generate SPECIFIC, implementable UX improvements..."
   
💡 Consider Claude Haiku for faster feature extraction
   Gemini: $0.002, 0.8s
   Haiku: $0.001, 0.5s (40% faster, 50% cheaper)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Prompt A/B Testing Results

```
🧪 Prompt Performance Comparison
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Task: Browser Task Generation

Prompt v1 (Original):
"Generate a browser task for this goal: [goal]"
├─ Success rate: 75%
├─ Avg latency: 1.4s
├─ Task quality: 6.5/10
└─ Cost per call: $0.003

Prompt v2 (Improved):
"You are an AI assistant that creates natural, exploratory 
browser automation tasks that simulate real user behavior..."
├─ Success rate: 95% ⬆️ +20%
├─ Avg latency: 1.2s ⬇️ -14%
├─ Task quality: 9.2/10 ⬆️ +42%
└─ Cost per call: $0.003 ➡️ Same

Winner: Prompt v2
Impact: 20% more successful experiments
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🎯 Combined Power: Sentry + Galileo Together

### Complete Experiment Timeline

```
Experiment experiment_xyz789: "Add product filtering"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

00:00 - Experiment started
        Sentry: ✅ Transaction started
        Galileo: ✅ Workflow created

00:45 - Sandbox created
        Sentry: ⚠️ Slower than usual (45s vs 30s avg)
        
01:30 - Browser task generated
        Galileo: ✅ Quality score: 9.2/10
        
02:15 - Browser test running
        Sentry: ✅ No errors
        
04:30 - Browser test complete
        Sentry: ✅ Duration: 135s
        
04:35 - AI analyzing logs
        Galileo: ✅ Analysis complete, 0 hallucinations
        
04:40 - Variants generated
        Galileo: ✅ 3 variants, quality: 8.8/10
        Sentry: ✅ No errors
        
05:00 - Experiment complete ✅
        Sentry: Total duration: 300s (5 minutes)
        Galileo: Total AI cost: $0.023
        
Summary:
✅ Success
⚠️ Sandbox creation slower than usual
💰 AI cost within budget ($0.023 < $0.05 target)
📊 Overall quality: 9.0/10
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 💰 Cost Tracking

### Per Experiment Cost Breakdown

```
Average Experiment Cost:
━━━━━━━━━━━━━━━━━━━━━━━━
Daytona Sandbox:    $0.50  (1 hour)
AI API Calls:       $0.023
Browser-use:        $0.10
Total:              $0.623
━━━━━━━━━━━━━━━━━━━━━━━━

AI Cost Breakdown (Galileo):
├─ Feature Extraction:  $0.002
├─ Task Generation:     $0.003
├─ Log Analysis:        $0.005
├─ Variant Generation:  $0.004
└─ Social Post:         $0.009

Most Expensive: Social Post Generation (39% of AI cost)
Optimization: Use smaller model for social posts?
━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🎨 Dashboard Visualization

### Sentry Dashboard (Errors & Performance)

```
┌─────────────────────────────────────────────────────────┐
│ Experiment Success Rate (Last 7 Days)                   │
├─────────────────────────────────────────────────────────┤
│ ████████████████████████████████████░░░░░ 92%           │
│                                                          │
│ Total: 50 experiments                                    │
│ Success: 46                                              │
│ Failed: 4                                                │
│   ├─ Daytona timeout: 2                                 │
│   ├─ Browser crash: 1                                   │
│   └─ AI API error: 1                                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Performance Breakdown                                    │
├─────────────────────────────────────────────────────────┤
│ Sandbox Creation:  ████████░░ 45s  (target: 30s) 🔴     │
│ Git Clone:         ███░░░░░░░  8s  (target: 10s) ✅     │
│ Dependencies:      ████████░░ 23s  (target: 30s) ✅     │
│ Dev Server:        ████░░░░░░ 12s  (target: 15s) ✅     │
│ Browser Test:      ███████████ 94s  (target: 120s) ✅   │
│ AI Analysis:       █░░░░░░░░░  3s  (target: 5s) ✅     │
└─────────────────────────────────────────────────────────┘
```

### Galileo Dashboard (AI Quality)

```
┌─────────────────────────────────────────────────────────┐
│ AI Quality Metrics (Last 50 Experiments)                 │
├─────────────────────────────────────────────────────────┤
│ Hallucination Rate:     0.5%  ✅                        │
│ Average Latency:        1.2s  ✅                        │
│ Parse Success Rate:     98%   ✅                        │
│ Cost per Experiment:    $0.023 ✅                       │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Model Performance Comparison                             │
├─────────────────────────────────────────────────────────┤
│                    Latency    Cost     Quality           │
│ Gemini Flash Lite  1.2s      $0.023   ⭐⭐⭐⭐          │
│ Claude Sonnet      0.8s      $0.045   ⭐⭐⭐⭐⭐        │
│ Claude Haiku       0.5s      $0.012   ⭐⭐⭐            │
│                                                          │
│ Recommendation: Gemini Flash for cost-effectiveness      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Top Performing Prompts                                   │
├─────────────────────────────────────────────────────────┤
│ 1. Browser Task v3    Success: 95%  Quality: 9.2/10     │
│ 2. Variant Gen v2     Success: 88%  Quality: 8.8/10     │
│ 3. Log Analysis v1    Success: 100% Quality: 9.5/10     │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Implementation Checklist

### Phase 1: Sentry Setup (2 hours)
- [ ] Create Sentry account at sentry.io
- [ ] Create project for "daytona-hack-api"
- [ ] Create project for "daytona-hack-web"
- [ ] Get DSN keys
- [ ] Install Sentry SDKs (backend + frontend)
- [ ] Add initialization code
- [ ] Add error tracking to experiment service
- [ ] Add performance tracking to jobs
- [ ] Test with sample errors
- [ ] Set up alerts for critical failures

### Phase 2: Galileo Setup (2 hours)
- [ ] Create Galileo account at rungalileo.io
- [ ] Create project "daytona-ux-experiments"
- [ ] Get API key
- [ ] Install Galileo SDK
- [ ] Create workflow helpers
- [ ] Update AI service with tracking
- [ ] Update experiment jobs
- [ ] Test with sample experiment
- [ ] Create custom metrics
- [ ] Set up quality thresholds

### Phase 3: Dashboard Integration (1 hour)
- [ ] Add Sentry metrics to experiment detail page
- [ ] Add Galileo metrics card
- [ ] Add links to external dashboards
- [ ] Test data flow
- [ ] Document metrics for team

### Phase 4: Alerts & Monitoring (1 hour)
- [ ] Configure Sentry alerts:
  - [ ] Experiment failure rate > 10%
  - [ ] Sandbox creation > 60s
  - [ ] Any unhandled exception
- [ ] Configure Galileo alerts:
  - [ ] Hallucination rate > 5%
  - [ ] Cost per experiment > $0.10
  - [ ] Quality score < 7.0
- [ ] Test alert delivery

**Total Time: ~6 hours**

---

## 📈 Expected Results

### After Integration

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **Time to Debug Failures** | 30-60 min | 5-10 min | 80% faster |
| **Experiment Success Rate** | Unknown | 92% visible | Full visibility |
| **AI Quality Issues** | Unknown | 0.5% detected | Proactive detection |
| **Cost Awareness** | None | $0.023/experiment | Full tracking |
| **Performance Bottlenecks** | Guessing | Identified in seconds | Data-driven |

---

## 💡 Key Insights You'll Gain

### From Sentry
1. **Which experiments fail most often** and why
2. **Where the bottlenecks are** in your workflow
3. **When failures happen** (time of day, region)
4. **How long operations take** on average
5. **What errors users encounter** in the frontend

### From Galileo
1. **Which AI prompts perform best** for each task
2. **When AI hallucinates** or produces bad output
3. **How much each experiment costs** in AI calls
4. **Which AI model is most cost-effective** for each task
5. **Where prompt engineering can improve** quality

---

## 🎯 ROI Analysis

### Investment
- Setup time: ~6 hours
- Monthly cost:
  - Sentry: $26/month (Team plan) or Free (10k events)
  - Galileo: ~$99/month (Starter) or Free tier
- **Total: ~$125/month or Free with limited features**

### Returns
- **Reduced debugging time**: 5 hours/week saved = $500/week
- **Improved experiment success rate**: 85% → 92% = 7% more successful experiments
- **Optimized AI costs**: Better prompts = 15-20% cost reduction
- **Faster iteration**: Find and fix issues 80% faster
- **Better UX**: Fewer failed experiments = better user experience

**ROI: ~$2000/month value for $125/month investment = 16x return**

---

## 🎓 Learning Opportunities

With both tools, you can:
1. **Learn which AI models work best** for different tasks
2. **Discover performance patterns** in your infrastructure
3. **Optimize prompts** based on data, not guesses
4. **Predict failures** before they impact users
5. **Make data-driven decisions** about architecture changes

---

## 🔗 Resources

### Sentry
- Docs: https://docs.sentry.io
- Bun Integration: https://docs.sentry.io/platforms/javascript/guides/bun/
- Next.js Integration: https://docs.sentry.io/platforms/javascript/guides/nextjs/

### Galileo
- Docs: https://docs.rungalileo.io
- Python SDK: https://pypi.org/project/promptquality/
- Node.js SDK: https://www.npmjs.com/package/@rungalileo/observe

---

**Ready to level up your observability? Start with Sentry for immediate error tracking, then add Galileo for AI quality insights!** 🚀

