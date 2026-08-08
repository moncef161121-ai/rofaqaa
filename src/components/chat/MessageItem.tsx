'use client'

import { Fragment } from 'react'
import { Message } from '@/types/models'
import { formatTime } from '@/utils/date'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { MoreVertical, Copy, Reply, Trash } from 'lucide-react'

interface MessageItemProps {
  message: Message
  isOwn: boolean
  senderProfile?: any
  onReply?: (message: Message) => void
  onEdit?: (message: Message) => void
  onDelete?: (messageId: string) => void
}

export const MessageItem = ({
  message,
  isOwn,
  senderProfile,
  onReply,
  onEdit,
  onDelete,
}: MessageItemProps) => {
  return (
    <div className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}>
      {!isOwn && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={senderProfile?.avatar_url} alt={senderProfile?.display_name} />
          <AvatarFallback>{senderProfile?.display_name?.charAt(0)}</AvatarFallback>
        </Avatar>
      )}

      <div className={`flex-1 ${isOwn ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        {!isOwn && <p className="text-xs font-semibold text-gray-600">{senderProfile?.display_name}</p>}

        <div
          className={`rounded-lg px-4 py-2 max-w-xs ${
            isOwn ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
          }`}
        >
          {message.is_deleted ? (
            <p className="text-xs italic opacity-70">Message deleted</p>
          ) : (
            <Fragment>
              <p className="text-sm">{message.content}</p>
              {message.is_edited && <p className="text-xs opacity-70 mt-1">(edited)</p>}
            </Fragment>
          )}
        </div>

        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-500">{formatTime(message.created_at)}</p>
          {message.read_at && <p className="text-xs text-gray-500">✓✓</p>}
          {message.delivered_at && !message.read_at && <p className="text-xs text-gray-500">✓</p>}
        </div>
      </div>

      {isOwn && (
        <div className="flex gap-1">
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(message.id)}
              className="h-6 w-6 p-0"
            >
              <Trash className="h-3 w-3" />
            </Button>
          )}
          {onReply && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onReply(message)}
              className="h-6 w-6 p-0"
            >
              <Reply className="h-3 w-3" />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
