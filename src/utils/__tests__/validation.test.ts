import { isValidEmail, isValidUsername, escapeSpecialChars } from '@/utils/validation'

describe('Validation Utils', () => {
  describe('isValidEmail', () => {
    it('validates correct emails', () => {
      expect(isValidEmail('user@example.com')).toBe(true)
      expect(isValidEmail('test.email@domain.co.uk')).toBe(true)
    })

    it('rejects invalid emails', () => {
      expect(isValidEmail('invalid')).toBe(false)
      expect(isValidEmail('user@')).toBe(false)
      expect(isValidEmail('@example.com')).toBe(false)
    })
  })

  describe('isValidUsername', () => {
    it('validates correct usernames', () => {
      expect(isValidUsername('validuser')).toBe(true)
      expect(isValidUsername('user123')).toBe(true)
      expect(isValidUsername('user_name')).toBe(true)
    })

    it('rejects invalid usernames', () => {
      expect(isValidUsername('ab')).toBe(false)
      expect(isValidUsername('a'.repeat(21))).toBe(false)
      expect(isValidUsername('user name')).toBe(false)
      expect(isValidUsername('user@name')).toBe(false)
    })
  })

  describe('escapeSpecialChars', () => {
    it('escapes HTML special characters', () => {
      expect(escapeSpecialChars('<script>alert("xss")</script>')).toContain('&lt;')
      expect(escapeSpecialChars('"quote"')).toContain('&quot;')
      expect(escapeSpecialChars("'single'")).toContain('&#039;')
    })
  })
})
