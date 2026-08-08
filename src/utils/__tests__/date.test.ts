import { formatDate, formatTime, formatRelativeTime } from '@/utils/date'

describe('Date Utils', () => {
  it('formats date correctly', () => {
    const date = new Date('2024-01-15')
    const result = formatDate(date)
    expect(result).toContain('Jan')
    expect(result).toContain('15')
  })

  it('formats time correctly', () => {
    const date = new Date('2024-01-15T14:30:00')
    const result = formatTime(date)
    expect(result).toContain('14')
    expect(result).toContain('30')
  })

  it('formats relative time for recent messages', () => {
    const now = new Date()
    const result = formatRelativeTime(now)
    expect(result).toBe('just now')
  })

  it('formats relative time for old messages', () => {
    const date = new Date()
    date.setHours(date.getHours() - 2)
    const result = formatRelativeTime(date)
    expect(result).toContain('h ago')
  })
})
