"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiSunLine, RiMoonLine, RiComputerLine } from '@remixicon/react';
import { useTheme } from '@/hooks';
import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark' | 'system';

const themeConfig = {
  light: {
    icon: RiSunLine,
    label: 'Light mode',
    color: 'text-amber-500',
    hoverBg: 'hover:bg-amber-50 dark:hover:bg-amber-950',
  },
  dark: {
    icon: RiMoonLine,
    label: 'Dark mode',
    color: 'text-blue-500',
    hoverBg: 'hover:bg-blue-50 dark:hover:bg-blue-950',
  },
  system: {
    icon: RiComputerLine,
    label: 'System preference',
    color: 'text-purple-500',
    hoverBg: 'hover:bg-purple-50 dark:hover:bg-purple-950',
  },
};

interface ThemeToggleProps {
  variant?: 'floating' | 'inline';
  showLabel?: boolean;
  className?: string;
}

export function ThemeToggle({ 
  variant = 'inline', 
  showLabel = false,
  className 
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return null;
  }

  const cycleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const CurrentIcon = themeConfig[theme].icon;

  if (variant === 'floating') {
    return (
      <div className={cn(
        "fixed bottom-6 right-6 z-50",
        className
      )}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
        >
          <div className="relative">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "w-14 h-14 rounded-full glass-dark shadow-lg",
                "flex items-center justify-center",
                "border border-neutral-700/50",
                "hover-lift transition-all duration-200",
                themeConfig[theme].color
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CurrentIcon size={24} />
            </motion.button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full right-0 mb-3 glass-dark border border-neutral-700/50 rounded-lg p-2 shadow-xl min-w-[160px]"
                >
                  {(['light', 'dark', 'system'] as const).map((themeOption) => {
                    const config = themeConfig[themeOption];
                    const Icon = config.icon;
                    return (
                      <motion.button
                        key={themeOption}
                        onClick={() => {
                          setTheme(themeOption);
                          setIsOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2 rounded-md",
                          "text-sm font-medium transition-colors",
                          theme === themeOption
                            ? `${config.color} bg-neutral-800/50`
                            : 'text-neutral-300 hover:text-white',
                          config.hoverBg
                        )}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon size={18} />
                        <span>{config.label}</span>
                        {theme === themeOption && (
                          <motion.div
                            layoutId="active-theme"
                            className="ml-auto w-2 h-2 rounded-full bg-current"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                  
                  <div className="mt-2 pt-2 border-t border-neutral-700/50">
                    <div className="px-3 py-1 text-xs text-neutral-500">
                      Current: {resolvedTheme}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.button
      onClick={cycleTheme}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg",
        "glass transition-all duration-200",
        "border border-neutral-200 dark:border-neutral-700/50",
        "hover-lift",
        themeConfig[theme].color,
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={`Current theme: ${theme} (${resolvedTheme})`}
    >
      <CurrentIcon size={18} />
      {showLabel && (
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {themeConfig[theme].label}
        </span>
      )}
    </motion.button>
  );
}

