'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/stores/auth.store'
import { useRouter, usePathname } from 'next/navigation'
import { AUTH_ROUTES, PROTECTED_ROUTES } from '@/constants'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isLoading } = useAuthStore()

  useEffect(() => {
    if (!isLoading && !user) {
      // Check if trying to access protected route
      const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route))
      if (isProtectedRoute) {
        router.push(AUTH_ROUTES.SIGN_IN)
      }
    }
  }, [user, isLoading, pathname, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  return children
}
