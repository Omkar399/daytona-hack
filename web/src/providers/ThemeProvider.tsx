"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  systemTheme: ResolvedTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'daytona-theme-preference';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>('dark');
  const [mounted, setMounted] = useState(false);

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystemTheme = () => {
      setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    };

    updateSystemTheme();
    mediaQuery.addEventListener('change', updateSystemTheme);
    setMounted(true);

    return () => mediaQuery.removeEventListener('change', updateSystemTheme);
  }, []);

  // Load saved theme preference
  useEffect(() => {
    if (mounted) {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme;
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        setThemeState(savedTheme);
      }
    }
  }, [mounted]);

  // Calculate resolved theme
  const resolvedTheme: ResolvedTheme = theme === 'system' ? systemTheme : theme;

  // Apply theme to document
  useEffect(() => {
    if (mounted) {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(resolvedTheme);
    }
  }, [resolvedTheme, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, systemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

