import React from 'react'

import Underlay from '@/components/game/play/underlay'

export default function GameLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-content bg-game bg-cover bg-center p-12">
      <div className="mx-auto h-full max-w-[1600px]">
        {children}

        <Underlay />
      </div>
    </div>
  )
}
