import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  RiShareForwardLine,
  RiCheckboxCircleLine,
  RiLoader4Line,
  RiFileCopyLine,
  RiCheckLine,
  RiCloseLine,
  RiTwitterXLine,
} from '@remixicon/react';
import { useState } from 'react';

interface SocialPostCardProps {
  status?: 'pending' | 'generating' | 'completed' | 'failed';
  postContent?: string;
  hashtags?: string[];
  platform?: 'twitter' | 'linkedin' | 'all';
  experimentId?: string;
  postApprovalStatus?: 'pending' | 'approved' | 'rejected' | 'posted';
  onApprove?: (experimentId: string) => void;
  onReject?: (experimentId: string) => void;
  isApproving?: boolean;
}

export const SocialPostCard = ({
  status = 'pending',
  postContent,
  hashtags = [],
  platform = 'all',
  experimentId,
  postApprovalStatus = 'pending',
  onApprove,
  onReject,
  isApproving = false,
}: SocialPostCardProps) => {
  const [copied, setCopied] = useState(false);

  const statusConfig = {
    pending: {
      icon: <RiLoader4Line size={20} className="text-gray-500 animate-spin" />,
      label: 'Waiting for Post',
      description: 'Will generate after screenshots are ready...',
    },
    generating: {
      icon: <RiLoader4Line size={20} className="text-blue-500 animate-spin" />,
      label: 'Generating Post',
      description: 'Creating engaging social media content...',
    },
    completed: {
      icon: <RiCheckboxCircleLine size={20} className="text-green-500" />,
      label: 'Post Ready',
      description: 'Social media post has been generated',
    },
    failed: {
      icon: <RiShareForwardLine size={20} className="text-red-500" />,
      label: 'Post Generation Failed',
      description: 'Failed to generate social media post',
    },
  };

  const config = statusConfig[status];

  const handleCopy = async () => {
    if (postContent) {
      const textToCopy = `${postContent}\n\n${hashtags.join(' ')}`;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const platformLabels = {
    twitter: '𝕏 / Twitter',
    linkedin: 'LinkedIn',
    all: 'Universal',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RiShareForwardLine size={20} />
          Social Media Post
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

        {postContent && status === 'completed' && (
          <div className="pt-3 border-t space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-500 mb-1">Platform</p>
                <p className="text-sm font-medium text-neutral-900">
                  {platformLabels[platform]}
                </p>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded transition-colors text-sm"
              >
                <RiFileCopyLine size={14} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
              <p className="text-sm text-neutral-800 whitespace-pre-wrap leading-relaxed">
                {postContent}
              </p>
            </div>

            {hashtags.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs text-neutral-500">Hashtags</p>
                <div className="flex flex-wrap gap-2">
                  {hashtags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-sm text-blue-600 bg-blue-50 px-2.5 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Approval Status */}
            {postApprovalStatus === 'posted' && (
              <div className="pt-2 bg-green-50 border border-green-200 rounded p-3">
                <div className="flex items-center gap-2">
                  <RiTwitterXLine size={16} className="text-green-600" />
                  <p className="text-sm font-medium text-green-700">
                    ✓ Successfully posted to X!
                  </p>
                </div>
              </div>
            )}

            {postApprovalStatus === 'approved' && (
              <div className="pt-2 bg-blue-50 border border-blue-200 rounded p-3">
                <div className="flex items-center gap-2">
                  <RiLoader4Line size={16} className="text-blue-600 animate-spin" />
                  <p className="text-sm font-medium text-blue-700">
                    Posting to X...
                  </p>
                </div>
              </div>
            )}

            {postApprovalStatus === 'rejected' && (
              <div className="pt-2 bg-red-50 border border-red-200 rounded p-3">
                <p className="text-sm text-red-700">
                  Post was rejected and will not be published
                </p>
              </div>
            )}

            {/* Approval Buttons - Only show if pending */}
            {postApprovalStatus === 'pending' && experimentId && onApprove && onReject && (
              <div className="pt-3 border-t space-y-2">
                <p className="text-sm font-medium text-neutral-700">
                  Ready to post to X?
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={() => onApprove(experimentId)}
                    disabled={isApproving}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <RiCheckLine size={16} className="mr-2" />
                    {isApproving ? 'Posting...' : 'Accept & Post to X'}
                  </Button>
                  <Button
                    onClick={() => onReject(experimentId)}
                    disabled={isApproving}
                    variant="outline"
                    className="flex-1"
                  >
                    <RiCloseLine size={16} className="mr-2" />
                    Reject
                  </Button>
                </div>
                <p className="text-xs text-neutral-500 text-center">
                  This will automatically post the content and screenshots to X
                </p>
              </div>
            )}
          </div>
        )}

        {status === 'pending' && (
          <div className="pt-3 border-t">
            <p className="text-sm text-neutral-600 text-center py-4">
              A social media post will be generated after the browser task completes
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
