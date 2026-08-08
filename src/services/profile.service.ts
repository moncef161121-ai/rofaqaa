import { supabase } from '@/lib/supabase'
import type { UserProfile } from '@/types/models'

export const profileService = {
  // Get profile by ID
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  // Get multiple profiles
  async getProfiles(userIds: string[]) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .in('id', userIds)
    return { data, error }
  },

  // Update profile
  async updateProfile(userId: string, updates: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    return { data, error }
  },

  // Search profiles
  async searchProfiles(query: string, limit: number = 20) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .or(
        `username.ilike.%${query}%,display_name.ilike.%${query}%,school.ilike.%${query}%,university.ilike.%${query}%,city.ilike.%${query}%`
      )
      .limit(limit)
    return { data, error }
  },

  // Set online status
  async setOnlineStatus(userId: string, isOnline: boolean) {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        is_online: isOnline,
        last_seen: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single()
    return { data, error }
  },
}
