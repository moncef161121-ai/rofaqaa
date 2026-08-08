'use client'

import { UserSearch } from '@/components/search/UserSearch'
import { useFriendsList, useFriendRequests } from '@/hooks/useFriend'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function FriendsPage() {
  const router = useRouter()
  const { data: friendsList } = useFriendsList()
  const { data: friendRequests } = useFriendRequests()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid md:grid-cols-4 gap-6">
        {/* Search */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Find Friends</CardTitle>
              <CardDescription>Search for students by username, school, or location</CardDescription>
            </CardHeader>
            <CardContent>
              <UserSearch onSelectUser={(userId) => router.push(`/profile/${userId}`)} />
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Friend Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{friendRequests?.data?.length || 0}</p>
              <p className="text-sm text-gray-500">Pending requests</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Friends</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{friendsList?.data?.length || 0}</p>
              <p className="text-sm text-gray-500">Total friends</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
