import type { Metadata } from 'next'
import { Providers } from '@/components/providers/Providers'
import { Navigation } from '@/components/common/Navigation'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Rofaqaa - Private Social Platform for Moroccan Students',
  description: 'Connect with students in Morocco safely and securely',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50">
        <Providers>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
