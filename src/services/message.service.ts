import { supabase } from '@/lib/supabase'

export const messageService = {
  // Get chat messages
  async getChatMessages(chatId: string, limit: number = 50) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: false })
      .limit(limit)
    return { data: data?.reverse(), error }
  },

  // Send message
  async sendMessage(chatId: string, content: string, messageType: string = 'text', repliedToId?: string) {
    const { data: userData } = await supabase.auth.getUser()
    const senderId = userData.user?.id

    if (!senderId) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('messages')
      .insert({
        chat_id: chatId,
        sender_id: senderId,
        content,
        message_type: messageType,
        replied_to_id: repliedToId,
        delivered_at: new Date().toISOString(),
      })
      .select()
      .single()
    return { data, error }
  },

  // Edit message
  async editMessage(messageId: string, content: string) {
    const { data, error } = await supabase
      .from('messages')
      .update({ content, is_edited: true })
      .eq('id', messageId)
      .select()
      .single()
    return { data, error }
  },

  // Delete message
  async deleteMessage(messageId: string) {
    const { data, error } = await supabase
      .from('messages')
      .update({ is_deleted: true })
      .eq('id', messageId)
      .select()
      .single()
    return { data, error }
  },

  // Mark as read
  async markAsRead(messageId: string) {
    const { data, error } = await supabase
      .from('messages')
      .update({ read_at: new Date().toISOString() })
      .eq('id', messageId)
      .select()
      .single()
    return { data, error }
  },

  // Pin message
  async pinMessage(messageId: string) {
    const { data, error } = await supabase
      .from('messages')
      .update({ is_pinned: true })
      .eq('id', messageId)
      .select()
      .single()
    return { data, error }
  },

  // Unpin message
  async unpinMessage(messageId: string) {
    const { data, error } = await supabase
      .from('messages')
      .update({ is_pinned: false })
      .eq('id', messageId)
      .select()
      .single()
    return { data, error }
  },

  // Search messages
  async searchMessages(chatId: string, query: string) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_id', chatId)
      .ilike('content', `%${query}%`)
      .order('created_at', { ascending: false })
    return { data, error }
  },
}
