import Link from 'next/link'

import { BattleStatus, IBattle } from '@/@types/battle'
import OnlineCard from '@/components/home/online-card'
import { UserAvatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Panel } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import battle from '@/constants/battle'
import { getTimeDifferenceFromNow } from '@/lib/utils'

import CountDown from './battles/count-down'

type Props = {
  battleData: IBattle
}

export function getTimeLabel(status?: BattleStatus) {
  switch (status) {
    case battle.STATUS.UPCOMING:
      return 'Starts in'
    case battle.STATUS.ONGOING:
      return 'End in'
    case battle.STATUS.FINISHED:
      return 'Finished'
    default:
      return ''
  }
}

export default function OnlineBattlePanel({ battleData }: Props) {
  const timeLabel = getTimeLabel(battleData.status)

  const timeDifference = getTimeDifferenceFromNow(new Date(battleData.startAt))

  return (
    <Panel className="flex flex-col gap-6 p-6 md:p-8 lg:flex-row lg:gap-12">
      <div className="flex basis-1/3 flex-col items-start justify-between">
        <div className="flex w-full flex-col gap-5">
          <div className="flex items-center justify-start gap-2">
            <Badge variant={battleData.status}>{battleData.status}</Badge>
            <Badge>{battleData.type}</Badge>
          </div>

          <Link
            href={`/battles/${battleData.slug}`}
            className="text-lg font-semibold leading-[1.4] text-default-heading transition-all hover:underline"
          >
            Battle #{battleData.slug} - {battleData.name}
          </Link>

          <p className="font-base font-medium leading-[1.4] tracking-[0.3px] text-default-text-light">
            {battleData.description}
          </p>

          <Separator />

          <div className="font-base flex items-end gap-1.5 font-medium leading-[1.4] tracking-[0.3px]">
            <span className="whitespace-nowrap text-default-text-lightest">{timeLabel}</span>
            {battleData.status === 'UPCOMING' ? (
              <CountDown endTime={battleData.startAt} />
            ) : battleData.status === 'FINISHED' ? (
              <span className="text-default-text-lightest">{timeDifference}</span>
            ) : (
              <span className="text-default-text-lightest">Ongoing battle</span>
            )}
          </div>
        </div>

        <div className="mt-4 flex w-full gap-2">
          {battleData.topUsers.length > 0 && (
            <Button>
              Leaders
              <div className="ml-1.5 flex">
                {battleData.topUsers.map((user, index) => (
                  <UserAvatar
                    key={user.user.id}
                    src={user.user.image}
                    alt={user.user.name}
                    className={`h-[30px] w-[30px] border-[3px] border-default-btn z-[${3 - index}] ${index > 0 && 'ml-[-10px]'}`}
                  />
                ))}
              </div>
            </Button>
          )}

          <Button link={`/battles/${battleData.slug}`} variant="primary" className="relative grow">
            Play
          </Button>
        </div>
      </div>

      <div className="row-auto grid w-full grow grid-cols-auto-22% items-start gap-4">
        {battleData.rounds.map((round) => (
          <OnlineCard key={round.order} round={round} />
        ))}
      </div>
    </Panel>
  )
}
