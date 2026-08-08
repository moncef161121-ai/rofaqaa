import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { profileService } from '@/services/profile.service'
import type { UpdateProfileInput } from '@/types/validation'

export const useProfile = (userId: string) => {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: () => profileService.getProfile(userId),
    enabled: !!userId,
  })
}

export const useProfileUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, updates }: { userId: string; updates: UpdateProfileInput }) =>
      profileService.updateProfile(userId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })
}

export const useSearchProfiles = (query: string) => {
  return useQuery({
    queryKey: ['profiles', 'search', query],
    queryFn: () => profileService.searchProfiles(query),
    enabled: query.length > 0,
  })
}
