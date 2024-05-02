import React, { useCallback, useEffect } from 'react'

import { socket } from '@/components/connect-socket'
import useInvalidateTag from '@/hooks/use-invalidate-tag'
import useQueryParams from '@/hooks/use-query-params'

type PropsType<T> = {
  sessionId: string
  userId: string
  setGameContent: React.Dispatch<React.SetStateAction<T[]>>
}

export default function useGameEvent<T>({ sessionId, userId, setGameContent }: PropsType<T>) {
  const { onSearch } = useQueryParams()
  const { invalidateTag } = useInvalidateTag()

  // const onContentNotFound = useOnContentNotFound(stackId, gameId)

  const onGameContent = useCallback(
    ({ words }: { words: T[] }) => {
      setGameContent(words)
    },
    [setGameContent]
  )

  const onCalculateScoreSuccess = useCallback(
    ({ logId }: { logId: string }) => {
      onSearch('log', logId)
      invalidateTag(['stacks'])
    },
    [onSearch]
  )

  useEffect(() => {
    socket.emit('game:get', { sessionId, userId })

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
