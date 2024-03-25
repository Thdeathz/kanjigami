import type { Metadata } from 'next'
import React from 'react'

import './globals.css'
import './fonts.css'
import './colors.css'
import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/navbar'
import Sidebar from '@/components/layout/sidebar'
import Providers from '@/components/providers'

export const metadata: Metadata = {
  title: '漢字ガミ',
  description: '⚔️ 漢字ガミー Learn kanji through games'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="flex h-screen w-screen overflow-y-auto bg-default-bg text-default-text">
            <Sidebar />

            <div className="h-max w-0 shrink grow">
              <Navbar />

              {children}

              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
