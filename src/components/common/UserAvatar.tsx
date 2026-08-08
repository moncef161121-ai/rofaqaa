'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatRelativeTime } from '@/utils/date'
import type { UserProfile } from '@/types/models'

interface UserAvatarProps {
  profile: UserProfile
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
}

export const UserAvatar = ({ profile, size = 'md' }: UserAvatarProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Avatar className={sizeClasses[size]}>
          <AvatarImage src={profile.avatar_url || ''} alt={profile.display_name} />
          <AvatarFallback>{profile.display_name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        {profile.is_online && (
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
        )}
      </div>
      <div className="flex-1">
        <p className="font-semibold">{profile.display_name}</p>
        <p className="text-xs text-gray-500">
          {profile.is_online ? 'Online' : `Last seen ${formatRelativeTime(profile.last_seen || new Date())}`}
        </p>
      </div>
    </div>
  )
}
