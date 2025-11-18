# AI Screenshot Filtering - Quick Summary

## What It Does

AI automatically selects the **Top 5 most important screenshots** from all captured screenshots (usually 30-50).

## Where It Shows

### Backend
- **File**: `api/src/service/experiment/Experiment.jobs.ts` (line 119-126)
- **Filter to**: 5 screenshots
- **When**: After browser task completes, before saving to database

### Frontend
- **File**: `web/src/components/experiment/DevRel/ScreenshotSelectorCard.tsx`
- **Shows**: "AI-Filtered Top 5" badge in header
- **Each screenshot**: Shows "AI Pick" badge with sparkle icon

## Visual Design

### Card Header
```
┌─────────────────────────────────────────────┐
│ 📷 Select Screenshots for Social Post      │
│ ✨ AI-Filtered Top 5                        │
│    Intelligently selected from all captured │
└─────────────────────────────────────────────┘
```

### Each Screenshot
```
┌──────────────────────┐
│ ✨ AI Pick   ☑️      │
│                      │
│  [Screenshot Image]  │
│                      │
│ Step 5: Clicked...   │
└──────────────────────┘
```

## User Flow

1. **Browser agent** captures 35 screenshots
2. **AI analyzes** all descriptions
3. **Selects top 5** most important ones
4. **Saves to DB** (only 5, not 35)
5. **User sees** "AI-Filtered Top 5" in UI
6. **Each screenshot** has "AI Pick" badge
7. **User can** select/deselect or use all 5

## Benefits

✅ Clean UI - only 5 curated screenshots  
✅ Smart selection - AI understands importance  
✅ Clear indicator - users know these are pre-filtered  
✅ Still flexible - users can select which of the 5 to use  
✅ Database efficient - only 5 variants saved instead of 35

## Quick Numbers

- Before: 35 screenshots saved → User manually picks from 35
- After: 5 AI-selected screenshots → User picks from curated 5
- Reduction: 85% fewer screenshots in database
- Time saved: ~90% less time selecting screenshots

