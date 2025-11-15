"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface RainbowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const RainbowButton = ({ children, className = "", ...props }: RainbowButtonProps) => {
  return (
    <button 
      className={cn(
        "relative w-full h-12 flex items-center justify-center gap-2.5 px-4 bg-black rounded-xl border-none text-white cursor-pointer font-bold transition-all duration-200",
        "before:content-[''] before:absolute before:left-[-2px] before:top-[-2px] before:rounded-xl",
        "before:bg-gradient-to-r before:from-yellow-400 before:via-orange-500 before:to-blue-500",
        "before:bg-[length:400%] before:w-[calc(100%+4px)] before:h-[calc(100%+4px)] before:z-[-1]",
        "before:animate-[rainbow_60s_linear_infinite] before:opacity-70",
        "after:content-[''] after:absolute after:left-[-2px] after:top-[-2px] after:rounded-xl",
        "after:bg-gradient-to-r after:from-yellow-400 after:via-orange-500 after:to-blue-500",
        "after:bg-[length:400%] after:w-[calc(100%+4px)] after:h-[calc(100%+4px)] after:z-[-1]",
        "after:animate-[rainbow_60s_linear_infinite] after:blur-[20px] after:opacity-40",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

