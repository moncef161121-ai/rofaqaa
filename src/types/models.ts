export type UserProfile = {
  id: string
  username: string
  display_name: string
  avatar_url?: string
  banner_url?: string
  bio?: string
  school?: string
  university?: string
  education_level?: string
  city?: string
  country?: string
  languages?: string[]
  is_online: boolean
  last_seen?: string
  created_at: string
  updated_at: string
}

export type FriendRequest = {
  id: string
  sender_id: string
  receiver_id: string
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled'
  created_at: string
  updated_at: string
}

export type Message = {
  id: string
  chat_id: string
  sender_id: string
  content: string
  message_type: 'text' | 'image' | 'file' | 'emoji'
  replied_to_id?: string
  is_edited: boolean
  is_deleted: boolean
  is_pinned: boolean
  read_at?: string
  delivered_at?: string
  created_at: string
  updated_at: string
}

export type Chat = {
  id: string
  user_id_1: string
  user_id_2: string
  last_message_at?: string
  created_at: string
  updated_at: string
}

export type Group = {
  id: string
  name: string
  description?: string
  avatar_url?: string
  owner_id: string
  created_at: string
  updated_at: string
}

export type GroupMember = {
  id: string
  group_id: string
  user_id: string
  role: 'owner' | 'admin' | 'member'
  joined_at: string
}

export type GroupMessage = {
  id: string
  group_id: string
  sender_id: string
  content: string
  message_type: 'text' | 'image' | 'file' | 'emoji'
  replied_to_id?: string
  is_edited: boolean
  is_deleted: boolean
  is_pinned: boolean
  created_at: string
  updated_at: string
}

export type Notification = {
  id: string
  user_id: string
  type: 'friend_request' | 'message' | 'mention' | 'group_invite'
  related_user_id?: string
  related_id?: string
  title: string
  message: string
  is_read: boolean
  created_at: string
}

export type Attachment = {
  id: string
  message_id?: string
  group_message_id?: string
  file_name: string
  file_url: string
  file_type: string
  file_size: number
  created_at: string
}
