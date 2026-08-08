# API Documentation

## Authentication

### Sign Up

```typescript
POST /api/auth/signup

Request:
{
  email: string
  password: string
}

Response:
{
  user: User
  session: Session
}
```

### Sign In

```typescript
POST /api/auth/signin

Request:
{
  email: string
  password: string
}

Response:
{
  user: User
  session: Session
}
```

### Sign Out

```typescript
POST /api/auth/signout

Response:
{
  success: boolean
}
```

## Profiles

### Get Profile

```typescript
GET /api/profiles/:userId

Response:
{
  id: string
  username: string
  display_name: string
  avatar_url?: string
  bio?: string
  school?: string
  university?: string
  is_online: boolean
  last_seen?: string
}
```

### Update Profile

```typescript
PUT /api/profiles/:userId

Request:
{
  display_name?: string
  bio?: string
  school?: string
  university?: string
  city?: string
  country?: string
  languages?: string[]
}

Response:
{
  success: boolean
  profile: Profile
}
```

### Search Profiles

```typescript
GET /api/profiles/search?q=query

Response:
[
  {
    id: string
    username: string
    display_name: string
    avatar_url?: string
  }
]
```

## Friends

### Send Friend Request

```typescript
POST /api/friends/requests

Request:
{
  receiver_id: string
}

Response:
{
  success: boolean
  request: FriendRequest
}
```

### Accept Friend Request

```typescript
POST /api/friends/requests/:requestId/accept

Response:
{
  success: boolean
}
```

### Get Friend List

```typescript
GET /api/friends

Response:
[
  {
    id: string
    friend_id: string
    created_at: string
  }
]
```

## Chats

### Get Chat List

```typescript
GET /api/chats

Response:
[
  {
    id: string
    user_id_1: string
    user_id_2: string
    last_message_at?: string
  }
]
```

### Get Chat Messages

```typescript
GET /api/chats/:chatId/messages?limit=50

Response:
[
  {
    id: string
    content: string
    sender_id: string
    created_at: string
    read_at?: string
  }
]
```

### Send Message

```typescript
POST /api/messages

Request:
{
  chat_id: string
  content: string
  message_type: 'text' | 'image' | 'file'
}

Response:
{
  success: boolean
  message: Message
}
```

## Groups

### Create Group

```typescript
POST /api/groups

Request:
{
  name: string
  description?: string
}

Response:
{
  success: boolean
  group: Group
}
```

### Get Group Messages

```typescript
GET /api/groups/:groupId/messages

Response:
[
  {
    id: string
    content: string
    sender_id: string
    created_at: string
  }
]
```

## Realtime Subscriptions

### Messages

```typescript
supabase
  .channel(`chat:${chatId}`)
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'messages', filter: `chat_id=eq.${chatId}` },
    (payload) => handleMessageUpdate(payload)
  )
  .subscribe()
```

### Notifications

```typescript
supabase
  .channel(`notifications:${userId}`)
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${userId}` },
    (payload) => handleNotification(payload)
  )
  .subscribe()
```

## Rate Limiting

All API endpoints are rate limited:
- Authentication: 5 requests per minute
- Messages: 30 requests per minute
- Profile: 10 requests per minute

## Error Handling

All errors return consistent format:

```typescript
{
  success: false
  error: {
    code: string
    message: string
    details?: Record<string, any>
  }
}
```

Common error codes:
- `UNAUTHORIZED` - Not authenticated
- `FORBIDDEN` - Not authorized
- `NOT_FOUND` - Resource not found
- `INVALID_INPUT` - Validation error
- `RATE_LIMITED` - Too many requests
- `INTERNAL_ERROR` - Server error
