import { useTransition } from 'react'

import { IUserInfo } from '@/@types/auth'
import { useStartGameMutation } from '@/data/game'
import useQueryParams from '@/hooks/use-query-params'

import { socket } from '../connect-socket'
import Loading from '../loading'
import { Button } from '../ui/button'

type Props = {
  type: 'ONLINE' | 'OFFLINE'
  gameStackId: string
  battleSlug?: string
  roundIndex?: string
  user?: IUserInfo
}

export default function ButtonStart({ type, gameStackId, battleSlug, roundIndex, user }: Props) {
  const { mutateAsync } = useStartGameMutation()
  const [isPending, startTransition] = useTransition()
  const { onHardSearch } = useQueryParams()

  const onStartGame = () => {
    startTransition(async () => {
      if (type === 'OFFLINE') {
        const data = await mutateAsync(gameStackId)

        if (!data) return

        onHardSearch('s', data.sessionId)
        return
      }

      if (type === 'ONLINE') {
        socket.emit('battle:round:join', {
          battleSlug,
          roundIndex: Number(roundIndex) - 1,
          user
        })
      }
    })
  }

  return (
    <Button className="mt-4" variant="primary" disabled={isPending} onClick={onStartGame}>
      Start game {isPending && <Loading className="ml-2" />}
    </Button>
  )
}
