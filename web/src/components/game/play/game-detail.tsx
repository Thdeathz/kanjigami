'use client'

import { useUnmount } from 'usehooks-ts'

import IdleMenu from '@/components/game/idle-menu'
import KanjiShooter from '@/components/game/kanji-shooter'
import Loading from '@/components/loading'
import { useGetGameStackQuery } from '@/data/game'
import useGlobalContext from '@/hooks/use-global-context'

import GameResult from './game-result'

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

  if (sessionId) return <KanjiShooter sessionId={sessionId} userId={userId} />

  return <IdleMenu gameStack={gameStack} />
}
