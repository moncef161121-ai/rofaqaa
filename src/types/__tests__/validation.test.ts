import { SignInSchema, SignUpSchema, UpdateProfileSchema } from '@/types/validation'

describe('Validation Schemas', () => {
  describe('SignInSchema', () => {
    it('validates correct sign in data', () => {
      const data = {
        email: 'user@example.com',
        password: 'password123',
      }
      const result = SignInSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('rejects invalid email', () => {
      const data = {
        email: 'invalid',
        password: 'password123',
      }
      const result = SignInSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects missing password', () => {
      const data = {
        email: 'user@example.com',
        password: '',
      }
      const result = SignInSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })

  describe('SignUpSchema', () => {
    it('validates correct sign up data', () => {
      const data = {
        email: 'user@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      }
      const result = SignUpSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('rejects mismatched passwords', () => {
      const data = {
        email: 'user@example.com',
        password: 'password123',
        confirmPassword: 'different',
      }
      const result = SignUpSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('rejects short password', () => {
      const data = {
        email: 'user@example.com',
        password: 'short',
        confirmPassword: 'short',
      }
      const result = SignUpSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })

  describe('UpdateProfileSchema', () => {
    it('validates profile updates', () => {
      const data = {
        username: 'newuser',
        display_name: 'New User',
        bio: 'My bio',
      }
      const result = UpdateProfileSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('rejects username too short', () => {
      const data = {
        username: 'ab',
        display_name: 'User',
      }
      const result = UpdateProfileSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })
})
