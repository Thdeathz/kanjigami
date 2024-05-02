import React, { useCallback, useEffect } from 'react'

import { IKanjiShooterContent } from '@/@types/game'
import { socket } from '@/components/connect-socket'
import useInvalidateTag from '@/hooks/use-invalidate-tag'
import useQueryParams from '@/hooks/use-query-params'

type PropsType = {
  sessionId: string
  userId: string
  setGameContent: React.Dispatch<React.SetStateAction<IKanjiShooterContent[]>>
}

export default function useGameEvent({ sessionId, userId, setGameContent }: PropsType) {
  const { onSearch } = useQueryParams()
  const { invalidateTag } = useInvalidateTag()

  // const onContentNotFound = useOnContentNotFound(stackId, gameId)

  const onGameContent = useCallback(
    ({ words }: { words: IKanjiShooterContent[] }) => {
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
  }, [onCalculateScoreSuccess, onGameContent, sessionId, userId])
}
