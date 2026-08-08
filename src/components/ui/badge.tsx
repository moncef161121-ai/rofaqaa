'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}

const badgeVariants = (variant: string) => {
  switch (variant) {
    case 'secondary':
      return 'border-transparent bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50'
    case 'destructive':
      return 'border-transparent bg-red-500 text-white dark:bg-red-600'
    case 'outline':
      return 'text-gray-950 dark:text-gray-50'
    default:
      return 'border-transparent bg-primary-500 text-white dark:bg-primary-600'
  }
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>((
  { className, variant = 'default', ...props },
  ref
) => (
  <div
    ref={ref}
    className={cn(
      'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
      badgeVariants(variant),
      className
    )}
    {...props}
  />
))
Badge.displayName = 'Badge'

export { Badge }
