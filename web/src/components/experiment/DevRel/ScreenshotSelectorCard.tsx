import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  RiImageAddLine,
  RiCheckboxCircleLine,
  RiCheckboxBlankLine,
  RiRefreshLine,
  RiSparklingLine,
} from '@remixicon/react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Screenshot {
  url: string;
  description?: string;
  step?: number;
  id?: string;
}

interface ScreenshotSelectorCardProps {
  screenshots: Screenshot[];
  selectedScreenshotIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  onRegeneratePost?: (selectedScreenshots: Screenshot[]) => void;
  isRegenerating?: boolean;
}

export const ScreenshotSelectorCard = ({
  screenshots = [],
  selectedScreenshotIds = [],
  onSelectionChange,
  onRegeneratePost,
  isRegenerating = false,
}: ScreenshotSelectorCardProps) => {
  // Initialize with selected IDs if provided, otherwise select all by default
  const getInitialSelection = () => {
    if (selectedScreenshotIds.length > 0) {
      return selectedScreenshotIds;
    }
    // If no selection provided, select all by default
    return screenshots.map((_, idx) => idx.toString());
  };

  const [localSelected, setLocalSelected] = useState<string[]>(getInitialSelection());

  // Sync with prop changes - only update if the selection actually changed
  useEffect(() => {
    if (selectedScreenshotIds.length > 0) {
      // Check if the selection is different before updating
      const isDifferent = 
        localSelected.length !== selectedScreenshotIds.length ||
        !selectedScreenshotIds.every(id => localSelected.includes(id));
      
      if (isDifferent) {
        setLocalSelected(selectedScreenshotIds);
      }
    }
    // Don't auto-select all on screenshots.length change - only on initial mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedScreenshotIds]);

  const handleToggle = (screenshotId: string) => {
    const newSelected = localSelected.includes(screenshotId)
      ? localSelected.filter((id) => id !== screenshotId)
      : [...localSelected, screenshotId];

    setLocalSelected(newSelected);
    onSelectionChange?.(newSelected);
  };

  const handleSelectAll = () => {
    const allIds = screenshots.map((_, idx) => idx.toString());
    setLocalSelected(allIds);
    onSelectionChange?.(allIds);
  };

  const handleDeselectAll = () => {
    setLocalSelected([]);
    onSelectionChange?.([]);
  };

  const handleRegenerate = () => {
    const selectedScreenshots = screenshots.filter((_, idx) =>
      localSelected.includes(idx.toString())
    );
    onRegeneratePost?.(selectedScreenshots);
  };

  const selectedCount = localSelected.length;
  const totalCount = screenshots.length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 mb-2">
          <RiImageAddLine size={20} />
          Select Screenshots for Social Post
        </CardTitle>
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200">
                <RiSparklingLine size={14} className="text-purple-600" />
                <span className="text-xs font-medium text-purple-700">
                  AI-Filtered Top {totalCount}
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                Intelligently selected from all captured screenshots
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-900">
              {selectedCount} of {totalCount} screenshots selected
            </p>
            <p className="text-xs text-neutral-500">
              Refine your selection or use all AI-curated screenshots
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
              disabled={selectedCount === totalCount}
            >
              Select All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDeselectAll}
              disabled={selectedCount === 0}
            >
              Deselect All
            </Button>
          </div>
        </div>

        {screenshots.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t">
            {screenshots.map((screenshot, idx) => {
              const screenshotId = idx.toString();
              const isSelected = localSelected.includes(screenshotId);

              return (
                <div
                  key={idx}
                  className={`relative border-2 rounded-lg overflow-hidden transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                  onClick={() => handleToggle(screenshotId)}
                >
                  {/* AI-Selected Badge */}
                  <div className="absolute top-2 left-2 z-10">
                    <div className="px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white flex items-center gap-1 shadow-sm">
                      <RiSparklingLine size={12} />
                      <span className="text-xs font-medium">AI Pick</span>
                    </div>
                  </div>

                  {/* Selection Checkbox */}
                  <div className="absolute top-2 right-2 z-10">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        isSelected
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/90 text-neutral-400'
                      }`}
                    >
                      {isSelected ? (
                        <RiCheckboxCircleLine size={18} />
                      ) : (
                        <RiCheckboxBlankLine size={18} />
                      )}
                    </div>
                  </div>

                  {/* Screenshot Image */}
                  <div className="relative w-full h-48 bg-neutral-100">
                    <Image
                      src={screenshot.url}
                      alt={screenshot.description || `Screenshot ${idx + 1}`}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Screenshot Info */}
                  <div className="p-3 bg-white">
                    {screenshot.step && (
                      <p className="text-xs text-neutral-500 mb-1">Step {screenshot.step}</p>
                    )}
                    {screenshot.description && (
                      <p className="text-sm font-medium text-neutral-900 line-clamp-2">
                        {screenshot.description}
                      </p>
                    )}
                    {!screenshot.description && (
                      <p className="text-sm text-neutral-500">Screenshot {idx + 1}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {screenshots.length === 0 && (
          <div className="pt-3 border-t">
            <p className="text-sm text-neutral-600 text-center py-8">
              No screenshots available to select
            </p>
          </div>
        )}

        {screenshots.length > 0 && onRegeneratePost && (
          <div className="pt-4 border-t">
            <Button
              onClick={handleRegenerate}
              disabled={isRegenerating || selectedCount === 0}
              className="w-full"
            >
              {isRegenerating ? (
                <>
                  <RiRefreshLine size={16} className="mr-2 animate-spin" />
                  Regenerating Post...
                </>
              ) : (
                <>
                  <RiRefreshLine size={16} className="mr-2" />
                  Regenerate Post with {selectedCount} Selected Screenshot{selectedCount !== 1 ? 's' : ''}
                </>
              )}
            </Button>
            <p className="text-xs text-neutral-500 mt-2 text-center">
              This will regenerate the social media post using only the selected screenshots
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

