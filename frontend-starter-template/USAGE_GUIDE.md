# 📚 Complete Usage Guide

This guide covers all components and features in the frontend starter template.

## 🎨 Components Library

### Layout Components

#### Navbar
The main navigation component with animated sidebar.

```tsx
import Navbar from './components/layout/Navbar';

<Navbar 
  activeTab={activeTab} 
  onTabChange={setActiveTab}
  brandName="Your App"
  brandSubtitle="Tagline"
/>
```

**Props:**
- `activeTab`: Current active tab ID
- `onTabChange`: Function to handle tab changes
- `brandName`: Your app name (optional)
- `brandSubtitle`: Subtitle text (optional)

#### Layout
Complete layout wrapper with navbar and animated transitions.

```tsx
import Layout from './components/layout/Layout';

<Layout 
  activeTab={activeTab}
  onTabChange={setActiveTab}
  brandName="Your App"
  brandSubtitle="Tagline"
>
  {/* Your content */}
</Layout>
```

---

### UI Components

#### Card Components

**Basic Card**
```tsx
import { Card } from './components/ui/cards/Card';

<Card>
  Content here
</Card>
```

**Card with Header and Title**
```tsx
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/cards/Card';

<Card>
  <CardHeader>
    <CardTitle>My Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>
```

**Props:**
- `glass`: Use glass morphism effect (default: false)
- `hover`: Enable hover lift effect (default: true)
- `className`: Additional CSS classes

#### Button Components

**Standard Button**
```tsx
import { Button } from './components/ui/buttons/Button';

<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
```

**Variants:**
- `primary`: Blue gradient button
- `secondary`: Gray button
- `outline`: Outlined button
- `ghost`: Transparent button

**Sizes:**
- `sm`: Small button
- `md`: Medium button (default)
- `lg`: Large button

**Rainbow Button**
```tsx
import { RainbowButton } from './components/ui/buttons/RainbowButton';

<RainbowButton onClick={handleClick}>
  Special Action
</RainbowButton>
```

#### Typography Components

**Aurora Text**
Animated gradient text with aurora effect.

```tsx
import { AuroraText } from './components/ui/typography/AuroraText';

<AuroraText 
  colors={["#ffffff", "#60a5fa", "#3b82f6"]}
  speed={1.5}
>
  Beautiful Text
</AuroraText>
```

**Props:**
- `colors`: Array of color codes for gradient
- `speed`: Animation speed (default: 1)
- `className`: Additional CSS classes

#### Background Components

**Grid Beams Background**
Animated background with light beams.

```tsx
import GridBeamsBackground from './components/ui/backgrounds/GridBeamsBackground';

<GridBeamsBackground />
```

This is automatically included in the Layout component.

---

## 🎨 Styling System

### CSS Utility Classes

#### Glass Morphism
```tsx
<div className="glass">Light glass effect</div>
<div className="glass-dark">Dark glass effect</div>
```

#### Cards
```tsx
<div className="card-premium">
  Premium card with shadows and hover effect
</div>
```

#### Buttons
```tsx
<button className="btn-primary">Primary Button</button>
<button className="btn-secondary">Secondary Button</button>
```

#### Inputs
```tsx
<input className="input-premium" type="text" placeholder="Enter text" />
```

#### Text Styles
```tsx
<p className="text-gradient">Gradient text</p>
<p className="text-accent">Accent colored text</p>
<p className="text-muted">Muted gray text</p>
```

#### Hover Effects
```tsx
<div className="hover-lift">Lifts up on hover</div>
<div className="hover-glow">Glows on hover</div>
```

#### Focus States
```tsx
<button className="focus-ring">Button with focus ring</button>
<button className="focus-ring-dark">Button with dark focus ring</button>
```

---

## 🎯 Common Patterns

### Creating a New Page

1. Create file in `src/pages/MyPage.tsx`:

```tsx
import React from 'react';
import { motion } from 'framer-motion';

const MyPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-white mb-4">
        My Page
      </h1>
      <p className="text-gray-300">
        Page content here
      </p>
    </div>
  );
};

export default MyPage;
```

