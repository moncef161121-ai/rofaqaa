import { z } from 'zod'

export const SignUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export const SignInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const UpdateProfileSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(20, 'Username must be at most 20 characters'),
  display_name: z.string().min(1, 'Display name is required').max(50, 'Display name must be at most 50 characters'),
  bio: z.string().max(500, 'Bio must be at most 500 characters').optional(),
  school: z.string().optional(),
  university: z.string().optional(),
  education_level: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  languages: z.array(z.string()).optional(),
})

export const CreateMessageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty').max(5000, 'Message is too long'),
  message_type: z.enum(['text', 'image', 'file', 'emoji']).default('text'),
  replied_to_id: z.string().optional(),
})

export const CreateGroupSchema = z.object({
  name: z.string().min(1, 'Group name is required').max(100, 'Group name is too long'),
  description: z.string().max(500, 'Description is too long').optional(),
})

export const CreateReportSchema = z.object({
  report_type: z.enum(['user', 'message', 'group']),
  reason: z.string().min(1, 'Reason is required'),
  description: z.string().max(1000, 'Description is too long').optional(),
  reported_id: z.string().optional(),
})

export type SignUpInput = z.infer<typeof SignUpSchema>
export type SignInInput = z.infer<typeof SignInSchema>
export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>
export type CreateMessageInput = z.infer<typeof CreateMessageSchema>
export type CreateGroupInput = z.infer<typeof CreateGroupSchema>
export type CreateReportInput = z.infer<typeof CreateReportSchema>
