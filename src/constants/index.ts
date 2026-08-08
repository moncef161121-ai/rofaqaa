// Auth constants
export const AUTH_ROUTES = {
  SIGN_IN: '/auth/sign-in',
  SIGN_UP: '/auth/sign-up',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  CALLBACK: '/auth/callback',
} as const

export const PROTECTED_ROUTES = [
  '/dashboard',
  '/profile',
  '/chat',
  '/groups',
  '/friends',
  '/notifications',
] as const

// UI constants
export const PAGINATION_LIMIT = 20
export const INFINITE_SCROLL_LIMIT = 30

// Message limits
export const MAX_MESSAGE_LENGTH = 5000
export const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

// Supported file types
export const ALLOWED_FILE_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  file: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
} as const

// Education levels
export const EDUCATION_LEVELS = [
  'Primary School',
  'Middle School',
  'High School',
  'Bachelor',
  'Master',
  'PhD',
] as const

// Languages
export const SUPPORTED_LANGUAGES = [
  'Arabic',
  'English',
  'French',
  'Spanish',
  'German',
  'Chinese',
] as const

// Moroccan cities
export const MOROCCAN_CITIES = [
  'Casablanca',
  'Fes',
  'Tangier',
  'Marrakech',
  'Agadir',
  'Meknes',
  'Rabat',
  'Sale',
  'Oujda',
  'Kenitra',
  'Tetouan',
  'Safi',
  'El Jadida',
  'Nador',
  'Taza',
  'Azemmour',
  'Arsilah',
  'Taroudant',
  'Midelt',
  'Ifrane',
] as const

// Notification types
export const NOTIFICATION_TYPES = {
  FRIEND_REQUEST: 'friend_request',
  MESSAGE: 'message',
  MENTION: 'mention',
  GROUP_INVITE: 'group_invite',
} as const
