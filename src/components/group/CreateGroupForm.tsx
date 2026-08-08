'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateGroupSchema } from '@/types/validation'
import { useCreateGroup } from '@/hooks/useGroup'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type CreateGroupInputs = {
  name: string
  description?: string
}

export const CreateGroupForm = () => {
  const router = useRouter()
  const createGroupMutation = useCreateGroup()
  const { register, handleSubmit, formState: { errors } } = useForm<CreateGroupInputs>({
    resolver: zodResolver(CreateGroupSchema),
  })

  const onSubmit = async (data: CreateGroupInputs) => {
    try {
      await createGroupMutation.mutateAsync(data)
      toast.success('Group created successfully')
      router.push('/groups')
    } catch (error: any) {
      toast.error(error.message || 'Failed to create group')
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create New Group</CardTitle>
        <CardDescription>Start a conversation with multiple people</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Group Name</Label>
            <Input id="name" {...register('name')} />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" {...register('description')} />
          </div>

          <Button type="submit" className="w-full" disabled={createGroupMutation.isPending}>
            {createGroupMutation.isPending ? 'Creating...' : 'Create Group'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
