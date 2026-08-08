import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { groupService } from '@/services/group.service'
import { groupMessageService } from '@/services/group-message.service'

export const useUserGroups = () => {
  return useQuery({
    queryKey: ['groups', 'user'],
    queryFn: () => groupService.getUserGroups(),
  })
}

export const useGroup = (groupId: string) => {
  return useQuery({
    queryKey: ['groups', groupId],
    queryFn: () => groupService.getGroup(groupId),
    enabled: !!groupId,
  })
}

export const useCreateGroup = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      name,
      description,
    }: {
      name: string
      description?: string
    }) => groupService.createGroup(name, description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] })
    },
  })
}

export const useUpdateGroup = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ groupId, updates }: { groupId: string; updates: any }) =>
      groupService.updateGroup(groupId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] })
    },
  })
}

export const useGetGroupMessages = (groupId: string) => {
  return useQuery({
    queryKey: ['group-messages', groupId],
    queryFn: () => groupMessageService.getGroupMessages(groupId),
    enabled: !!groupId,
  })
}

export const useSendGroupMessage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      groupId,
      content,
      messageType,
      repliedToId,
    }: {
      groupId: string
      content: string
      messageType: string
      repliedToId?: string
    }) => groupMessageService.sendMessage(groupId, content, messageType, repliedToId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['group-messages', variables.groupId] })
    },
  })
}

export const useGetGroupMembers = (groupId: string) => {
  return useQuery({
    queryKey: ['group-members', groupId],
    queryFn: () => groupService.getGroupMembers(groupId),
    enabled: !!groupId,
  })
}
