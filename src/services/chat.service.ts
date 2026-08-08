import { supabase } from '@/lib/supabase'

export const chatService = {
  // Get or create chat
  async getOrCreateChat(userId2: string) {
    const { data: userData } = await supabase.auth.getUser()
    const userId1 = userData.user?.id

    if (!userId1) throw new Error('Not authenticated')

    // Check if chat exists
    const { data: existingChat } = await supabase
      .from('chats')
      .select('*')
      .or(`and(user_id_1.eq.${userId1},user_id_2.eq.${userId2}),and(user_id_1.eq.${userId2},user_id_2.eq.${userId1})`)
      .single()

    if (existingChat) return { data: existingChat, error: null }

    // Create new chat
    const { data, error } = await supabase
      .from('chats')
      .insert({
        user_id_1: userId1,
        user_id_2: userId2,
      })
      .select()
      .single()
    return { data, error }
  },

  // Get chats list
  async getChatsList(limit: number = 50) {
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData.user?.id

    if (!userId) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('chats')
      .select('*')
      .or(`user_id_1.eq.${userId},user_id_2.eq.${userId}`)
      .order('last_message_at', { ascending: false, nullsFirst: false })
      .limit(limit)
    return { data, error }
  },

  // Get chat by ID
  async getChat(chatId: string) {
    const { data, error } = await supabase
      .from('chats')
      .select('*')
      .eq('id', chatId)
      .single()
    return { data, error }
  },

  // Delete chat
  async deleteChat(chatId: string) {
    const { error } = await supabase
      .from('chats')
      .delete()
      .eq('id', chatId)
    return { error }
  },
}
