import { create } from 'zustand'
import { supabase } from '@/lib/supabase'

interface AuthStore {
  user: any | null
  isLoading: boolean
  setUser: (user: any | null) => void
  setLoading: (loading: boolean) => void
  initializeAuth: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,

  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),

  initializeAuth: async () => {
    try {
      const { data, error } = await supabase.auth.getUser()
      if (!error && data.user) {
        set({ user: data.user, isLoading: false })
      } else {
        set({ user: null, isLoading: false })
      }
    } catch (error) {
      set({ user: null, isLoading: false })
    }
  },
}))
