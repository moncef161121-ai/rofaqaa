'use client'

import { useGroup, useGetGroupMessages, useGetGroupMembers } from '@/hooks/useGroup'
import { MessageItem } from '@/components/chat/MessageItem'
import { MessageInput } from '@/components/chat/MessageInput'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useParams } from 'next/navigation'

export default function GroupChatPage() {
  const params = useParams()
  const groupId = params.id as string
  const { data: group } = useGroup(groupId)
  const { data: messages } = useGetGroupMessages(groupId)
  const { data: members } = useGetGroupMembers(groupId)

  return (
    <div className="h-[calc(100vh-64px)] flex">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b dark:border-gray-800 p-4 bg-white dark:bg-gray-950">
          <h2 className="font-semibold text-lg">{group?.data?.name}</h2>
          <p className="text-sm text-gray-500">{group?.data?.description}</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages?.data && messages.data.length > 0 ? (
            messages.data.map((message: any) => (
              <MessageItem key={message.id} message={message} isOwn={false} />
            ))
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>No messages yet</p>
            </div>
          )}
        </div>

        {/* Input */}
        <MessageInput chatId={groupId} />
      </div>

      {/* Members Sidebar */}
      <div className="w-64 border-l dark:border-gray-800 bg-gray-50 dark:bg-gray-900 overflow-y-auto">
        <Card className="border-0 rounded-0">
          <CardHeader>
            <CardTitle className="text-lg">Members ({members?.data?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {members?.data?.map((member: any) => (
                <div key={member.id} className="text-sm py-2">
                  <p className="font-medium">{member.user_id}</p>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
