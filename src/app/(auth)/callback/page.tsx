'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/auth.store'
import { authService } from '@/services/auth.service'

export default function AuthCallbackPage() {
  const router = useRouter()
  const { setUser } = useAuthStore()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data, error } = await authService.getCurrentUser()
        if (error) throw error
        setUser(data)
        router.push('/dashboard')
      } catch (error) {
        console.error('Auth callback error:', error)
        router.push('/auth/sign-in')
      }
    }

    handleCallback()
  }, [router, setUser])

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
      <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full" />
    </div>
  )
}
