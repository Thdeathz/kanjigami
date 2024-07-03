import React from 'react'

import { IGameStackDetail } from '@/@types/game'
import ButtonGuideToPlay from '@/components/game/button-guide-to-play'
import ButtonStart from '@/components/game/button-start'
import LobbyInfoItem from '@/components/game/lobby-info-item'
import { Panel } from '@/components/ui/card'

type Props = {
  gameStack: IGameStackDetail
}

export default function IdleMenu({ gameStack }: Props) {
  return (
    <Panel wrapperClass="place-center mx-auto w-[30rem] relative" className="space-y-4">
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

      {gameStack.game.name === 'Kanji Shooter' && <ButtonGuideToPlay />}

      <ButtonStart type="OFFLINE" gameStackId={gameStack.id} />
    </Panel>
  )
}
