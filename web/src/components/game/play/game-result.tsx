import { IGameStackDetail } from '@/@types/game'
import Loading from '@/components/loading'
import { Panel } from '@/components/ui/card'
import { useGetGameResultQuery } from '@/data/game'

import ButtonStart from '../button-start'

type Props = {
  gameStack: IGameStackDetail
  logId: string
  type?: 'OFFLINE' | 'ONLINE'
}

export default function GameResult({ type = 'OFFLINE', gameStack, logId }: Props) {
  const { data: gameLog, isLoading } = useGetGameResultQuery(logId)

  if (isLoading) return <Loading className="text-4xl" />

  if (!gameLog) return <p>Game log not found.</p>

  return (
    <Panel wrapperClass="place-center mx-auto w-[30rem]">
      <h3>
        <span>Point:</span> {gameLog.point}
      </h3>
      <h3>
        <span>Time:</span> {gameLog.time}
      </h3>

      {type === 'OFFLINE' && <ButtonStart type="OFFLINE" gameStackId={gameStack.id} />}
    </Panel>
  )
}
