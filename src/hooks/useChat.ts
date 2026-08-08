import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { chatService } from '@/services/chat.service'
import { messageService } from '@/services/message.service'

export const useChatsList = () => {
  return useQuery({
    queryKey: ['chats', 'list'],
    queryFn: () => chatService.getChatsList(),
  })
}

export const useChat = (chatId: string) => {
  return useQuery({
    queryKey: ['chats', chatId],
    queryFn: () => chatService.getChat(chatId),
    enabled: !!chatId,
  })
}

export const useGetOrCreateChat = () => {
  return useMutation({
    mutationFn: (userId2: string) => chatService.getOrCreateChat(userId2),
  })
}

export const useChatMessages = (chatId: string) => {
  return useQuery({
    queryKey: ['messages', chatId],
    queryFn: () => messageService.getChatMessages(chatId),
    enabled: !!chatId,
  })
}

export const useSendMessage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      chatId,
      content,
      messageType,
      repliedToId,
    }: {
      chatId: string
      content: string
      messageType: string
      repliedToId?: string
    }) => messageService.sendMessage(chatId, content, messageType, repliedToId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['messages', variables.chatId] })
    },
  })
}

export const useEditMessage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ messageId, content }: { messageId: string; content: string }) =>
      messageService.editMessage(messageId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] })
    },
  })
}

export const useDeleteMessage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (messageId: string) => messageService.deleteMessage(messageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] })
    },
  })
}

export const useSearchMessages = (chatId: string, query: string) => {
  return useQuery({
    queryKey: ['messages', 'search', chatId, query],
    queryFn: () => messageService.searchMessages(chatId, query),
    enabled: !!chatId && query.length > 0,
  })
}
