'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUpSchema } from '@/types/validation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type SignUpFormInputs = {
  email: string
  password: string
  confirmPassword: string
}

export const SignUpForm = () => {
  const router = useRouter()
  const { signUp, isSigningUp } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormInputs>({
    resolver: zodResolver(SignUpSchema),
  })

  const onSubmit = async (data: SignUpFormInputs) => {
    try {
      await signUp({
        email: data.email,
        password: data.password,
      })
      toast.success('Account created! Please check your email to verify')
      router.push('/auth/sign-in')
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign up')
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>Join Rofaqaa - Connect with Moroccan students</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              disabled={isSigningUp}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              disabled={isSigningUp}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register('confirmPassword')}
              disabled={isSigningUp}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSigningUp}>
            {isSigningUp ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          Already have an account?{' '}
          <Link href="/auth/sign-in" className="text-primary-500 hover:underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
