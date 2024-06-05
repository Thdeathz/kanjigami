import React, { MouseEvent, useEffect, useState } from 'react'

import { ActiveCard, IImageContent, IWordContent } from '@/@types/game'
import { socket } from '@/components/connect-socket'

import Card from './Card'

type Props = {
  sessionId: string
  userId: string
  gameContent: (IImageContent | IWordContent)[]
  handleCalculateScore?: () => void
  score: number
  setScore: React.Dispatch<React.SetStateAction<number>>
  type?: 'ONLINE' | 'OFFLINE'
  battleSlug?: string
  roundIndex?: number
}

function BlindCardGameContent({
  sessionId,
  userId,
  gameContent,
  score,
  setScore,
  handleCalculateScore,
  type,
  battleSlug,
  roundIndex
}: Props) {
  const [activeCard, setActiveCard] = useState<ActiveCard[]>([])

  const handleCardClick = (e: MouseEvent<HTMLDivElement>, word: IImageContent | IWordContent) => {
    if (activeCard.length === 2) return

    const { currentTarget } = e
    currentTarget.classList.add('flip')

    setActiveCard([
      ...activeCard,
      {
        card: currentTarget,
        word
      }
    ])
  }

  useEffect(() => {
    if (activeCard.length === 2) {
      const [firstCard, secondCard] = activeCard

      if (firstCard.word.id === secondCard.word.id && firstCard.word.type !== secondCard.word.type) {
        setTimeout(() => {
          firstCard.card.classList.add('invisible')
          secondCard.card.classList.add('invisible')
          setActiveCard((prev) => prev.filter((each) => each.word.id !== firstCard.word.id))
          setScore((prev) => prev + 1)

          if (sessionId) {
            socket.emit('game:flip-card:update', {
              userId,
              sessionId,
              wordId: firstCard.word.id,
              type,
              battleSlug,
              roundIndex
            })
          }

          // if (score + 1 === 12 && typeof handleCalculateScore === 'function') {
          //   handleCalculateScore()
          // }
        }, 100)
      }

      setTimeout(() => {
        firstCard.card.classList.remove('flip')
        secondCard.card.classList.remove('flip')
        setActiveCard((prev) =>
          prev.filter((each) => each.word.id !== firstCard.word.id && each.word.id !== secondCard.word.id)
        )
      }, 650)
    }
  }, [activeCard, sessionId, userId])

  return (
    <div className="grid h-full min-h-content select-none grid-cols-6 grid-rows-4 gap-3">
      {gameContent.map((word) => (
        <Card key={word.id} word={word} onClick={(e) => handleCardClick(e, word)} />
      ))}
    </div>
  )
}

export default BlindCardGameContent
