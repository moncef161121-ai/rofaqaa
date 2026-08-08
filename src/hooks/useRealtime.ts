'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { RealtimeChannel } from '@supabase/supabase-js'

export const useRealtimeMessages = (chatId: string) => {
  const [channel, setChannel] = useState<RealtimeChannel | null>(null)

  useEffect(() => {
    const messageChannel = supabase.channel(`chat:${chatId}`).on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'messages',
        filter: `chat_id=eq.${chatId}`,
      },
      (payload) => {
        console.log('Message update:', payload)
      }
    ).subscribe()

    setChannel(messageChannel)

    return () => {
      messageChannel.unsubscribe()
    }
  }, [chatId])

  return channel
}

export const useRealtimeNotifications = (userId: string) => {
  const [channel, setChannel] = useState<RealtimeChannel | null>(null)

  useEffect(() => {
    const notificationChannel = supabase
      .channel(`notifications:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          console.log('New notification:', payload)
        }
      )
      .subscribe()

    setChannel(notificationChannel)

    return () => {
      notificationChannel.unsubscribe()
    }
  }, [userId])

  return channel
}

export const useRealtimePresence = (userId: string) => {
  const [channel, setChannel] = useState<RealtimeChannel | null>(null)

  useEffect(() => {
    const presenceChannel = supabase
      .channel('presence')
      .on('presence', { event: 'sync' }, () => {
        console.log('Presence sync')
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('User joined:', newPresences)
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('User left:', leftPresences)
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await presenceChannel.track({
            user_id: userId,
            online_at: new Date().toISOString(),
          })
        }
      })

    setChannel(presenceChannel)

    return () => {
      presenceChannel.unsubscribe()
    }
  }, [userId])

  return channel
}
