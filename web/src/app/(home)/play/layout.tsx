import React from 'react'

import ConnectSocket from '@/components/connect-socket'
import Underlay from '@/components/home/play/underlay'

export default function GameLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ConnectSocket>
      {children}
      <Underlay />
    </ConnectSocket>
  )
}
