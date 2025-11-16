import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  RiImageAddLine,
  RiCheckboxCircleLine,
  RiLoader4Line,
  RiExternalLinkLine,
  RiCheckLine,
} from '@remixicon/react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Screenshot {
  url: string;
  description?: string;
  step?: number;
}

interface ScreenshotsCardProps {
  status?: 'pending' | 'loading' | 'completed' | 'failed';
  screenshots?: Screenshot[];
  totalCount?: number;
  selectedScreenshots?: string[];
  onSelectionChange?: (selectedUrls: string[]) => void;
  onSaveSelection?: () => void;
  isSaving?: boolean;
}

export const ScreenshotsCard = ({
  status = 'pending',
  screenshots = [],
  totalCount = 0,
  selectedScreenshots = [],
  onSelectionChange,
  onSaveSelection,
  isSaving = false,
}: ScreenshotsCardProps) => {
  const [localSelection, setLocalSelection] = useState<string[]>(selectedScreenshots);

  // Update local selection when prop changes
  useEffect(() => {
    setLocalSelection(selectedScreenshots);
  }, [selectedScreenshots]);

  const handleToggleScreenshot = (url: string) => {
    const newSelection = localSelection.includes(url)
      ? localSelection.filter((s) => s !== url)
      : [...localSelection, url];

    setLocalSelection(newSelection);
    onSelectionChange?.(newSelection);
  };

  const handleSelectAll = () => {
    const allUrls = screenshots.map((s) => s.url);
    setLocalSelection(allUrls);
    onSelectionChange?.(allUrls);
  };

  const handleDeselectAll = () => {
    setLocalSelection([]);
    onSelectionChange?.([]);
  };

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
          <div className="pt-3 border-t space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-neutral-900">
                Select Screenshots for Post ({localSelection.length}/{screenshots.length})
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleSelectAll}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Select All
                </button>
                <span className="text-neutral-300">|</span>
                <button
                  onClick={handleDeselectAll}
                  className="text-xs text-neutral-600 hover:text-neutral-700 font-medium"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {screenshots.map((screenshot, idx) => {
                const isSelected = localSelection.includes(screenshot.url);
                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleScreenshot(screenshot.url)}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'bg-blue-500 border-blue-500'
                              : 'border-neutral-300 hover:border-blue-400'
                          }`}
                        >
                          {isSelected && <RiCheckLine size={14} className="text-white" />}
                        </button>
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
                    <button
                      onClick={() => handleToggleScreenshot(screenshot.url)}
                      className={`block relative w-full rounded-lg overflow-hidden bg-neutral-100 transition-all ${
                        isSelected
                          ? 'ring-2 ring-blue-500'
                          : 'hover:ring-2 hover:ring-blue-300'
                      }`}
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
                        {isSelected && (
                          <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                            <RiCheckLine size={16} />
                          </div>
                        )}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {onSaveSelection && (
              <div className="pt-2">
                <Button
                  onClick={onSaveSelection}
                  disabled={isSaving || localSelection.length === 0}
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                >
                  {isSaving ? 'Saving...' : `Save Selection (${localSelection.length} screenshots)`}
                </Button>
                <p className="text-xs text-neutral-500 text-center mt-2">
                  These screenshots will be used when posting to X
                </p>
              </div>
            )}
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
