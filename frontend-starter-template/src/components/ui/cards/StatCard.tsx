import React from 'react';
import { motion } from 'framer-motion';
import type { StatCard as StatCardType } from '../../../types';

interface StatCardProps extends StatCardType {
  delay?: number;
  showChange?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  change,
  icon: Icon,
  color,
  delay = 0,
  showChange = true
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="card-premium rounded-lg p-6 hover-lift"
    >
      <div className="flex items-center justify-between mb-4">
        <Icon className={`h-8 w-8 ${color}`} />
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

