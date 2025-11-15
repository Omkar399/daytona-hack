"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) => {
  const baseStyles = 'rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2';
  
  const variants = {
    primary: 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400',
    secondary: 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white focus:ring-gray-300 dark:focus:ring-gray-500',
    outline: 'bg-transparent border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-600/10 focus:ring-blue-500 dark:focus:ring-blue-400',
    ghost: 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white focus:ring-gray-300 dark:focus:ring-gray-500'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

