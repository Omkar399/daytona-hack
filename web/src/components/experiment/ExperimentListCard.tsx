import { Card, CardContent } from '@/components/ui/card';
import {
  RiTimeLine,
  RiArrowRightLine,
  RiCheckboxCircleLine,
  RiLoader4Line,
  RiFlaskLine,
} from '@remixicon/react';
import Link from 'next/link';

interface ExperimentListCardProps {
  experiment: {
    id: string;
    repoUrl: string;
    goal: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    createdAt: string;
    updatedAt: string;
  };
}

export const ExperimentListCard = ({ experiment }: ExperimentListCardProps) => {
  const statusConfig = {
    pending: {
      icon: <RiTimeLine size={12} />,
      label: 'Pending',
      color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    },
    running: {
      icon: <RiLoader4Line size={12} className="animate-spin" />,
      label: 'Testing Features',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    completed: {
      icon: <RiCheckboxCircleLine size={12} />,
      label: 'Post Ready',
      color: 'bg-green-50 text-green-700 border-green-200',
    },
    failed: {
      icon: <RiTimeLine size={12} />,
      label: 'Failed',
      color: 'bg-red-50 text-red-700 border-red-200',
    },
  };

  const config = statusConfig[experiment.status];
  const repoName = experiment.repoUrl.split('/').slice(-2).join('/');

  // Format time ago
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <Link href={`/experiments/${experiment.id}`}>
      <Card className="hover:border-neutral-400 transition-colors cursor-pointer group">
        <CardContent className="py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <RiFlaskLine size={14} className="text-neutral-500" />
                <span className="text-xs text-neutral-500 font-mono truncate">
                  {repoName}
                </span>
                <span className="text-neutral-300">•</span>
                <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded border ${config.color}`}>
                  {config.icon}
                  <span>{config.label}</span>
                </div>
              </div>
              <h3 className="text-sm font-medium text-neutral-900 mb-2 line-clamp-2">
                {experiment.goal}
              </h3>
              <div className="flex items-center gap-3 text-xs text-neutral-500">
                <span>Started {getTimeAgo(experiment.createdAt)}</span>
                <span className="text-neutral-300">•</span>
                <span>Updated {getTimeAgo(experiment.updatedAt)}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-neutral-400 group-hover:text-neutral-900 transition-colors">
              <RiArrowRightLine size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
