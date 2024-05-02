import React from 'react'

import ConnectSocket from '@/components/connect-socket'

export default function GameLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ConnectSocket>{children}</ConnectSocket>
}
