'use client'

import { useUserGroups, useGroup } from '@/hooks/useGroup'
import { CreateGroupForm } from '@/components/group/CreateGroupForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function GroupsPage() {
  const router = useRouter()
  const [showCreateForm, setShowCreateForm] = useState(false)
  const { data: userGroups } = useUserGroups()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Groups</h1>
        <Button onClick={() => setShowCreateForm(!showCreateForm)} className="gap-2">
          <Plus className="h-5 w-5" />
          New Group
        </Button>
      </div>

      {showCreateForm && (
        <div className="mb-8">
          <CreateGroupForm />
        </div>
      )}

      {userGroups?.data && userGroups.data.length > 0 ? (
        <div className="grid gap-4">
          {userGroups.data.map((group: any) => (
            <Card
              key={group.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => router.push(`/groups/${group.id}`)}
            >
              <CardHeader>
                <CardTitle>{group.name}</CardTitle>
                <CardDescription>{group.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-10 text-center">
            <p className="text-gray-500 mb-4">No groups yet</p>
            <Button onClick={() => setShowCreateForm(true)}>Create your first group</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
