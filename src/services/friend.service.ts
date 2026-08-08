import { supabase } from '@/lib/supabase'

export const friendService = {
  // Send friend request
  async sendFriendRequest(receiverId: string) {
    const { data: userData } = await supabase.auth.getUser()
    const senderId = userData.user?.id

    if (!senderId) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('friend_requests')
      .insert({
        sender_id: senderId,
        receiver_id: receiverId,
        status: 'pending',
      })
      .select()
      .single()
    return { data, error }
  },

  // Accept friend request
  async acceptFriendRequest(requestId: string) {
    const { data: request } = await supabase
      .from('friend_requests')
      .select('sender_id, receiver_id')
      .eq('id', requestId)
      .single()

    if (!request) throw new Error('Request not found')

    // Update request status
    await supabase
      .from('friend_requests')
      .update({ status: 'accepted' })
      .eq('id', requestId)

    // Create friendship
    await supabase.from('friends').insert([
      { user_id: request.sender_id, friend_id: request.receiver_id },
      { user_id: request.receiver_id, friend_id: request.sender_id },
    ])
  },

  // Reject friend request
  async rejectFriendRequest(requestId: string) {
    const { error } = await supabase
      .from('friend_requests')
      .update({ status: 'rejected' })
      .eq('id', requestId)
    return { error }
  },

  // Cancel friend request
  async cancelFriendRequest(requestId: string) {
    const { error } = await supabase
      .from('friend_requests')
      .update({ status: 'cancelled' })
      .eq('id', requestId)
    return { error }
  },

  // Remove friend
  async removeFriend(friendId: string) {
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData.user?.id

    if (!userId) throw new Error('Not authenticated')

    await supabase
      .from('friends')
      .delete()
      .or(`and(user_id.eq.${userId},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${userId})`)

    return { error: null }
  },

  // Get friend requests
  async getFriendRequests() {
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData.user?.id

    if (!userId) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('friend_requests')
      .select('*')
      .eq('receiver_id', userId)
      .eq('status', 'pending')
    return { data, error }
  },

  // Get friends list
  async getFriendsList() {
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData.user?.id

    if (!userId) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('friends')
      .select('friend_id')
      .eq('user_id', userId)
    return { data, error }
  },

  // Get mutual friends
  async getMutualFriends(userId: string) {
    const { data: userData } = await supabase.auth.getUser()
    const currentUserId = userData.user?.id

    if (!currentUserId) throw new Error('Not authenticated')

    const { data, error } = await supabase.rpc('get_mutual_friends', {
      user_id_1: currentUserId,
      user_id_2: userId,
    })
    return { data, error }
  },
}
