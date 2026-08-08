import { supabase } from '@/lib/supabase'

export const groupService = {
  // Create group
  async createGroup(name: string, description?: string) {
    const { data: userData } = await supabase.auth.getUser()
    const ownerId = userData.user?.id

    if (!ownerId) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('groups')
      .insert({
        name,
        description,
        owner_id: ownerId,
      })
      .select()
      .single()

    if (error) return { data, error }

    // Add owner as member
    await supabase.from('group_members').insert({
      group_id: data.id,
      user_id: ownerId,
      role: 'owner',
    })

    return { data, error: null }
  },

  // Get group
  async getGroup(groupId: string) {
    const { data, error } = await supabase
      .from('groups')
      .select('*')
      .eq('id', groupId)
      .single()
    return { data, error }
  },

  // Get user groups
  async getUserGroups() {
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData.user?.id

    if (!userId) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('group_members')
      .select('group_id')
      .eq('user_id', userId)
    return { data, error }
  },

  // Update group
  async updateGroup(groupId: string, updates: any) {
    const { data, error } = await supabase
      .from('groups')
      .update(updates)
      .eq('id', groupId)
      .select()
      .single()
    return { data, error }
  },

  // Delete group
  async deleteGroup(groupId: string) {
    const { error } = await supabase
      .from('groups')
      .delete()
      .eq('id', groupId)
    return { error }
  },

  // Add member to group
  async addGroupMember(groupId: string, userId: string, role: string = 'member') {
    const { data, error } = await supabase
      .from('group_members')
      .insert({
        group_id: groupId,
        user_id: userId,
        role,
      })
      .select()
      .single()
    return { data, error }
  },

  // Remove member from group
  async removeGroupMember(groupId: string, userId: string) {
    const { error } = await supabase
      .from('group_members')
      .delete()
      .eq('group_id', groupId)
      .eq('user_id', userId)
    return { error }
  },

  // Get group members
  async getGroupMembers(groupId: string) {
    const { data, error } = await supabase
      .from('group_members')
      .select('*')
      .eq('group_id', groupId)
    return { data, error }
  },
}
