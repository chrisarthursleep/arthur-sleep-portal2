import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Arthur Sleep - My Portal',
  description: 'Your personal journey to bespoke luxury footwear',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB">
      <body className={inter.className}>
        <div className="min-h-screen bg-stone-50">
          {children}
        </div>
      </body>
    </html>
  )
}