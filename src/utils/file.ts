// Format file size
export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

// Check if file is image
export const isImageFile = (mimeType: string) => {
  return mimeType.startsWith('image/')
}

// Check if file is PDF
export const isPdfFile = (mimeType: string) => {
  return mimeType === 'application/pdf'
}

// Validate file size
export const isValidFileSize = (size: number, maxSize: number = 50 * 1024 * 1024) => {
  return size <= maxSize
}
