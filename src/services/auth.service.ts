import { supabase } from '@/lib/supabase'
import type { UserProfile } from '@/types/models'

export const authService = {
  // Sign up
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    })
    return { data, error }
  },

  // Sign in
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Reset password
  async resetPassword(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
    })
    return { data, error }
  },

  // Update password
  async updatePassword(password: string) {
    const { data, error } = await supabase.auth.updateUser({ password })
    return { data, error }
  },

  // Get current user
  async getCurrentUser() {
    const { data, error } = await supabase.auth.getUser()
    return { data: data.user, error }
  },

  // Get session
  async getSession() {
    const { data, error } = await supabase.auth.getSession()
    return { data: data.session, error }
  },

  // Listen to auth changes
  onAuthStateChange(callback: any) {
    return supabase.auth.onAuthStateChange(callback)
  },
}
