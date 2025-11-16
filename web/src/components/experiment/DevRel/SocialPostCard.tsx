"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  RiShareForwardLine,
  RiCheckboxCircleLine,
  RiLoader4Line,
  RiFileCopyLine,
  RiTwitterXFill,
  RiCheckLine,
} from '@remixicon/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { AuroraText } from '@/components/ui/advanced/AuroraText';
import { RainbowButton } from '@/components/ui/advanced/RainbowButton';

interface SocialPostCardProps {
  status?: 'pending' | 'generating' | 'completed' | 'failed';
  postContent?: string;
  hashtags?: string[];
  platform?: 'twitter' | 'linkedin' | 'all';
  experimentId?: string;
  postApprovalStatus?: 'pending' | 'approved' | 'rejected' | 'posted';
  onPostToTwitter?: () => void;
  isPosting?: boolean;
}

export const SocialPostCard = ({
  status = 'pending',
  postContent,
  hashtags = [],
  platform = 'all',
  experimentId,
  postApprovalStatus,
  onPostToTwitter,
  isPosting = false,
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="hover-lift glass-card border-neutral-200 dark:border-neutral-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RiShareForwardLine size={20} />
            <AuroraText className="text-lg">Social Media Post</AuroraText>
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

        {postContent && status === 'completed' && (
          <div className="pt-3 border-t space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Platform</p>
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {platformLabels[platform]}
                </p>
              </div>
            </div>

            <div className="glass rounded-lg p-4 border border-neutral-200/50 dark:border-neutral-700/50">
              <p className="text-sm text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap leading-relaxed">
                {postContent}
              </p>
            </div>

            {hashtags.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Hashtags</p>
                <div className="flex flex-wrap gap-2">
                  {hashtags.map((tag, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2.5 py-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}

            {/* Post to Twitter Button */}
            {postApprovalStatus !== 'posted' && postApprovalStatus !== 'approved' && (
              <div className="pt-3 border-t">
                <Button
                  onClick={onPostToTwitter}
                  disabled={isPosting || !experimentId}
                  className="w-full bg-black hover:bg-gray-800 text-white"
                >
                  {isPosting ? (
                    <>
                      <RiLoader4Line size={16} className="mr-2 animate-spin" />
                      Posting to Twitter...
                    </>
                  ) : (
                    <>
                      <RiTwitterXFill size={16} className="mr-2" />
                      Post to Twitter / X
                    </>
                  )}
                </Button>
                <p className="text-xs text-neutral-500 mt-2 text-center">
                  This will automatically post to your Twitter/X account using browser automation
                </p>
              </div>
            )}

            {/* Posted Status */}
            {postApprovalStatus === 'posted' && (
              <div className="pt-3 border-t bg-green-50 border border-green-200 rounded p-3">
                <div className="flex items-center gap-2">
                  <RiCheckboxCircleLine size={16} className="text-green-600" />
                  <p className="text-sm text-green-700 font-medium">
                    ✓ Posted to Twitter / X successfully!
                  </p>
                </div>
              </div>
            )}

            {postApprovalStatus === 'approved' && (
              <div className="pt-3 border-t bg-blue-50 border border-blue-200 rounded p-3">
                <div className="flex items-center gap-2">
                  <RiLoader4Line size={16} className="text-blue-600 animate-spin" />
                  <p className="text-sm text-blue-700 font-medium">
                    Posting to Twitter / X in progress...
                  </p>
                </div>
              </div>
            )}

            {postApprovalStatus !== 'posted' && postApprovalStatus !== 'approved' && (
              <div className="pt-2 bg-green-50 border border-green-200 rounded p-3">
                <p className="text-xs text-green-700">
                  ✓ Post is ready to share! Copy the content above or post directly to Twitter.
                </p>
              </div>
            )}
          </div>
        )}

        {status === 'pending' && (
          <div className="pt-3 border-t">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center py-4">
              A social media post will be generated after the browser task completes
            </p>
          </div>
        )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
