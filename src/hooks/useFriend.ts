import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { friendService } from '@/services/friend.service'

export const useFriendRequests = () => {
  return useQuery({
    queryKey: ['friends', 'requests'],
    queryFn: () => friendService.getFriendRequests(),
  })
}

export const useFriendsList = () => {
  return useQuery({
    queryKey: ['friends', 'list'],
    queryFn: () => friendService.getFriendsList(),
  })
}

export const useSendFriendRequest = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (receiverId: string) => friendService.sendFriendRequest(receiverId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friends'] })
    },
  })
}

export const useAcceptFriendRequest = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (requestId: string) => friendService.acceptFriendRequest(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friends'] })
    },
  })
}

export const useRejectFriendRequest = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (requestId: string) => friendService.rejectFriendRequest(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friends'] })
    },
  })
}

export const useRemoveFriend = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (friendId: string) => friendService.removeFriend(friendId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friends'] })
    },
  })
}
