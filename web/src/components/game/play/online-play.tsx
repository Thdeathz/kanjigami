'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useUnmount } from 'usehooks-ts'

import { IUserInfo } from '@/@types/auth'
import { IBattleRoundData } from '@/@types/battle'
import { socket } from '@/components/connect-socket'
import FlipCard from '@/components/game/flip-card'
import KanjiShooter from '@/components/game/kanji-shooter'
import MultipleChoice from '@/components/game/multiple-choice'
import GameResult from '@/components/game/play/game-result'
import Loading from '@/components/loading'
// import { useGetGameStackQuery } from '@/data/game'
import useGlobalContext from '@/hooks/use-global-context'
import useQueryParams from '@/hooks/use-query-params'

import OnlineMenu from '../online-menu'

type Props = {
  battleSlug: string
  roundIndex: string
  currentSessionId?: string
  user: IUserInfo
  logId?: string
}

export default function OnlinePlay({ battleSlug, roundIndex, currentSessionId, user, logId }: Props) {
  const [gameStack, setGameStack] = useState<IBattleRoundData | null>(null)
  const { onHardSearch, onResetSearch } = useQueryParams()
  const { setValue } = useGlobalContext()

  const onRoundData = (data: IBattleRoundData) => {
    setGameStack(data)
  }

  const onRoundJoined = ({ sessionId }: { sessionId: string }) => {
    onHardSearch('s', sessionId)
  }

  const onRoundPlayed = () => {
    toast.info('You have already played this round', {
      id: 'round-played'
    })

    onResetSearch()
  }

  useEffect(() => {
    socket.emit('battle:info', { battleSlug, roundIndex: Number(roundIndex) - 1, userId: user.id })

    socket.on('battle:round:data', onRoundData)

    socket.on('battle:round:joined', onRoundJoined)

    socket.on('battle:round:played', onRoundPlayed)

    return () => {
      socket.off('battle:round:data', onRoundData)
      socket.off('battle:round:joined', onRoundJoined)
      socket.off('battle:round:played', onRoundPlayed)
    }
  }, [user])

  useUnmount(() => {
    setValue(false)
  })

  if (!gameStack) return <Loading className="text-4xl" />

  if (logId) return <GameResult gameStack={gameStack} logId={logId} />

  if (currentSessionId) {
    if (gameStack.game.name === 'Kanji Shooter')
      return (
        <KanjiShooter
          sessionId={currentSessionId}
          userId={user.id}
          type="ONLINE"
          battleSlug={battleSlug}
          roundIndex={Number(roundIndex) - 1}
        />
      )

    if (gameStack.game.name === 'Blind Flip Card')
      return (
        <FlipCard
          sessionId={currentSessionId}
          userId={user.id}
          type="ONLINE"
          battleSlug={battleSlug}
          roundIndex={Number(roundIndex) - 1}
        />
      )

    if (gameStack.game.name === 'Multiple Choice')
      return (
        <MultipleChoice
          sessionId={currentSessionId}
          userId={user.id}
          type="ONLINE"
          battleSlug={battleSlug}
          roundIndex={Number(roundIndex) - 1}
        />
      )
  }

  return <OnlineMenu battleSlug={battleSlug} roundIndex={roundIndex} gameStack={gameStack} user={user} />
}
