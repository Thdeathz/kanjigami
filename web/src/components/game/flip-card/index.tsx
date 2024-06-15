'use client'

import React, { useState } from 'react'

import { FlipCardGameContent } from '@/@types/game'
import { socket } from '@/components/connect-socket'
import Loading from '@/components/loading'
import useGameEvent from '@/hooks/game/use-game-event'

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

  const onCalculateScore = () => {
    socket.emit('game:calculate-score', { sessionId, userId, score, type, battleSlug, roundIndex })
  }

  useGameEvent({
    sessionId,
    userId,
    type,
    setGameContent
  })

  if (gameContent.length === 0) return <Loading className="text-4xl" />

  return (
    <BlindCardGameContent
      sessionId={sessionId}
      userId={userId}
      gameContent={gameContent}
      score={score}
      setScore={setScore}
      handleCalculateScore={onCalculateScore}
      type={type}
      battleSlug={battleSlug}
      roundIndex={roundIndex}
    />
  )
}
