'use client'

import { useState } from 'react'

import { IKanjiShooterContent } from '@/@types/game'
import { socket } from '@/components/connect-socket'
import Game from '@/components/game/kanji-shooter/entities/game'
import KanjiShooterGameContent from '@/components/game/kanji-shooter/game-content'
import Loading from '@/components/loading'
import useGameEvent from '@/hooks/game/use-game-event'

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
