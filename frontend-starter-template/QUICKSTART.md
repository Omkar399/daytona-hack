# ⚡ Quick Start Guide

Get your project up and running in 3 minutes!

## 🚀 Step 1: Install

```bash
npm install
```

## 🎯 Step 2: Run

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

## ✨ Step 3: Customize

### Change Brand Name
Edit `src/App.tsx`:
```tsx
<Layout 
  brandName="My App"
  brandSubtitle="My Tagline"
  ...
>
```

### Add New Menu Item
Edit `src/components/layout/Navbar.tsx`:
```tsx
const menuItems = [
  { id: 'mypage', icon: Star, label: 'My Page' }
];
```

### Update Colors
Edit `config/tailwind.config.js` or use Tailwind classes directly!

## 📦 Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

---

That's it! You're ready to build something amazing! 🎉

