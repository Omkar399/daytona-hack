"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color?: string;
  bgColor?: string;
  delay?: number;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  color = 'text-blue-400',
  bgColor = 'bg-blue-500/10',
  delay = 0,
  className
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={cn("card-premium rounded-lg p-6 hover-lift", className)}
    >
      <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center mb-4', bgColor)}>
        <Icon className={cn('h-6 w-6', color)} />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

