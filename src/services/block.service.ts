import { supabase } from '@/lib/supabase'

export const blockService = {
  // Block user
  async blockUser(blockedId: string) {
    const { data: userData } = await supabase.auth.getUser()
    const blockerId = userData.user?.id

    if (!blockerId) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('blocked_users')
      .insert({
        blocker_id: blockerId,
        blocked_id: blockedId,
      })
      .select()
      .single()
    return { data, error }
  },

  // Unblock user
  async unblockUser(blockedId: string) {
    const { data: userData } = await supabase.auth.getUser()
    const blockerId = userData.user?.id

    if (!blockerId) throw new Error('Not authenticated')

    const { error } = await supabase
      .from('blocked_users')
      .delete()
      .eq('blocker_id', blockerId)
      .eq('blocked_id', blockedId)
    return { error }
  },

  // Get blocked users
  async getBlockedUsers() {
    const { data: userData } = await supabase.auth.getUser()
    const blockerId = userData.user?.id

    if (!blockerId) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('blocked_users')
      .select('blocked_id')
      .eq('blocker_id', blockerId)
    return { data, error }
  },

  // Check if user is blocked
  async isUserBlocked(userId: string) {
    const { data: userData } = await supabase.auth.getUser()
    const blockerId = userData.user?.id

    if (!blockerId) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('blocked_users')
      .select('id')
      .eq('blocker_id', blockerId)
      .eq('blocked_id', userId)
      .single()
    return { data, error }
  },
}
