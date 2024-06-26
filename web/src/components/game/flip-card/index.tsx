'use client'

import React, { useState } from 'react'

import { FlipCardGameContent } from '@/@types/game'
import { socket } from '@/components/connect-socket'
import Loading from '@/components/loading'
import useGameEvent from '@/hooks/game/use-game-event'
import GameTime from '@/components/game/game-time'

import BlindCardGameContent from './GameContent'

type Props = {
  userId: string
  sessionId: string
  type?: 'ONLINE' | 'OFFLINE'
  battleSlug?: string
  roundIndex?: number
}

export default function FlipCard({ userId, sessionId, type = 'OFFLINE', battleSlug, roundIndex }: Props) {
  const [gameContent, setGameContent] = useState<FlipCardGameContent[]>([])
  const [score, setScore] = useState(0)
  const [gameTime, setGameTime] = useState<string | null>(null)

  const onCalculateScore = () => {
    socket.emit('game:calculate-score', { sessionId, userId, score, type, battleSlug, roundIndex })
  }

  useGameEvent({
    sessionId,
    userId,
    type,
    setGameContent,
    setGameTime
  })

  if (gameContent.length === 0) return <Loading className="text-4xl" />

  return (
    <>
      <BlindCardGameContent
        sessionId={sessionId}
        userId={userId}
        gameContent={gameContent}
        setScore={setScore}
        type={type}
        battleSlug={battleSlug}
        roundIndex={roundIndex}
      />

      <GameTime gameTime={gameTime} onTimeEnd={onCalculateScore} />
    </>
  )
}
