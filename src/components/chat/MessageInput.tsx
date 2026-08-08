'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Paperclip, Smile } from 'lucide-react'
import { useState } from 'react'
import { useSendMessage } from '@/hooks/useChat'
import { toast } from 'sonner'

interface MessageInputProps {
  chatId: string
  onMessageSent?: () => void
}

export const MessageInput = ({ chatId, onMessageSent }: MessageInputProps) => {
  const [message, setMessage] = useState('')
  const sendMessageMutation = useSendMessage()

  const handleSend = async () => {
    if (!message.trim()) return

    try {
      await sendMessageMutation.mutateAsync({
        chatId,
        content: message,
        messageType: 'text',
      })
      setMessage('')
      onMessageSent?.()
    } catch (error: any) {
      toast.error('Failed to send message')
    }
  }

  return (
    <div className="flex gap-2 items-center p-4 border-t dark:border-gray-700">
      <Button variant="ghost" size="icon" className="h-10 w-10">
        <Paperclip className="h-5 w-5" />
      </Button>

      <Input
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
          }
        }}
        className="flex-1"
        disabled={sendMessageMutation.isPending}
      />

      <Button variant="ghost" size="icon" className="h-10 w-10">
        <Smile className="h-5 w-5" />
      </Button>

      <Button
        onClick={handleSend}
        disabled={!message.trim() || sendMessageMutation.isPending}
        className="h-10 w-10 p-0"
      >
        <Send className="h-5 w-5" />
      </Button>
    </div>
  )
}
