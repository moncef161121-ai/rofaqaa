// Sanitize HTML to prevent XSS
export const sanitizeHTML = (html: string) => {
  const div = document.createElement('div')
  div.textContent = html
  return div.innerHTML
}

// Escape special characters
export const escapeSpecialChars = (str: string) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Validate email
export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate username
export const isValidUsername = (username: string) => {
  return username.length >= 3 && username.length <= 20 && /^[a-zA-Z0-9_-]+$/.test(username)
}
