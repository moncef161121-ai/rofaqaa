'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateProfileSchema } from '@/types/validation'
import { useProfile, useProfileUpdate } from '@/hooks/useProfile'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'

type UpdateProfileInputs = {
  username: string
  display_name: string
  bio?: string
  school?: string
  university?: string
  education_level?: string
  city?: string
  country?: string
}

export const ProfileForm = () => {
  const { user } = useAuth()
  const { data: profile } = useProfile(user?.id)
  const updateProfileMutation = useProfileUpdate()

  const { register, handleSubmit, formState: { errors } } = useForm<UpdateProfileInputs>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: profile,
  })

  const onSubmit = async (data: UpdateProfileInputs) => {
    try {
      if (!user?.id) throw new Error('Not authenticated')
      await updateProfileMutation.mutateAsync({
        userId: user.id,
        updates: data,
      })
      toast.success('Profile updated successfully')
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>Update your profile information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" {...register('username')} />
            {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="display_name">Display Name</Label>
            <Input id="display_name" {...register('display_name')} />
            {errors.display_name && (
              <p className="text-sm text-red-500">{errors.display_name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Input id="bio" {...register('bio')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="school">School</Label>
            <Input id="school" {...register('school')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="university">University</Label>
            <Input id="university" {...register('university')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" {...register('city')} />
          </div>

          <Button type="submit" disabled={updateProfileMutation.isPending}>
            {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
