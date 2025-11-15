"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  RiServerLine,
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiLoader4Line,
  RiExternalLinkLine,
} from '@remixicon/react';
import { motion } from 'framer-motion';

interface SandboxCardProps {
  status?: 'pending' | 'running' | 'completed' | 'failed';
  sandboxId?: string;
  sandboxUrl?: string;
  createdAt?: string;
}

export const SandboxCard = ({
  status = 'pending',
  sandboxId,
  sandboxUrl,
  createdAt,
}: SandboxCardProps) => {
  const statusConfig = {
    pending: {
      icon: <RiLoader4Line size={20} className="text-yellow-500 animate-spin" />,
      label: 'Creating Sandbox',
      description: 'Initializing repository and dev server...',
    },
    running: {
      icon: <RiLoader4Line size={20} className="text-blue-500 animate-spin" />,
      label: 'Sandbox Running',
      description: 'Dev server is live and ready for testing',
    },
    completed: {
      icon: <RiCheckboxCircleLine size={20} className="text-green-500" />,
      label: 'Sandbox Ready',
      description: 'Dev server is running successfully',
    },
    failed: {
      icon: <RiErrorWarningLine size={20} className="text-red-500" />,
      label: 'Sandbox Failed',
      description: 'Failed to create sandbox environment',
    },
  };

  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="hover-lift glass-dark border-neutral-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RiServerLine size={20} />
            Sandbox Environment
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

        {sandboxId && (
          <div className="pt-3 border-t">
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Sandbox ID</p>
            <p className="text-sm font-mono bg-neutral-50 dark:bg-neutral-800/50 p-2 rounded text-neutral-700 dark:text-neutral-300">
              {sandboxId}
            </p>
          </div>
        )}

        {sandboxUrl && status !== 'failed' && (
          <div className="pt-3 border-t">
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">Live URL</p>
            <a
              href={sandboxUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-950/30 p-2 rounded transition-colors"
            >
              <span className="break-all">{sandboxUrl}</span>
              <RiExternalLinkLine size={14} className="flex-shrink-0" />
            </a>
          </div>
        )}

        {createdAt && (
          <div className="pt-3 border-t">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Created</p>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              {new Date(createdAt).toLocaleString()}
            </p>
          </div>
        )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
