import React from 'react'

import { cn } from '@/lib/utils'

type LobbyInfoItemProps = {
  label: string
  className?: string
  children: React.ReactNode
}

export default function LobbyInfoItem({ label, className, children }: LobbyInfoItemProps) {
  return (
    <div className={cn('grid grid-cols-2 items-center gap-2 border', className)}>
      <p className="border-r px-2 py-1 font-medium">{label}</p>
      <div className="">{children}</div>
    </div>
  )
}
