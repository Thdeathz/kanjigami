'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { INotification } from '@/@types/notification'
import Loading from '@/components/loading'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useGetBattleDetailQuery } from '@/data/battle'
import useInvalidateTag from '@/hooks/use-invalidate-tag'
import { cn } from '@/lib/utils'

import { getTimeLabel } from '../../online-battle-panel'
import PageHeader from '../../page-header'
import RootNotification from '../../root-notification'
import CountDown from '../count-down'
import RoundsList from '../rounds-list'
import SectionWrapper from '../section-wrapper'

import BattleDetailSideLeaderboard from './battle-detail-side-leaderboard'
import BattleStacksList from './battle-stacks-list'
import OngoingBattleLeaderboard from './ongoing-battle-leaderboard'

type Props = {
  slug: string
  notifications?: INotification[]
}

export default function BattleDetail({ slug, notifications }: Props) {
  const router = useRouter()
  const { invalidateTag } = useInvalidateTag()
  const { data: battle, isLoading } = useGetBattleDetailQuery(slug)

  const timeLabel = getTimeLabel(battle?.status)

  const onBattleStart = () => {
    invalidateTag(['battles'])

    router.refresh()
    toast.success('Battle started!')
  }

  if (isLoading) return <Loading className="text-4xl" />

  if (!battle) return <p>Battle not found.</p>

  return (
    <>
      <PageHeader
        title={`Battle #${battle.slug} - ${battle.name}`}
        description={battle.description}
        badge={
          <>
            <Badge variant={battle.status}>{battle.status}</Badge>
            <Badge>{battle.type}</Badge>
            {battle.playedUsers !== undefined && <Badge>{battle.playedUsers} played</Badge>}
          </>
        }
        showLightStick={battle.status}
      >
        <div className="flex-center gap-2">
          <Separator />
          <p className="whitespace-nowrap rounded-full bg-border-1 px-3 py-0.5 text-sm uppercase text-default-text-lightest">
            {timeLabel}
          </p>
          <Separator />
        </div>

        {battle.status === 'UPCOMING' && (
          <CountDown size="large" type="animate" endTime={battle.startAt} onFinish={onBattleStart} />
        )}
      </PageHeader>
      <RootNotification notifications={notifications} />

      <div className="flex flex-col gap-12 sm:flex-row">
        <div className={cn('shrink grow sm:w-0', { 'xl:px-48': battle.status === 'UPCOMING' })}>
          {battle.status !== 'UPCOMING' && (
            <BattleStacksList stacks={battle.rounds.map((round) => ({ ...round.stack, status: round.status }))} />
          )}

          <RoundsList battleSlug={battle.slug} rounds={battle.rounds} />
        </div>

        {battle.status === 'FINISHED' && (
          <div className="w-full sm:w-[18rem]">
            <SectionWrapper title="Battle leaders">
              <BattleDetailSideLeaderboard slug={slug} />
            </SectionWrapper>
          </div>
        )}

        {battle.status === 'ONGOING' && (
          <div className="w-full sm:w-[18rem]">
            <SectionWrapper title="Battle leaders">
              <OngoingBattleLeaderboard slug={slug} />
            </SectionWrapper>
          </div>
        )}
      </div>
    </>
  )
}
