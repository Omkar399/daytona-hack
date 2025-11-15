"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ListItemProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const ListItem: React.FC<ListItemProps> = ({
  children,
  delay = 0,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className={cn('p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors', className)}
    >
      {children}
    </motion.div>
  );
};

