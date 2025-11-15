'use client';

import { useExperimentDetailQuery, useApprovePostMutation } from '@/query/experiment.query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  RiFlaskLine,
  RiArrowLeftLine,
  RiGitRepositoryLine,
  RiTargetLine,
} from '@remixicon/react';
import Link from 'next/link';
import { SandboxCard } from './DevRel/SandboxCard';
import { BrowserTaskCard } from './DevRel/BrowserTaskCard';
import { ScreenshotsCard } from './DevRel/ScreenshotsCard';
import { SocialPostCard } from './DevRel/SocialPostCard';

interface ExperimentDetailContainerProps {
  experimentId: string;
}

export const ExperimentDetailContainer = ({ experimentId }: ExperimentDetailContainerProps) => {
  const { experiment, isLoading, isError } = useExperimentDetailQuery(experimentId);
  const { approvePost, isPending: isApproving } = useApprovePostMutation();

  const handleApprove = async (expId: string) => {
    try {
      await approvePost({ experimentId: expId, approved: true });
      console.log('✅ Post approved and posting to X initiated');
    } catch (error) {
      console.error('❌ Failed to approve post:', error);
    }
  };

  const handleReject = async (expId: string) => {
    try {
      await approvePost({ experimentId: expId, approved: false });
      console.log('✅ Post rejected');
    } catch (error) {
      console.error('❌ Failed to reject post:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <RiFlaskLine size={48} className="mx-auto mb-4 text-neutral-400 animate-pulse" />
          <p className="text-neutral-600">Loading experiment details...</p>
        </div>
      </div>
    );
  }

  if (isError || !experiment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Experiment Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 mb-4">
              The experiment you're looking for doesn't exist or has been deleted.
            </p>
            <Link href="/">
              <Button>
                <RiArrowLeftLine size={16} className="mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statusLabels = {
    pending: 'Pending',
    running: 'Running',
    completed: 'Completed',
    failed: 'Failed',
  };

  const statusLabel = statusLabels[experiment.status] || experiment.status;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <RiArrowLeftLine size={16} className="mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">Experiment</h1>
              <span className="text-neutral-400">•</span>
              <span className="text-sm text-neutral-500">{statusLabel}</span>
            </div>
          </div>
        </div>

        {/* Experiment Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RiTargetLine size={20} />
              DevRel Flow Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <RiGitRepositoryLine size={18} className="text-neutral-600" />
                <p className="text-sm font-medium text-neutral-700">Repository</p>
              </div>
              <p className="text-sm text-neutral-600 font-mono bg-neutral-50 p-2 rounded">
                {experiment.repoUrl}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <RiTargetLine size={18} className="text-neutral-600" />
                <p className="text-sm font-medium text-neutral-700">Goal</p>
              </div>
              <p className="text-sm text-neutral-600">{experiment.goal}</p>
            </div>

            <div className="flex gap-6 text-sm">
              <div>
                <p className="text-neutral-500">Created</p>
                <p className="font-medium">
                  {new Date(experiment.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-neutral-500">Last Updated</p>
                <p className="font-medium">
                  {new Date(experiment.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DevRel Flow Pipeline */}
        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
              🚀 DevRel Pipeline
            </h2>

            {/* Step 1: Sandbox */}
            <div className="mb-4">
              <SandboxCard
                status={experiment.status === 'pending' ? 'pending' : experiment.status === 'running' ? 'running' : experiment.status === 'completed' ? 'completed' : 'failed'}
                sandboxId={experiment.controlVariant?.daytonaSandboxId}
                sandboxUrl={experiment.controlVariant?.publicUrl}
                createdAt={experiment.createdAt}
              />
            </div>

            {/* Step 2: Browser Task */}
            <div className="mb-4">
              <BrowserTaskCard
                status={experiment.status === 'pending' ? 'pending' : experiment.status === 'running' ? 'running' : 'completed'}
                extractedFeatures={[]}
                taskPrompt={experiment.goal}
              />
            </div>

            {/* Step 3: Screenshots */}
            <div className="mb-4">
              <ScreenshotsCard
                status={experiment.status === 'completed' ? 'completed' : 'pending'}
                screenshots={experiment.experimentalVariants?.map((v: any, idx) => ({
                  url: v.description || '',
                  description: `Variant ${idx + 1}`,
                  step: idx + 1,
                })) || []}
                totalCount={experiment.experimentalVariants?.length || 0}
              />
            </div>

            {/* Step 4: Social Post */}
            <div>
              <SocialPostCard
                status={experiment.status === 'completed' ? 'completed' : 'pending'}
                postContent={experiment.variantSuggestions?.[0]}
                hashtags={['#devrel', '#automation', '#featurelaunch']}
                platform="all"
                experimentId={experimentId}
                postApprovalStatus={experiment.postApprovalStatus || 'pending'}
                onApprove={handleApprove}
                onReject={handleReject}
                isApproving={isApproving}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
