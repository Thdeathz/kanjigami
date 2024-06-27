import { IUserInfo } from '@/@types/auth'
import { IGameStackDetail } from '@/@types/game'
import OngoingBattleLeaderboard from '@/components/home/battles/battle-detail/ongoing-battle-leaderboard'

import { Panel } from '../ui/card'

import ButtonStart from './button-start'
import LobbyInfoItem from './lobby-info-item'

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
        <h1 className="mb-4 text-center text-2xl font-semibold">{gameStack.game.name}</h1>

        <LobbyInfoItem label="Battle" className="rounded-t-md">
          #{battleSlug}
        </LobbyInfoItem>
        <LobbyInfoItem label="Round">{roundIndex}</LobbyInfoItem>

        <LobbyInfoItem label="Stack Name">{gameStack.stack.name}</LobbyInfoItem>
        <LobbyInfoItem label="Number of Words">{gameStack.numberOfWords} 📝</LobbyInfoItem>
        <LobbyInfoItem label="Time Limit" className="rounded-b-md">
          {gameStack.timeLimit}s ⏳
        </LobbyInfoItem>

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
