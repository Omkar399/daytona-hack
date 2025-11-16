import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API_CLIENT } from './api-client';

// Database entity types (matching API responses)
interface Experiment {
  id: string;
  repoUrl: string;
  goal: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
  variantSuggestions?: string[];
  selectedScreenshotUrls?: string[];
  postApprovalStatus?: 'pending' | 'approved' | 'rejected' | 'posted';
  postedToXAt?: string;
  controlVariant?: {
    id: string;
    daytonaSandboxId: string;
    publicUrl: string;
    type: 'control';
  };
  experimentalVariants?: Array<{
    id: string;
    description: string;
  }>;
}

interface StartExperimentInput {
  repoUrl: string;
  goal: string;
}

interface StartExperimentResponse {
  id: string;
  repoUrl: string;
  goal: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  createdAt: string;
}

// Queries
export const useExperimentsQuery = () => {
  const query = useQuery({
    queryKey: ['experiments'],
    queryFn: async (): Promise<Experiment[]> => {
      return API_CLIENT.fetch('/experiment', {
        method: 'GET',
      });
    },
  });

  return {
    experiments: query.data,
    ...query,
  };
};

export const useExperimentDetailQuery = (experimentId: string | null) => {
  const query = useQuery({
    queryKey: ['experiment', experimentId],
    queryFn: async (): Promise<Experiment> => {
      if (!experimentId) {
        throw new Error('Experiment ID is required');
      }

      // Fetch experiment - returns all data we need for DevRel flow
      const experimentResponse = await API_CLIENT.fetch(`/experiment/${experimentId}`, {
        method: 'GET',
      });
      
      // API returns array, get first element
      return experimentResponse[0] || experimentResponse;
    },
    enabled: !!experimentId,
  });

  return {
    experiment: query.data,
    ...query,
  };
};

// Mutations
export const useStartExperimentMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: StartExperimentInput) => {
      return API_CLIENT.fetch('/experiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }) as Promise<StartExperimentResponse>;
    },
    onSuccess: () => {
      // Invalidate experiments query to refetch the list
      queryClient.invalidateQueries({ queryKey: ['experiments'] });
    },
  });

  return {
    startExperiment: mutation.mutateAsync,
    ...mutation,
  };
};

export const useApprovePostMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ experimentId, approved }: { experimentId: string; approved: boolean }) => {
      return API_CLIENT.fetch(`/experiment/${experimentId}/approve-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ approved }),
      }) as Promise<{ success: boolean; message: string; status: string }>;
    },
    onSuccess: (_, variables) => {
      // Invalidate experiment detail query to refetch updated status
      queryClient.invalidateQueries({ queryKey: ['experiment', variables.experimentId] });
      queryClient.invalidateQueries({ queryKey: ['experiments'] });
    },
  });

  return {
    approvePost: mutation.mutateAsync,
    ...mutation,
  };
};

export const useRegeneratePostMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ experimentId, selectedScreenshotUrls }: { experimentId: string; selectedScreenshotUrls: string[] }) => {
      return API_CLIENT.fetch(`/experiment/${experimentId}/regenerate-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedScreenshotUrls }),
      }) as Promise<{ success: boolean; message: string; post: { content: string; hashtags: string[] } }>;
    },
    onSuccess: (_, variables) => {
      // Invalidate experiment detail query to refetch updated post
      queryClient.invalidateQueries({ queryKey: ['experiment', variables.experimentId] });
      queryClient.invalidateQueries({ queryKey: ['experiments'] });
    },
  });

  return {
    regeneratePost: mutation.mutateAsync,
    ...mutation,
  };
};
