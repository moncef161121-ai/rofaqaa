import { supabase } from '@/lib/supabase'

export const groupMessageService = {
  // Get group messages
  async getGroupMessages(groupId: string, limit: number = 50) {
    const { data, error } = await supabase
      .from('group_messages')
      .select('*')
      .eq('group_id', groupId)
      .order('created_at', { ascending: false })
      .limit(limit)
    return { data: data?.reverse(), error }
  },

  // Send message
  async sendMessage(groupId: string, content: string, messageType: string = 'text', repliedToId?: string) {
    const { data: userData } = await supabase.auth.getUser()
    const senderId = userData.user?.id

    if (!senderId) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('group_messages')
      .insert({
        group_id: groupId,
        sender_id: senderId,
        content,
        message_type: messageType,
        replied_to_id: repliedToId,
      })
      .select()
      .single()
    return { data, error }
  },

  // Edit message
  async editMessage(messageId: string, content: string) {
    const { data, error } = await supabase
      .from('group_messages')
      .update({ content, is_edited: true })
      .eq('id', messageId)
      .select()
      .single()
    return { data, error }
  },

  // Delete message
  async deleteMessage(messageId: string) {
    const { data, error } = await supabase
      .from('group_messages')
      .update({ is_deleted: true })
      .eq('id', messageId)
      .select()
      .single()
    return { data, error }
  },

  // Pin message
  async pinMessage(messageId: string) {
    const { data, error } = await supabase
      .from('group_messages')
      .update({ is_pinned: true })
      .eq('id', messageId)
      .select()
      .single()
    return { data, error }
  },

  // Unpin message
  async unpinMessage(messageId: string) {
    const { data, error } = await supabase
      .from('group_messages')
      .update({ is_pinned: false })
      .eq('id', messageId)
      .select()
      .single()
    return { data, error }
  },

  // Search messages
  async searchMessages(groupId: string, query: string) {
    const { data, error } = await supabase
      .from('group_messages')
      .select('*')
      .eq('group_id', groupId)
      .ilike('content', `%${query}%`)
      .order('created_at', { ascending: false })
    return { data, error }
  },
}
