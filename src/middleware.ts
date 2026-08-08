import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_REQUESTS = 30 // 30 requests per minute

const requestCounts = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(key: string): boolean {
  const now = Date.now()
  const record = requestCounts.get(key)

  if (!record || now > record.resetTime) {
    requestCounts.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT_REQUESTS) {
    return false
  }

  record.count++
  return true
}

export async function middleware(request: NextRequest) {
  const ip = request.ip || 'unknown'
  const key = `${ip}:${request.nextUrl.pathname}`

  if (!checkRateLimit(key)) {
    return new NextResponse('Too many requests', { status: 429 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
