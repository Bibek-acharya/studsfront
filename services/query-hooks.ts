import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  apiService,
  CreateCollegePayload,
  LoginPayload,
  RegisterPayload,
  SavePreferencesPayload,
} from "./api";

export const queryKeys = {
  profile: (token: string | null) => ["profile", token] as const,
  colleges: ["colleges"] as const,
  college: (id: number) => ["college", id] as const,
  universities: ["universities"] as const,
  university: (id: number) => ["university", id] as const,
};

export const useProfileQuery = (token: string | null) =>
  useQuery({
    queryKey: queryKeys.profile(token),
    queryFn: () => apiService.getProfile(token as string),
    enabled: !!token,
  });

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => apiService.login(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.profile(null) });
    },
  });
};

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => apiService.register(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.profile(null) });
    },
  });
};

export const useSavePreferencesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ token, preferences }: { token: string; preferences: SavePreferencesPayload }) =>
      apiService.savePreferences(token, preferences),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.profile(variables.token),
      });
    },
  });
};

export const useCreateCollegeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ token, college }: { token: string; college: CreateCollegePayload }) =>
      apiService.createCollege(token, college),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.colleges }),
        queryClient.invalidateQueries({ queryKey: queryKeys.universities }),
      ]);
    },
  });
};

export const useUpdateCollegeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      token,
      id,
      updates,
    }: {
      token: string;
      id: number;
      updates: any;
    }) => apiService.updateCollege(token, id, updates),
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.colleges }),
        queryClient.invalidateQueries({ queryKey: queryKeys.college(variables.id) }),
        queryClient.invalidateQueries({ queryKey: queryKeys.universities }),
      ]);
    },
  });
};

export const useDeleteCollegeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ token, id }: { token: string; id: number }) =>
      apiService.deleteCollege(token, id),
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.colleges }),
        queryClient.invalidateQueries({ queryKey: queryKeys.college(variables.id) }),
        queryClient.invalidateQueries({ queryKey: queryKeys.universities }),
      ]);
    },
  });
};
