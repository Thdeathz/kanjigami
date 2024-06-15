'use client'

import React, { useState } from 'react'

import { IMultipleChoiceGameContent } from '@/@types/game'
import { socket } from '@/components/connect-socket'
import Loading from '@/components/loading'
import useGameEvent from '@/hooks/game/use-game-event'

import MultipleChoiceGameContent from './GameContent'

type Props = {
  sessionId: string
  userId: string
  type?: 'ONLINE' | 'OFFLINE'
  battleSlug?: string
  roundIndex?: number
}

export default function MultipleChoice({ sessionId, userId, type = 'OFFLINE', battleSlug, roundIndex }: Props) {
  const [gameContent, setGameContent] = useState<IMultipleChoiceGameContent[]>([])

  const onCalculateScore = () => {
    const score = gameContent.reduce((acc, question) => {
      const userSelected = question.options?.find((_, index) => index === question.selectedAnswer)

      if (userSelected?.id === question.answer.id) {
        return acc + 1
      }

      return acc
    }, 0)

    socket.emit('game:calculate-score', { sessionId, userId, score, type, battleSlug, roundIndex })
  }

  const onSelectAnswer = (answer: number, question: number) => {
    setGameContent((prev) =>
      prev.map((each, index) => {
        if (question === index) return { ...each, selectedAnswer: answer }

        return each
      })
    )
  }

  useGameEvent({
    sessionId,
    userId,
    type,
    setGameContent
  })

  if (gameContent?.length === 0) return <Loading className="text-3xl" />

  return (
    <MultipleChoiceGameContent
      gameContent={gameContent}
      onCalculateScore={onCalculateScore}
      onSelectAnswer={onSelectAnswer}
    />
  )
}
