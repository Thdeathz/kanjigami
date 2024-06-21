import React from 'react'

import { IGameStackDetail } from '@/@types/game'
import ButtonStart from '@/components/game/button-start'
import { Panel } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type LobbyInfoItemProps = {
  label: string
  className?: string
  children: React.ReactNode
}

function LobbyInfoItem({ label, className, children }: LobbyInfoItemProps) {
  return (
    <div className={cn('grid grid-cols-2 items-center gap-2 border', className)}>
      <p className="border-r px-2 py-1 font-medium">{label}</p>
      <div className="">{children}</div>
    </div>
  )
}

type Props = {
  gameStack: IGameStackDetail
}

export default function IdleMenu({ gameStack }: Props) {
  return (
    <Panel wrapperClass="place-center mx-auto w-[30rem]" className="space-y-4">
      <h1 className="text-center text-2xl font-semibold">{gameStack.game.name}</h1>

      <div>
        <LobbyInfoItem label="Stack Name" className="rounded-t-md">
          {gameStack.stack.name}
        </LobbyInfoItem>
        <LobbyInfoItem label="Number of Words">{gameStack.numberOfWords} 📝</LobbyInfoItem>
        <LobbyInfoItem label="Time Limit" className="rounded-b-md">
          {gameStack.timeLimit}s ⏳
        </LobbyInfoItem>
      </div>

      <ButtonStart type="OFFLINE" gameStackId={gameStack.id} />
    </Panel>
  )
}
