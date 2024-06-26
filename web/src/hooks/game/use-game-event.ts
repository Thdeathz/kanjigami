import React, { useCallback, useEffect } from 'react'

import { socket } from '@/components/connect-socket'
import useInvalidateTag from '@/hooks/use-invalidate-tag'
import useQueryParams from '@/hooks/use-query-params'

type PropsType<T> = {
  sessionId: string
  userId: string
  type?: 'ONLINE' | 'OFFLINE'
  setGameContent: React.Dispatch<React.SetStateAction<T[]>>
  setGameTime: React.Dispatch<React.SetStateAction<string | null>>
}

export default function useGameEvent<T>({ sessionId, userId, type, setGameContent, setGameTime }: PropsType<T>) {
  const { onSearchArray } = useQueryParams()
  const { invalidateTags } = useInvalidateTag()

  const onGameContent = useCallback(
    ({ words, gameTime }: { words: T[]; gameTime: string }) => {
      setGameContent(words)
      setGameTime(new Date(new Date().getTime() + Number(gameTime) * 1000 + 1000).toString())
    },
    [setGameContent]
  )

  const onCalculateScoreSuccess = useCallback(
    ({
      stackSlug,
      logId,
      currentScore
    }: {
      stackSlug: string
      logId: string
      currentScore?: { point: number; time: number } | null
    }) => {
      console.log('logId', logId, stackSlug)

      const searchData = [
        {
          key: 'log',
          value: logId
        }
      ]

      if (currentScore) {
        searchData.push(
          {
            key: 'score',
            value: currentScore.point.toString()
          },
          {
            key: 'time',
            value: currentScore.time.toString()
          }
        )
      }

      onSearchArray(searchData)
      invalidateTags([['battles'], ['stacks']])
    },
    [onSearchArray]
  )

  useEffect(() => {
    socket.emit('game:get', { sessionId, userId, type })

    socket.on('game:content', onGameContent)

    // socket.on('game:content-not-found', onContentNotFound)

    socket.on('game:calculate-score:success', onCalculateScoreSuccess)

    return () => {
      socket.off('game:content', onGameContent)
      // socket.off('game:content-not-found', onContentNotFound)
      socket.off('game:calculate-score:success', onCalculateScoreSuccess)
    }
  }, [sessionId, userId])
}
