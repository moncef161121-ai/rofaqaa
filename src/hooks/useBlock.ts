import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { blockService } from '@/services/block.service'

export const useBlockedUsers = () => {
  return useQuery({
    queryKey: ['blocked', 'users'],
    queryFn: () => blockService.getBlockedUsers(),
  })
}

export const useBlockUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (blockedId: string) => blockService.blockUser(blockedId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blocked'] })
    },
  })
}

export const useUnblockUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (blockedId: string) => blockService.unblockUser(blockedId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blocked'] })
    },
  })
}
