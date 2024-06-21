'use client'

import { useMemo } from 'react'

import { IGameStackDetail } from '@/@types/game'
import ButtonStart from '@/components/game/button-start'
import Loading from '@/components/loading'
import { Panel } from '@/components/ui/card'
import { useGetGameResultQuery } from '@/data/game'
import { cn } from '@/lib/utils'

type Props = {
  gameStack: IGameStackDetail
  logId: string
  type?: 'OFFLINE' | 'ONLINE'
  score?: string
  time?: string
}

export default function GameResult({ type = 'OFFLINE', gameStack, logId, score, time }: Props) {
  const { data: gameLog, isLoading } = useGetGameResultQuery(logId)

  const isNewRecord = useMemo(() => !score && !time, [score, time])

  if (isLoading) return <Loading className="text-4xl" />

  if (!gameLog) return <Panel wrapperClass="place-center mx-auto w-[30rem]">Game log not found.</Panel>

  return (
    <Panel wrapperClass="place-center mx-auto w-[30rem]" className="space-y-3 text-center">
      <h1 className="text-center text-2xl font-semibold">Game result</h1>

      {isNewRecord && <p className="font-medium">New record</p>}

      <h2 className={cn('font-app-icon text-8xl', { 'text-default-brand': isNewRecord })}>{score ?? gameLog.point}</h2>
      <h3
        className={cn('font-secondary text-xl', { 'text-default-brand': isNewRecord })}
      >{`{ ${time ?? gameLog.time}s }`}</h3>

      {!isNewRecord && (
        <p className="font-secondary text-default-brand">
          Hightest score: <span>{`${gameLog.point} { ${gameLog.time}s }`}</span>
        </p>
      )}

      {type === 'OFFLINE' && <ButtonStart type="OFFLINE" gameStackId={gameStack.id} />}
    </Panel>
  )
}
