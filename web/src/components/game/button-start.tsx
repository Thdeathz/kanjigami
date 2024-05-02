import { useTransition } from 'react'

import { useStartGameMutation } from '@/data/game'
import useQueryParams from '@/hooks/use-query-params'

import Loading from '../loading'
import { Button } from '../ui/button'

type Props = {
  gameStackId: string
}

export default function ButtonStart({ gameStackId }: Props) {
  const { mutateAsync } = useStartGameMutation()
  const [isPending, startTransition] = useTransition()
  const { onHardSearch } = useQueryParams()

  const onStartGame = () => {
    startTransition(async () => {
      const { sessionId } = await mutateAsync(gameStackId)

      onHardSearch('s', sessionId)
    })
  }

  return (
    <Button className="mt-4" variant="primary" disabled={isPending} onClick={onStartGame}>
      {isPending ? <Loading /> : 'Start game'}
    </Button>
  )
}
