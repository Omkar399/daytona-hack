"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  RiGlobalLine,
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiLoader4Line,
} from '@remixicon/react';
import { motion } from 'framer-motion';

interface BrowserTaskCardProps {
  status?: 'pending' | 'running' | 'completed' | 'failed';
  taskPrompt?: string;
  taskDescription?: string;
  extractedFeatures?: string[];
  stepsCompleted?: number;
  totalSteps?: number;
}

export const BrowserTaskCard = ({
  status = 'pending',
  taskPrompt,
  taskDescription,
  extractedFeatures = [],
  stepsCompleted = 0,
  totalSteps = 0,
}: BrowserTaskCardProps) => {
  const statusConfig = {
    pending: {
      icon: <RiLoader4Line size={20} className="text-yellow-500 animate-spin" />,
      label: 'Starting Browser Agent',
      description: 'Initializing browser automation task...',
    },
    running: {
      icon: <RiLoader4Line size={20} className="text-blue-500 animate-spin" />,
      label: 'Browser Agent Running',
      description: 'Exploring features and taking screenshots...',
    },
    completed: {
      icon: <RiCheckboxCircleLine size={20} className="text-green-500" />,
      label: 'Task Completed',
      description: 'Browser agent finished and captured screenshots',
    },
    failed: {
      icon: <RiErrorWarningLine size={20} className="text-red-500" />,
      label: 'Browser Task Failed',
      description: 'Failed to complete browser automation task',
    },
  };

  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="hover-lift glass-card border-neutral-200 dark:border-neutral-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RiGlobalLine size={20} />
            Browser Agent Task
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="pt-0.5">{config.icon}</div>
          <div className="flex-1">
            <p className="font-medium text-neutral-900 dark:text-neutral-100">{config.label}</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{config.description}</p>
          </div>
        </div>

        {extractedFeatures.length > 0 && (
          <div className="pt-3 border-t">
            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">Features Being Tested</p>
            <div className="space-y-1">
              {extractedFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-800/50 p-2 rounded"
                >
                  <span className="text-neutral-500 dark:text-neutral-400 mt-0.5">•</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {(stepsCompleted > 0 || totalSteps > 0) && (
          <div className="pt-3 border-t">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Progress</p>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                {stepsCompleted} / {totalSteps} steps
              </span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: totalSteps > 0 ? `${(stepsCompleted / totalSteps) * 100}%` : '0%',
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        )}

        {taskPrompt && (
          <div className="pt-3 border-t">
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">Task Prompt</p>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-800/50 p-2 rounded line-clamp-3">
              {taskPrompt}
            </p>
          </div>
        )}

        {taskDescription && (
          <div className="pt-3 border-t">
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">Task Description</p>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-800/50 p-2 rounded">
              {taskDescription}
            </p>
          </div>
        )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
