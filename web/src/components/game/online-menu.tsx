import { IUserInfo } from '@/@types/auth'
import { IGameStackDetail } from '@/@types/game'
import OngoingBattleLeaderboard from '@/components/home/battles/battle-detail/ongoing-battle-leaderboard'

import { Panel } from '../ui/card'

import ButtonStart from './button-start'

type Props = {
  battleSlug: string
  roundIndex: string
  user: IUserInfo
  gameStack: IGameStackDetail
}

export default function OnlineMenu({ gameStack, battleSlug, roundIndex, user }: Props) {
  return (
    <div className="mx-auto grid w-[50vw] grid-cols-2 gap-4">
      <Panel>
        <h1 className="text-xl font-semibold">{gameStack.game.name}</h1>

        <p>Battle #{battleSlug}</p>
        <p>Round {roundIndex}</p>
        <p>{gameStack.stack.name}</p>
        <p>{gameStack.numberOfWords} words</p>
        <p>{gameStack.timeLimit}s</p>

        <ButtonStart
          type="ONLINE"
          gameStackId={gameStack.id}
          battleSlug={battleSlug}
          roundIndex={roundIndex}
          user={user}
        />
      </Panel>

      <Panel>
        <h3 className="mb-2 text-[1.375rem] font-semibold leading-[1.4] text-default-heading">Battle leaders</h3>

        <OngoingBattleLeaderboard slug={battleSlug} />
      </Panel>
    </div>
  )
}
