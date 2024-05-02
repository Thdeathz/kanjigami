'use client'

import { useState } from 'react'

import { IKanjiShooterContent } from '@/@types/game'
import { socket } from '@/components/connect-socket'
import Loading from '@/components/loading'
import useGameEvent from '@/hooks/game/use-game-event'

import Game from './entities/game'
import KanjiShooterGameContent from './game-content'

type Props = {
  sessionId: string
  userId: string
}

export default function KanjiShooter({ sessionId, userId }: Props) {
  const [gameContent, setGameContent] = useState<IKanjiShooterContent[]>([])
  const [game, setGame] = useState<Game | null>(null)

  const onCalculateScore = () => {
    socket.emit('game:calculate-score', { sessionId, userId, score: game?.userScore || 0 })
  }

  useGameEvent({
    sessionId,
    userId,
    setGameContent
  })

  if (gameContent.length === 0) return <Loading className="text-4xl" />

  return (
    <KanjiShooterGameContent
      size={{ width: 1600, height: 750 }}
      gameContent={gameContent}
      handleCalculateScore={onCalculateScore}
      game={game}
      setGame={setGame}
    />
  )
}
