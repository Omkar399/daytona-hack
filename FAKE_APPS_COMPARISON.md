# 🎯 Fake Apps Comparison

Two simple apps for testing DevRel automation pipeline and Daytona sandboxes.

---

## 📦 Apps Overview

### 1. **fake-ecommerce** - Shirt Store
**Location:** `/Users/omkarpodey/daytona-hackathon/fake-ecommerce`

**Features:**
- ✅ Shopping cart functionality
- ✅ Add/remove items from cart
- ✅ Quantity adjustment
- ✅ **Search bar** (filters products by name, description, category)
- ✅ 30 shirt products
- ✅ Neon cyberpunk styling (pink/purple/blue)

**Port:** 5173 (Vite default) or 3000 (if configured)

**GitHub:** https://github.com/Omkar399/hack_ecom

---

### 2. **fake-events** - EventHub (NEW!)
**Location:** `/Users/omkarpodey/daytona-hackathon/fake-events`

**Features:**
- ✅ Event listing and browsing
- ✅ Event registration system
- ✅ My Events view
- ✅ Cancel registrations
- ✅ Price calculation
- ✅ **NO search or filters** (simpler for testing)
- ✅ 15 events across 12 categories
- ✅ Blue ocean styling (blue/cyan/dark)

**Port:** 5173 (Vite default)

**Git:** Initialized locally, ready to push

---

## 🚀 Running the Apps

### fake-ecommerce (Shirt Store)
```bash
cd fake-ecommerce
npm install
npm run dev
# → http://localhost:5173
```

### fake-events (EventHub)
```bash
cd fake-events
npm install
npm run dev
# → http://localhost:5173
```

---

## 🐳 Daytona Deployment

Both apps have **identical deployment steps**:

```typescript
// 1. Create workspace
const workspace = await daytona.create({
  repository: {
    url: 'YOUR_REPO_URL',
    branch: 'main'
  }
});

// 2. Wait for ready
await daytona.waitForReady(workspace.id);

// 3. Install dependencies
await daytona.installDependencies(workspace.id, 'npm');

// 4. Start dev server
const devServer = await daytona.startDevServer(workspace.id, 'npm run dev', 5173);

// 5. Get public URL
const publicUrl = devServer.url; // e.g., https://5173-xxx.proxy.daytona.works
```

---

## 🧪 Browser Testing Scenarios

### fake-ecommerce (Complex - with search)
1. Browse products on homepage
2. **Use search bar** to filter products
3. Search for "hoodie", "vintage", "tank"
4. Click "Add to Cart" on multiple products
5. Open cart by clicking "Cart (X)" button
6. Adjust quantities with +/- buttons
7. Remove items from cart
8. Clear entire cart
9. Verify total price updates

**Testing Steps Generated:** 7-10 steps
**Expected Screenshots:** 15-30 screenshots

---

### fake-events (Simple - no filters)
1. Browse events on homepage
2. View event details (date, location, price, category)
3. Click "Register Now" on multiple events
4. Click "My Events (X)" button to view registrations
5. View all registered events
6. Cancel individual registrations
7. Click "Clear All" to remove all
8. Verify total price calculation

**Testing Steps Generated:** 5-8 steps
**Expected Screenshots:** 10-20 screenshots

---

## 📊 Key Differences

| Feature | fake-ecommerce | fake-events |
|---------|----------------|-------------|
| **Search/Filter** | ✅ Yes (search bar) | ❌ No (simpler) |
| **Complexity** | Medium | Low |
| **Items** | 30 products | 15 events |
| **Categories** | Shirts, Hoodies, etc. | Tech, Music, Sports, etc. |
| **Color Scheme** | Neon (pink/purple) | Ocean (blue/cyan) |
| **Testing Steps** | 7-10 steps | 5-8 steps |
| **Screenshots** | 15-30 | 10-20 |
| **Setup Time** | ~2 min | ~2 min |

---

## 💡 When to Use Each

### Use **fake-ecommerce** when:
- Testing search/filter functionality
- Testing complex interactions (cart, quantities)
- Need more products/variety
- Want to capture more detailed screenshots

### Use **fake-events** when:
- Need simple, straightforward testing
- Want faster test execution
- Testing basic click/register flows
- Need a different visual design

---

## 🔧 Tech Stack (Both)

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool (fast!)
- **CSS3** - Custom styling (no frameworks)
- **No Backend** - Fully client-side
- **No Database** - In-memory state only

---

## 📝 Testing with DevRel Pipeline

Both apps work perfectly with your DevRel automation:

1. **CodeRabbit Summary** → Extracts features
2. **AI generates testing steps** → Customized per app
3. **Browser agent tests** → Follows steps
4. **Screenshots captured** → Saves to database
5. **Social post generated** → Ready to share

### Example Testing Flow

**Step 1: Trigger Pipeline**
```bash
curl -X POST http://localhost:8000/experiment/from-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "repo":"YOUR_USERNAME/fake-events",
    "pr":1,
    "title":"Added Event Registration",
    "summary":"Testing event registration",
    "coderabbitSummary":"## Summary\n\nAdded event registration system...\n\n### Features:\n- Event registration with one click\n- My Events page to view registrations\n- Cancel registration functionality"
  }'
```

**Step 2: Pipeline Runs**
- ✅ Creates Daytona sandbox
- ✅ Installs dependencies
- ✅ Starts dev server
- ✅ Generates testing steps
- ✅ Browser agent tests the app
- ✅ Captures screenshots
- ✅ Generates social media post

**Step 3: View Results**
```
http://localhost:3000/experiments/[id]
```

---

## 🎯 Summary

You now have **two testing apps**:

1. **fake-ecommerce** - Complex e-commerce with search
2. **fake-events** - Simple events with no filters

Both are:
- ✅ Ready to deploy to Daytona
- ✅ Git initialized (fake-events locally, fake-ecommerce on GitHub)
- ✅ Perfect for DevRel automation testing
- ✅ Different enough to test variety
- ✅ Similar enough to have consistent deployment

**Current Status:**
- fake-ecommerce: http://localhost:3000 (if running)
- fake-events: http://localhost:5173 ✅ RUNNING NOW

Enjoy testing! 🚀

