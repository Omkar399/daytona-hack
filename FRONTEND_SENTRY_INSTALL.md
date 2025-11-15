# 🚀 Frontend Sentry - Final Installation Step

## ✅ Configuration Complete!

All Sentry configuration files have been created. Now you just need to install the package!

---

## 📦 Install Sentry Package (1 Command)

```bash
cd /Users/nihalnihalani/Desktop/Github/daytona-hack/web
npm install @sentry/nextjs
```

**That's it!** This will install:
- `@sentry/nextjs` - Main Sentry SDK for Next.js
- All necessary dependencies

---

## 🚀 Start the Frontend

After installation:

```bash
npm run dev
```

**Expected output:**
```
▲ Next.js 15.5.6
- Local:        http://localhost:3000

✓ Starting...
✓ Ready in 2s
```

---

## 🧪 Test the Integration

### Step 1: Open the test page

```
http://localhost:3000/sentry-test
```

### Step 2: Click "Throw Test Error"

This will trigger an intentional error that Sentry will catch.

### Step 3: Check Sentry Dashboard

1. Go to: **https://sentry.io**
2. Navigate to: **Issues**
3. You should see: **"Sentry Frontend Test Error - This is intentional!"**

---

## 📂 What's Been Created

### Configuration Files ✅
```
web/
├── sentry.client.config.ts       ← Client-side Sentry config
├── sentry.server.config.ts       ← Server-side Sentry config
├── sentry.edge.config.ts         ← Edge runtime Sentry config
├── instrumentation.ts            ← Next.js instrumentation hook
├── next.config.ts                ← Updated with Sentry wrapper
└── src/app/sentry-test/page.tsx  ← Test page with error buttons
```

### All Files Ready ✅

Everything is configured! You just need to:
1. Install the package: `npm install @sentry/nextjs`
2. Start the server: `npm run dev`
3. Test: Open `http://localhost:3000/sentry-test`

---

## 🎯 Full Installation Command

Copy and paste this into your terminal:

```bash
cd /Users/nihalnihalani/Desktop/Github/daytona-hack/web && \
npm install @sentry/nextjs && \
npm run dev
```

This will:
1. Navigate to the web directory ✅
2. Install Sentry ✅
3. Start the development server ✅

---

## 📊 What You Get

### Error Tracking ✅
- React component errors
- Unhandled promise rejections
- Console errors
- API call failures

### Performance Monitoring ✅
- Page load times
- Route transitions
- Component render times
- API request duration
- Web Vitals (LCP, FID, CLS)

### Session Replay ✅
- Watch user interactions
- See mouse movements
- Review clicks and scrolls
- Replay sessions with errors
- Debug visually

---

## 🎨 Test Page Features

The test page (`/sentry-test`) has two buttons:

### Button 1: Throw Test Error
- Triggers an unhandled error
- Error sent to Sentry
- Stack trace captured
- Breadcrumbs recorded
- Session replay available

### Button 2: Send Test Message
- Sends a message to Sentry
- No error thrown
- Info level message
- Useful for testing connectivity

---

## ✅ Verification Checklist

After installation, verify:

- [ ] Package installed: `npm list @sentry/nextjs`
- [ ] Server starts: `npm run dev`
- [ ] No build errors
- [ ] Test page loads: http://localhost:3000/sentry-test
- [ ] Button click works
- [ ] Error appears in Sentry dashboard
- [ ] Session replay available

---

## 🔗 Quick Links

| Resource | URL |
|----------|-----|
| **Install Command** | `npm install @sentry/nextjs` |
| **Test Page** | http://localhost:3000/sentry-test |
| **Sentry Dashboard** | https://sentry.io |
| **Documentation** | `FRONTEND_SENTRY_COMPLETE.md` |
| **Full Status** | `FULLSTACK_SENTRY_STATUS.md` |

---

## 💡 After Installation

### Your Full-Stack Setup

**Backend (Port 8000):**
```bash
cd api && bun run dev
# Test: curl http://localhost:8000/sentry-test
```

**Frontend (Port 3000):**
```bash
cd web && npm run dev
# Test: open http://localhost:3000/sentry-test
```

Both will send data to the same Sentry project for unified monitoring!

---

## 🎉 Ready to Install!

Run this now:

```bash
cd /Users/nihalnihalani/Desktop/Github/daytona-hack/web
npm install @sentry/nextjs
```

Then start the server:

```bash
npm run dev
```

And test it:

```
http://localhost:3000/sentry-test
```

🚀 Your frontend Sentry integration will be complete!

