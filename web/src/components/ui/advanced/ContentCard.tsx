"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ContentCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animateFrom?: 'left' | 'right' | 'top' | 'bottom';
}

export const ContentCard: React.FC<ContentCardProps> = ({
  title,
  children,
  className,
  delay = 0,
  animateFrom = 'bottom'
}) => {
  const getInitialPosition = () => {
    switch (animateFrom) {
      case 'left':
        return { opacity: 0, x: -20 };
      case 'right':
        return { opacity: 0, x: 20 };
      case 'top':
        return { opacity: 0, y: -20 };
      case 'bottom':
      default:
        return { opacity: 0, y: 20 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay }}
      className={cn('card-premium rounded-lg p-6', className)}
    >
      {title && <h2 className="text-xl font-bold text-white mb-6">{title}</h2>}
      {children}
    </motion.div>
  );
};

