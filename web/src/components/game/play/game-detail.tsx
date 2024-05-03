'use client'

import { useUnmount } from 'usehooks-ts'

import FlipCard from '@/components/game/flip-card'
import IdleMenu from '@/components/game/idle-menu'
import KanjiShooter from '@/components/game/kanji-shooter'
import MultipleChoice from '@/components/game/multiple-choice'
import GameResult from '@/components/game/play/game-result'
import Loading from '@/components/loading'
import { useGetGameStackQuery } from '@/data/game'
import useGlobalContext from '@/hooks/use-global-context'

type Props = {
  id: string
  sessionId?: string
  userId: string
  logId?: string
}

export default function GameDetail({ id, sessionId, userId, logId }: Props) {
  const { data: gameStack, isLoading } = useGetGameStackQuery(id)
  const { setValue } = useGlobalContext()

  useUnmount(() => {
    setValue(false)
  })

  if (isLoading) return <Loading className="text-4xl" />

  if (!gameStack) return <p>Game not found.</p>

  if (logId) return <GameResult gameStack={gameStack} logId={logId} />

  if (sessionId) {
    if (gameStack.game.name === 'Kanji Shooter') return <KanjiShooter sessionId={sessionId} userId={userId} />

    if (gameStack.game.name === 'Blind Flip Card') return <FlipCard sessionId={sessionId} userId={userId} />

    if (gameStack.game.name === 'Multiple Choice') return <MultipleChoice sessionId={sessionId} userId={userId} />
  }

  return <IdleMenu gameStack={gameStack} />
}