2. Add to navigation in `src/components/layout/Navbar.tsx`:

```tsx
import { MyIcon } from 'lucide-react';

const menuItems = [
  // ... existing items
  { id: 'mypage', icon: MyIcon, label: 'My Page' }
];
```

3. Add route in `src/App.tsx`:

```tsx
import MyPage from './pages/MyPage';

// In renderContent():
case 'mypage':
  return <MyPage />;
```

### Animated Page Transitions

Page transitions are handled automatically by the Layout component using Framer Motion.

Custom animations:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Your content
</motion.div>
```

### Creating a Grid Layout

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => (
    <Card key={item.id}>
      <CardTitle>{item.title}</CardTitle>
      <CardContent>{item.description}</CardContent>
    </Card>
  ))}
</div>
```

### Form Example

```tsx
<form className="space-y-4">
  <div>
    <label className="block text-white mb-2">Name</label>
    <input 
      type="text" 
      className="input-premium w-full" 
      placeholder="Enter your name"
    />
  </div>
  
  <div>
    <label className="block text-white mb-2">Email</label>
    <input 
      type="email" 
      className="input-premium w-full" 
      placeholder="Enter your email"
    />
  </div>
  
  <Button variant="primary" type="submit">
    Submit
  </Button>
</form>
```

### Stats Card Grid

```tsx
const stats = [
  { label: 'Users', value: '1,234', icon: Users },
  { label: 'Revenue', value: '$45K', icon: DollarSign }
];

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {stats.map((stat) => (
    <Card key={stat.label}>
      <div className="flex items-center justify-between mb-4">
        <stat.icon className="h-8 w-8 text-blue-400" />
      </div>
      <p className="text-gray-400 text-sm">{stat.label}</p>
      <p className="text-3xl font-bold text-white">{stat.value}</p>
    </Card>
  ))}
</div>
```

---

## 🎨 Color Palette

### Primary Colors
- Blue: `#3b82f6`, `#60a5fa`, `#1d4ed8`
- Purple: `#8b5cf6`, `#a78bfa`

### Background Colors
- Dark: `#0a0a0a`, `#111827`
- Card: `rgba(0, 0, 0, 0.2)` with blur

### Text Colors
- White: `#ffffff`
- Gray: `#9ca3af`, `#6b7280`, `#4b5563`
- Muted: `#9ca3af`

### Accent Colors
- Success: `#10b981`
- Warning: `#fbbf24`
- Error: `#ef4444`
- Info: `#3b82f6`

---

## 🔧 Configuration

### Tailwind Config
Edit `config/tailwind.config.js` to customize:
- Colors
- Fonts
- Spacing
- Animations

### Vite Config
Edit `config/vite.config.ts` for:
- Build options
- Server settings
- Plugins

### TypeScript Config
Edit `config/tsconfig.json` for TypeScript settings.

---

## 📦 Adding New Dependencies

```bash
npm install package-name
```

Common packages you might want to add:
- `axios` - HTTP client
- `react-query` - Data fetching
- `react-hook-form` - Form handling
- `zod` - Schema validation
- `date-fns` - Date utilities

---

## 🚀 Deployment

### Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Drag dist/ folder to Netlify dashboard
```

---

## 🐛 Common Issues

### Issue: Framer Motion animations not working
**Solution:** Make sure framer-motion is installed:
```bash
npm install framer-motion
```

### Issue: Tailwind classes not applying
**Solution:** Check that your file is included in `tailwind.config.js` content array.

### Issue: Icons not showing
**Solution:** Import icons from lucide-react:
```tsx
import { IconName } from 'lucide-react';
```

---

## 💡 Tips & Best Practices

1. **Use the Layout component** for consistent page structure
2. **Keep components small** and focused on a single responsibility
3. **Use TypeScript** for better type safety
4. **Follow the existing patterns** for consistency
5. **Test responsive design** at different screen sizes
6. **Use semantic HTML** for better accessibility
7. **Keep animations subtle** for better UX

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

Need more help? Check the examples in the `src/pages/` folder! 🎉

