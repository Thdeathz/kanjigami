import React, { useCallback, useEffect } from 'react'

import { socket } from '@/components/connect-socket'
import useInvalidateTag from '@/hooks/use-invalidate-tag'
import useQueryParams from '@/hooks/use-query-params'

type PropsType<T> = {
  sessionId: string
  userId: string
  type?: 'ONLINE' | 'OFFLINE'
  setGameContent: React.Dispatch<React.SetStateAction<T[]>>
}

export default function useGameEvent<T>({ sessionId, userId, type, setGameContent }: PropsType<T>) {
  const { onSearch, onSearchArray } = useQueryParams()
  const { invalidateTag, invalidateTags } = useInvalidateTag()

  // const onContentNotFound = useOnContentNotFound(stackId, gameId)

  const onGameContent = useCallback(
    ({ words }: { words: T[] }) => {
      setGameContent(words)
    },
    [setGameContent]
  )

  const onCalculateScoreSuccess = useCallback(
    ({ logId, currentScore }: { logId: string; currentScore?: { point: number; time: number } | null }) => {
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
      // invalidateTag(['stacks'])
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
