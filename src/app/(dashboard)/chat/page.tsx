'use client'

import { useChatsList } from '@/hooks/useChat'
import { ChatListItem } from '@/components/chat/ChatListItem'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ChatListPage() {
  const router = useRouter()
  const { data: chats } = useChatsList()

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Messages</h1>
        <Button onClick={() => router.push('/friends')} className="gap-2">
          <Plus className="h-5 w-5" />
          New Chat
        </Button>
      </div>

      {chats?.data && chats.data.length > 0 ? (
        <div className="space-y-2">
          {chats.data.map((chat: any) => (
            <ChatListItem
              key={chat.id}
              id={chat.id}
              name="User"
              lastMessage="Last message preview"
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-10 text-center">
            <p className="text-gray-500 mb-4">No conversations yet</p>
            <Button onClick={() => router.push('/friends')}>Start a conversation</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
