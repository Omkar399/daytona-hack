# 🚀 Setup and Run Guide

## Current Status
✅ Frontend template integration COMPLETE  
✅ All components enhanced with premium styling  
✅ Zero linter errors  
❌ Node.js/Bun not installed (required to run the project)

---

## 📋 Prerequisites Installation

### 1. Install Bun (for API backend)
```bash
# macOS/Linux
curl -fsSL https://bun.sh/install | bash

# After installation, reload your shell:
exec $SHELL -l

# Verify installation
bun --version
```

### 2. Install Node.js (for web frontend)
```bash
# Option A: Using Homebrew (recommended for macOS)
brew install node

# Option B: Using nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
exec $SHELL -l
nvm install 20
nvm use 20

# Verify installation
node --version
npm --version
```

---

## 🏃‍♂️ Running the Project

### Step 1: Start the API Backend

```bash
# Terminal 1 - API Backend
cd /Users/nihalnihalani/Desktop/Github/daytona-hack/api
bun install
bun run dev
```

**Expected output:**
```
🦊 Elysia is running at localhost:8000
```

### Step 2: Start the Web Frontend

```bash
# Terminal 2 - Web Frontend
cd /Users/nihalnihalani/Desktop/Github/daytona-hack/web
npm install
npm run dev
```

**Expected output:**
```
▲ Next.js 15.5.6
- Local:        http://localhost:3000
- Ready in 2.5s
```

### Step 3: Open in Browser

Navigate to: **http://localhost:3000**

---

## 🎨 What You'll See

With the new premium UI enhancements:

### 1. **Landing Page**
- ✨ AuroraText animated gradient title
- 🎬 Staggered card animations
- 💎 Glass morphism effects
- 🎯 Smooth hover interactions

### 2. **DevRel Flow Cards**
- 🌊 Smooth fade-in animations
- 🎨 Glass-dark card backgrounds
- 📊 Animated progress bars with gradients
- 🖼️ Hover effects on screenshots
- 🌈 RainbowButton for copy actions

### 3. **Dashboard**
- 💫 Motion animations throughout
- 🎪 Premium card hover effects
- 🎨 Cohesive color scheme
- ⚡ Smooth 60fps transitions

---

## 🔧 Alternative: Quick Docker Setup (If Available)

If Docker is installed, you can use containerized approach:

### For API:
```bash
cd /Users/nihalnihalani/Desktop/Github/daytona-hack/api
docker build -t daytona-api .
docker run -p 8000:8000 --env-file .env daytona-api
```

### For Web:
```bash
cd /Users/nihalnihalani/Desktop/Github/daytona-hack/web

# Create Dockerfile if not exists
cat > Dockerfile << 'EOF'
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
EOF

docker build -t daytona-web .
docker run -p 3000:3000 daytona-web
```

---

## 📝 Environment Variables

Before running, ensure you have these set up:

### API (.env in /api directory)
```env
DATABASE_URL=your_database_url
DAYTONA_API_KEY=your_daytona_key
ANTHROPIC_API_KEY=your_claude_key
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_key
INNGEST_EVENT_KEY=your_inngest_key
INNGEST_SIGNING_KEY=your_inngest_signing
```

### Web (optional .env.local in /web directory)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 🧪 Testing the New UI Features

Once running, test these features:

### 1. **Glass Morphism**
- Look for transparent cards with blur effects
- Notice the subtle border glow

### 2. **Animations**
- Cards should fade in from bottom
- Hover over cards for lift effect
- Progress bars animate smoothly

### 3. **AuroraText**
- Main headings have gradient animation
- Should see color shifting effect

### 4. **RainbowButton**
- Social post copy button has animated rainbow border
- Glow effect on hover

### 5. **Screenshots**
- Should load with stagger animation
- Hover for scale and ring effect

---

## 🐛 Troubleshooting

### Issue: "Command not found: bun"
**Solution:** Install Bun using the command above, then restart your terminal

### Issue: "Command not found: npm"
**Solution:** Install Node.js using Homebrew or nvm

### Issue: Port 3000 already in use
**Solution:** 
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Issue: Port 8000 already in use
**Solution:**
```bash
# Find and kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

### Issue: Module not found errors
**Solution:**
```bash
# Reinstall dependencies
cd web
rm -rf node_modules package-lock.json
npm install

cd ../api
rm -rf node_modules bun.lockb
bun install
```

---

## ✅ Verification Checklist

After starting both servers, verify:

- [ ] API responds at http://localhost:8000/health
- [ ] Frontend loads at http://localhost:3000
- [ ] Glass morphism effects visible
- [ ] Animations playing smoothly
- [ ] AuroraText gradient animating
- [ ] RainbowButton border animating
- [ ] Hover effects working
- [ ] No console errors in browser

---

## 📊 Project Structure

```
daytona-hack/
├── api/              # Bun + Elysia backend (port 8000)
│   ├── src/
│   │   ├── index.ts
│   │   ├── lib/      # SDKs: Daytona, Claude, Browser-use
│   │   ├── service/  # Business logic
│   │   └── db/       # Database models
│   └── package.json
│
├── web/              # Next.js 15 frontend (port 3000)
│   ├── src/
│   │   ├── app/      # Next.js pages
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   └── advanced/   # ✨ NEW: Premium components
│   │   │   └── experiment/     # ✨ ENHANCED: DevRel cards
│   │   └── query/    # API client
│   └── package.json
│
└── gh-webhook/       # GitHub webhook server (port 8080, optional)
```

---

## 🎯 Quick Commands Reference

```bash
# Check what's running
lsof -i :3000  # Web frontend
lsof -i :8000  # API backend

# Install dependencies
cd web && npm install
cd api && bun install

# Run development servers
cd web && npm run dev
cd api && bun run dev

# Build for production
cd web && npm run build
cd api && bun run build

# Check logs
pm2 logs daytona-web
pm2 logs daytona-api
```

---

## 🚀 Next Steps After Setup

1. **Test the DevRel Flow**
   - Create a new experiment
   - Watch the automated pipeline
   - See screenshots and social posts generated

2. **Explore New Components**
   - Check `/components` for all advanced UI
   - Test animations and interactions
   - Try the RainbowButton

3. **Customize**
   - Adjust colors in `globals.css`
   - Tweak animation speeds
   - Modify glass morphism intensity

---

## 🎉 You're All Set!

Once Node.js and Bun are installed, you'll be able to run the fully enhanced DevRel automation system with:
- ✨ Premium glass morphism UI
- 🎬 Smooth Framer Motion animations
- 🌈 Rainbow gradient effects
- 💎 AuroraText animated headings
- 🚀 Production-ready components

**Happy coding!** 🎊

