import { supabase } from '@/lib/supabase'

export const notificationService = {
  // Get notifications
  async getNotifications(limit: number = 50) {
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData.user?.id

    if (!userId) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)
    return { data, error }
  },

  // Mark notification as read
  async markAsRead(notificationId: string) {
    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId)
      .select()
      .single()
    return { data, error }
  },

  // Mark all as read
  async markAllAsRead() {
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData.user?.id

    if (!userId) throw new Error('Not authenticated')

    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
    return { error }
  },

  // Get unread count
  async getUnreadCount() {
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData.user?.id

    if (!userId) throw new Error('Not authenticated')

    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false)
    return { count, error }
  },

  // Delete notification
  async deleteNotification(notificationId: string) {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId)
    return { error }
  },
}
