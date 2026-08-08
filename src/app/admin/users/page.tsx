'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AdminUsersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-8">Users Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Active Users</CardTitle>
          <CardDescription>Browse and manage all registered users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-gray-500 py-8 text-center">
            <p>No users to display</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
