import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(
  request: NextRequest,
  { params }: { params: { groupId: string } }
) {
  try {
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData.user?.id

    if (!userId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Check if user is member of group
    const { data: member } = await supabase
      .from('group_members')
      .select('id')
      .eq('group_id', params.groupId)
      .eq('user_id', userId)
      .single()

    if (!member) {
      return NextResponse.json(
        { error: 'Not a group member' },
        { status: 401 }
      )
    }

    const { userId: newMemberId } = await request.json()

    // Add member to group
    const { data, error } = await supabase
      .from('group_members')
      .insert({
        group_id: params.groupId,
        user_id: newMemberId,
        role: 'member',
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add member' },
      { status: 500 }
    )
  }
}
