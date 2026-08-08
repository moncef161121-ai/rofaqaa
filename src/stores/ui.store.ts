import { create } from 'zustand'

interface UIStore {
  isDarkMode: boolean
  language: 'en' | 'ar' | 'fr'
  sidebarOpen: boolean
  setDarkMode: (isDark: boolean) => void
  setLanguage: (lang: 'en' | 'ar' | 'fr') => void
  setSidebarOpen: (open: boolean) => void
}

export const useUIStore = create<UIStore>((set) => ({
  isDarkMode: true,
  language: 'en',
  sidebarOpen: true,

  setDarkMode: (isDark) => set({ isDarkMode: isDark }),
  setLanguage: (lang) => set({ language: lang }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}))
