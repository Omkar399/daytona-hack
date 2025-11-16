"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  color?: string;
  delay?: number;
  showChange?: boolean;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  change,
  icon: Icon,
  color = 'text-blue-400',
  delay = 0,
  showChange = true,
  className
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={cn("card-premium rounded-lg p-6 hover-lift", className)}
    >
      <div className="flex items-center justify-between mb-4">
        <Icon className={cn('h-8 w-8', color)} />
        {showChange && change && (
          <span className="text-green-400 text-sm font-medium">{change}</span>
        )}
      </div>
      <div>
        <p className="text-gray-400 text-sm mb-1">{label}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
    </motion.div>
  );
};

