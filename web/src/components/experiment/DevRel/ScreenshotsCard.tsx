import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  RiImageAddLine,
  RiCheckboxCircleLine,
  RiLoader4Line,
  RiExternalLinkLine,
} from '@remixicon/react';
import Image from 'next/image';

interface Screenshot {
  url: string;
  description?: string;
  step?: number;
}

interface ScreenshotsCardProps {
  status?: 'pending' | 'loading' | 'completed' | 'failed';
  screenshots?: Screenshot[];
  totalCount?: number;
}

export const ScreenshotsCard = ({
  status = 'pending',
  screenshots = [],
  totalCount = 0,
}: ScreenshotsCardProps) => {
  const statusConfig = {
    pending: {
      icon: <RiLoader4Line size={20} className="text-gray-500 animate-spin" />,
      label: 'Waiting for Screenshots',
      description: 'Browser agent is exploring features...',
    },
    loading: {
      icon: <RiLoader4Line size={20} className="text-blue-500 animate-spin" />,
      label: 'Collecting Screenshots',
      description: 'Extracting screenshots from browser session...',
    },
    completed: {
      icon: <RiCheckboxCircleLine size={20} className="text-green-500" />,
      label: 'Screenshots Ready',
      description: `Captured ${totalCount} screenshots`,
    },
    failed: {
      icon: <RiImageAddLine size={20} className="text-red-500" />,
      label: 'No Screenshots',
      description: 'Failed to capture screenshots',
    },
  };

  const config = statusConfig[status];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RiImageAddLine size={20} />
          Screenshots
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

        {screenshots.length > 0 && (
          <div className="pt-3 border-t">
            <p className="text-sm font-medium text-neutral-900 mb-3">
              Captured Screenshots ({screenshots.length})
            </p>
            <div className="grid grid-cols-1 gap-3">
              {screenshots.map((screenshot, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      {screenshot.step && (
                        <p className="text-xs text-neutral-500">Step {screenshot.step}</p>
                      )}
                      {screenshot.description && (
                        <p className="text-sm font-medium text-neutral-700">
                          {screenshot.description}
                        </p>
                      )}
                    </div>
                    <a
                      href={screenshot.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <RiExternalLinkLine size={16} />
                    </a>
                  </div>
                  <a
                    href={screenshot.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative w-full rounded-lg overflow-hidden bg-neutral-100 hover:ring-2 hover:ring-blue-500 transition-all"
                  >
                    <div className="relative w-full h-48 bg-neutral-200">
                      <Image
                        src={screenshot.url}
                        alt={screenshot.description || `Screenshot ${idx + 1}`}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          // Fallback if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {status === 'pending' && (
          <div className="pt-3 border-t">
            <p className="text-sm text-neutral-600 text-center py-4">
              Screenshots will appear here as the browser agent explores the site
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
