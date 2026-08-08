import { supabase } from '@/lib/supabase'

export const attachmentService = {
  // Upload file
  async uploadFile(file: File, folder: string = 'attachments') {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    const { data, error } = await supabase.storage
      .from('rofaqaa')
      .upload(filePath, file)

    if (error) return { data: null, error }

    const { data: urlData } = supabase.storage
      .from('rofaqaa')
      .getPublicUrl(filePath)

    return { data: urlData.publicUrl, error: null }
  },

  // Delete file
  async deleteFile(filePath: string) {
    const { error } = await supabase.storage
      .from('rofaqaa')
      .remove([filePath])
    return { error }
  },

  // Create attachment record
  async createAttachment(messageId: string | null, groupMessageId: string | null, file: File, fileUrl: string) {
    const { data, error } = await supabase
      .from('attachments')
      .insert({
        message_id: messageId,
        group_message_id: groupMessageId,
        file_name: file.name,
        file_url: fileUrl,
        file_type: file.type,
        file_size: file.size,
      })
      .select()
      .single()
    return { data, error }
  },

  // Get attachments for message
  async getMessageAttachments(messageId: string) {
    const { data, error } = await supabase
      .from('attachments')
      .select('*')
      .eq('message_id', messageId)
    return { data, error }
  },

  // Get attachments for group message
  async getGroupMessageAttachments(groupMessageId: string) {
    const { data, error } = await supabase
      .from('attachments')
      .select('*')
      .eq('group_message_id', groupMessageId)
    return { data, error }
  },
}
