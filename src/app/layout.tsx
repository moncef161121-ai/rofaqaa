import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Providers } from '@/components/providers'
import { Navigation } from '@/components/common/Navigation'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Rofaqaa - Private Social Platform for Moroccan Students',
  description: 'Connect with students in Morocco safely and securely',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#1B4332" />
      </head>
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50">
        <Providers>
          <Navigation />
          <main className="min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
