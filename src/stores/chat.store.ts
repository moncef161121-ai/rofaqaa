import { create } from 'zustand'

interface TypingIndicator {
  userId: string
  username: string
}

interface ChatStore {
  activeChat: string | null
  typingUsers: Map<string, TypingIndicator>
  unreadChats: Map<string, number>
  setActiveChat: (chatId: string | null) => void
  addTypingUser: (chatId: string, userId: string, username: string) => void
  removeTypingUser: (chatId: string, userId: string) => void
  setUnreadCount: (chatId: string, count: number) => void
}

export const useChatStore = create<ChatStore>((set) => ({
  activeChat: null,
  typingUsers: new Map(),
  unreadChats: new Map(),

  setActiveChat: (chatId) => set({ activeChat: chatId }),
  addTypingUser: (chatId, userId, username) =>
    set((state) => {
      const key = `${chatId}:${userId}`
      state.typingUsers.set(key, { userId, username })
      return { typingUsers: new Map(state.typingUsers) }
    }),
  removeTypingUser: (chatId, userId) =>
    set((state) => {
      const key = `${chatId}:${userId}`
      state.typingUsers.delete(key)
      return { typingUsers: new Map(state.typingUsers) }
    }),
  setUnreadCount: (chatId, count) =>
    set((state) => {
      state.unreadChats.set(chatId, count)
      return { unreadChats: new Map(state.unreadChats) }
    }),
}))
