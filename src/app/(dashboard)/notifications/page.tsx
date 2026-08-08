'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNotifications, useMarkAllAsRead } from '@/hooks/useNotification'
import { Badge } from '@/components/ui/badge'

export default function NotificationsPage() {
  const { data: notifications } = useNotifications()
  const markAllAsReadMutation = useMarkAllAsRead()

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Notifications</h1>
        {notifications?.data && notifications.data.some((n: any) => !n.is_read) && (
          <Button
            variant="outline"
            onClick={() => markAllAsReadMutation.mutate()}
            disabled={markAllAsReadMutation.isPending}
          >
            Mark all as read
          </Button>
        )}
      </div>

      {notifications?.data && notifications.data.length > 0 ? (
        <div className="space-y-3">
          {notifications.data.map((notification: any) => (
            <Card
              key={notification.id}
              className={notification.is_read ? 'opacity-60' : ''}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{notification.title}</CardTitle>
                  {!notification.is_read && (
                    <Badge className="bg-primary-500">New</Badge>
                  )}
                </div>
                <CardDescription>{notification.message}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-10 text-center">
            <p className="text-gray-500">No notifications yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
