'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface ChatListItemProps {
  id: string
  avatar?: string
  name: string
  lastMessage?: string
  unreadCount?: number
  isActive?: boolean
}

export const ChatListItem = ({
  id,
  avatar,
  name,
  lastMessage,
  unreadCount,
  isActive,
}: ChatListItemProps) => {
  const router = useRouter()

  return (
    <Button
      variant={isActive ? 'default' : 'ghost'}
      className="w-full justify-start h-auto py-3 px-4"
      onClick={() => router.push(`/chat/${id}`)}
    >
      <div className="flex items-center gap-3 flex-1 text-left">
        <Avatar>
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm">{name}</p>
          <p className="text-xs text-gray-500 truncate">{lastMessage}</p>
        </div>
        {unreadCount && unreadCount > 0 && (
          <div className="h-5 w-5 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center">
            {unreadCount}
          </div>
        )}
      </div>
    </Button>
  )
}
