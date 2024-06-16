import type { Metadata, Viewport } from 'next'
import React from 'react'

import './globals.css'
import './fonts.css'
import './colors.css'
import './custom.css'
import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/navbar'
import Sidebar from '@/components/layout/sidebar'
import Providers, { OnlineContentProvider } from '@/components/providers'

const APP_NAME = 'Kanjigami'
const APP_DEFAULT_TITLE = 'Kanjigami'
const APP_TITLE_TEMPLATE = '%s | Kanjigami'
const APP_DESCRIPTION =
  '⚔️ 漢字ガミー Learn Japanese kanji through an engaging, game-based platform. Master kanji characters with interactive lessons, fun challenges, and community support. Perfect for all skill levels, Kanjigami makes learning Japanese kanji an adventure!'

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE
  },
  formatDetection: {
    telephone: false
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  }
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF'
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
          <div className="flex h-screen w-screen overflow-y-auto overflow-x-hidden bg-default-bg text-default-text">
            <Sidebar />

            <div className="relative h-max w-0 shrink grow">
              <Navbar />
              <OnlineContentProvider>{children}</OnlineContentProvider>

              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
