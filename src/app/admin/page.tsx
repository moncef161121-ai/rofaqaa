'use client'

import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const { user } = useAuth()
  const router = useRouter()

  // Check if user is admin (you would implement proper admin check)
  const isAdmin = false

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You do not have permission to access this area</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Users', value: '0', color: 'bg-blue-100 dark:bg-blue-900' },
          { label: 'Active Users', value: '0', color: 'bg-green-100 dark:bg-green-900' },
          { label: 'Pending Reports', value: '0', color: 'bg-yellow-100 dark:bg-yellow-900' },
          { label: 'Banned Users', value: '0', color: 'bg-red-100 dark:bg-red-900' },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage user accounts and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => router.push('/admin/users')}>View Users</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
            <CardDescription>Review and manage user reports</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => router.push('/admin/reports')}>View Reports</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
            <CardDescription>Moderate messages and groups</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => router.push('/admin/content')}>Manage Content</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Configure system settings</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => router.push('/admin/settings')}>Go to Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
