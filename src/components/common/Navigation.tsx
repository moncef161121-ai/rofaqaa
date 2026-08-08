'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '@/stores/auth.store'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

export const Navigation = () => {
  const [open, setOpen] = useState(false)
  const { user } = useAuthStore()
  const { signOut } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    router.push('/auth/sign-in')
  }

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-2xl text-primary-500">
            Rofaqaa
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Link href="/chat">
                  <Button variant="ghost">Messages</Button>
                </Link>
                <Link href="/friends">
                  <Button variant="ghost">Friends</Button>
                </Link>
                <Link href="/profile">
                  <Button variant="ghost">Profile</Button>
                </Link>
                <Button onClick={handleLogout} variant="outline">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/sign-in">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link href="/auth/sign-up">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {open && (
          <div className="md:hidden pb-4 space-y-2">
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Dashboard
                  </Button>
                </Link>
                <Link href="/chat" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Messages
                  </Button>
                </Link>
                <Link href="/friends" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Friends
                  </Button>
                </Link>
                <Link href="/profile" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Profile
                  </Button>
                </Link>
                <Button onClick={handleLogout} variant="outline" className="w-full">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/sign-in" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/sign-up" onClick={() => setOpen(false)}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
