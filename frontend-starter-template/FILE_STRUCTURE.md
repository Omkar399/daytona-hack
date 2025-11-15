# 📁 File Structure

Complete overview of the project structure and what each file does.

```
frontend-starter-template/
├── 📄 README.md                          # Main documentation
├── 📄 QUICKSTART.md                      # Quick start guide
├── 📄 USAGE_GUIDE.md                     # Detailed usage guide
├── 📄 FILE_STRUCTURE.md                  # This file
├── 📄 package.json                       # Dependencies and scripts
├── 📄 .gitignore                         # Git ignore rules
├── 📄 .eslintrc.json                     # ESLint configuration
├── 📄 index.html                         # HTML entry point
│
├── 📁 config/                            # Configuration files
│   ├── tailwind.config.js               # Tailwind CSS configuration
│   ├── vite.config.ts                   # Vite build configuration
│   ├── tsconfig.json                    # TypeScript configuration
│   ├── tsconfig.node.json               # TypeScript Node configuration
│   └── postcss.config.js                # PostCSS configuration
│
├── 📁 public/                            # Static assets
│   └── favicon.svg                      # Site favicon
│
└── 📁 src/                               # Source code
    ├── 📄 main.tsx                      # Application entry point
    ├── 📄 App.tsx                       # Main App component
    ├── 📄 vite-env.d.ts                 # Vite environment types
    │
    ├── 📁 components/                   # React components
    │   │
    │   ├── 📁 layout/                   # Layout components
    │   │   ├── Navbar.tsx              # Navigation sidebar
    │   │   └── Layout.tsx              # Main layout wrapper
    │   │
    │   ├── 📁 ui/                       # UI components library
    │   │   │
    │   │   ├── 📁 backgrounds/         # Background components
    │   │   │   ├── GridBeams.tsx       # Animated grid beams
    │   │   │   └── GridBeamsBackground.tsx  # Grid beams wrapper
    │   │   │
    │   │   ├── 📁 buttons/             # Button components
    │   │   │   ├── Button.tsx          # Standard button
    │   │   │   └── RainbowButton.tsx   # Rainbow border button
    │   │   │
    │   │   ├── 📁 cards/               # Card components
    │   │   │   └── Card.tsx            # Card with variants
    │   │   │
    │   │   └── 📁 typography/          # Text components
    │   │       └── AuroraText.tsx      # Animated gradient text
    │   │
    │   └── 📄 utils.ts                  # Component utilities (cn function)
    │
    ├── 📁 pages/                        # Page components
    │   ├── Dashboard.tsx               # Dashboard page example
    │   └── Settings.tsx                # Settings page example
    │
    └── 📁 styles/                       # Global styles
        └── globals.css                  # Global CSS & utilities
```

## 📝 File Descriptions

### Root Files

- **README.md**: Main documentation with features, setup, and usage
- **QUICKSTART.md**: 3-minute setup guide
- **USAGE_GUIDE.md**: Comprehensive component usage guide
- **FILE_STRUCTURE.md**: This file - project structure overview
- **package.json**: NPM dependencies, scripts, and metadata
- **.gitignore**: Files and folders to ignore in Git
- **.eslintrc.json**: ESLint configuration for code quality
- **index.html**: HTML entry point for the app

### Config Directory

Configuration files for different tools:

- **tailwind.config.js**: Tailwind CSS theme, colors, animations
- **vite.config.ts**: Vite build tool configuration
- **tsconfig.json**: TypeScript compiler options
- **tsconfig.node.json**: TypeScript config for build tools
- **postcss.config.js**: PostCSS plugins (Tailwind, Autoprefixer)

### Public Directory

Static assets served directly:

- **favicon.svg**: Site icon (can be replaced with your own)

### Source Directory

Main application code:

#### Core Files
- **main.tsx**: React application entry point, renders root component
- **App.tsx**: Main application component with routing
- **vite-env.d.ts**: TypeScript definitions for Vite

#### Components Directory

**layout/**
- `Navbar.tsx`: Responsive sidebar navigation with animations
- `Layout.tsx`: Wraps pages with navbar and animated transitions

**ui/backgrounds/**
- `GridBeams.tsx`: Core animated grid beams component
- `GridBeamsBackground.tsx`: Preconfigured background wrapper

**ui/buttons/**
- `Button.tsx`: Flexible button with variants (primary, secondary, outline, ghost)
- `RainbowButton.tsx`: Special button with animated rainbow border

**ui/cards/**
- `Card.tsx`: Card component with subcomponents (Header, Title, Content)

**ui/typography/**
- `AuroraText.tsx`: Animated gradient text effect

**utils.ts**: Utility functions (mainly `cn` for class merging)

#### Pages Directory

Example page components:
- `Dashboard.tsx`: Full dashboard example with stats, cards, actions
- `Settings.tsx`: Settings page with form controls, toggles

#### Styles Directory

- **globals.css**: Global styles, CSS variables, utility classes, animations

## 🎯 Key Concepts

### Component Organization

Components are organized by type:
- **Layout**: Page structure components
- **UI**: Reusable UI building blocks
- **Pages**: Full page components

### Import Paths

```tsx
// Layout components
import Navbar from './components/layout/Navbar';
import Layout from './components/layout/Layout';

// UI components
import { Button } from './components/ui/buttons/Button';
import { Card } from './components/ui/cards/Card';
import { AuroraText } from './components/ui/typography/AuroraText';

// Pages
import Dashboard from './pages/Dashboard';
```

### File Naming Conventions

- **Components**: PascalCase (e.g., `Navbar.tsx`, `Button.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`)
- **Styles**: lowercase (e.g., `globals.css`)
- **Config**: lowercase with dots (e.g., `vite.config.ts`)

## 📦 Adding New Files

### New Component

1. Create in appropriate `ui/` subdirectory
2. Use PascalCase naming
3. Export as default or named export
4. Add to usage guide if reusable

### New Page

1. Create in `pages/` directory
2. Import in `App.tsx`
3. Add route in `renderContent()`
4. Add menu item in `Navbar.tsx`

### New Utility

1. Add to `components/utils.ts` or create new utility file
2. Export function
3. Import where needed

## 🔄 Modification Guide

### To Change Structure:
1. Move files as needed
2. Update import paths
3. Test that everything still works
4. Update this file if structure changes significantly

### To Add More Components:
- Follow existing patterns
- Use TypeScript for props
- Add proper documentation
- Export properly

## 📚 Related Documentation

- See **README.md** for setup and overview
- See **QUICKSTART.md** for immediate setup
- See **USAGE_GUIDE.md** for component usage

---

Last Updated: October 2025

