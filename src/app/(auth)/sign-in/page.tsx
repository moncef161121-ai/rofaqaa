'use client'

import { SignInForm } from '@/components/auth/SignInForm'

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] py-10">
      <SignInForm />
    </div>
  )
}
