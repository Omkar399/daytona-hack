# Theme Provider Bug Fix

## Issue
Runtime Error: `useTheme must be used within a ThemeProvider`

## Root Cause
The ThemeProvider was conditionally rendering:
```tsx
if (!mounted) {
  return <>{children}</>;  // No context provided!
}
return (
  <ThemeContext.Provider value={...}>
    {children}
  </ThemeContext.Provider>
);
```

This caused the ThemeToggle component to try using the context before it was available.

## Solution

### 1. Always Provide Context
**File:** `web/src/providers/ThemeProvider.tsx`

Changed to always render the Provider:
```tsx
return (
  <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, systemTheme }}>
    {children}
  </ThemeContext.Provider>
);
```

### 2. Prevent Hydration Mismatch
**File:** `web/src/components/ui/advanced/ThemeToggle.tsx`

Added mounting check:
```tsx
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  return null;
}
```

## Result
✅ Context is always available
✅ No hydration mismatch warnings
✅ Theme toggle renders after client hydration
✅ Smooth user experience

## Testing
- [x] Theme toggle appears after page load
- [x] No console errors
- [x] Theme switching works
- [x] Theme persists on reload
- [x] No hydration warnings

## Status: FIXED ✅

