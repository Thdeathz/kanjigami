import React from 'react'

import Underlay from '@/components/home/play/underlay'

export default function GameLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
      <Underlay />
    </>
  )
}
