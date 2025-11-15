import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  RiGlobalLine,
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiLoader4Line,
} from '@remixicon/react';

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
    <Card>
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
            <p className="font-medium text-neutral-900">{config.label}</p>
            <p className="text-sm text-neutral-600">{config.description}</p>
          </div>
        </div>

        {extractedFeatures.length > 0 && (
          <div className="pt-3 border-t">
            <p className="text-sm font-medium text-neutral-900 mb-2">Features Being Tested</p>
            <div className="space-y-1">
              {extractedFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-sm text-neutral-700 bg-neutral-50 p-2 rounded"
                >
                  <span className="text-neutral-500 mt-0.5">•</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {(stepsCompleted > 0 || totalSteps > 0) && (
          <div className="pt-3 border-t">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-neutral-900">Progress</p>
              <span className="text-xs text-neutral-500">
                {stepsCompleted} / {totalSteps} steps
              </span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{
                  width: totalSteps > 0 ? `${(stepsCompleted / totalSteps) * 100}%` : '0%',
                }}
              />
            </div>
          </div>
        )}

        {taskPrompt && (
          <div className="pt-3 border-t">
            <p className="text-xs text-neutral-500 mb-2">Task Prompt</p>
            <p className="text-sm text-neutral-700 bg-neutral-50 p-2 rounded line-clamp-3">
              {taskPrompt}
            </p>
          </div>
        )}

        {taskDescription && (
          <div className="pt-3 border-t">
            <p className="text-xs text-neutral-500 mb-2">Task Description</p>
            <p className="text-sm text-neutral-700 bg-neutral-50 p-2 rounded">
              {taskDescription}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
