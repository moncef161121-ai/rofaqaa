import { supabase } from '@/lib/supabase'

export const reportService = {
  // Create report
  async createReport(reportType: string, reason: string, reportedId?: string, description?: string) {
    const { data: userData } = await supabase.auth.getUser()
    const reporterId = userData.user?.id

    if (!reporterId) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('reports')
      .insert({
        reporter_id: reporterId,
        reported_id: reportedId,
        report_type: reportType,
        reason,
        description,
        status: 'pending',
      })
      .select()
      .single()
    return { data, error }
  },

  // Get reports (admin)
  async getReports(limit: number = 50) {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)
    return { data, error }
  },

  // Update report status
  async updateReportStatus(reportId: string, status: string) {
    const { data, error } = await supabase
      .from('reports')
      .update({ status })
      .eq('id', reportId)
      .select()
      .single()
    return { data, error }
  },
}
