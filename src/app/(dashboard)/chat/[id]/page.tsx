'use client'

import { useChat, useChatMessages } from '@/hooks/useChat'
import { MessageItem } from '@/components/chat/MessageItem'
import { MessageInput } from '@/components/chat/MessageInput'
import { Card, CardContent } from '@/components/ui/card'
import { useParams } from 'next/navigation'

export default function ChatPage() {
  const params = useParams()
  const chatId = params.id as string
  const { data: chat } = useChat(chatId)
  const { data: messages } = useChatMessages(chatId)

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      {/* Header */}
      <div className="border-b dark:border-gray-800 p-4 bg-white dark:bg-gray-950">
        <h2 className="font-semibold text-lg">Chat</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.data && messages.data.length > 0 ? (
          messages.data.map((message: any) => (
            <MessageItem key={message.id} message={message} isOwn={false} />
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>No messages yet. Start the conversation!</p>
          </div>
        )}
      </div>

      {/* Input */}
      <MessageInput chatId={chatId} />
    </div>
  )
}
