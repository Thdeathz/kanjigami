'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaCrown } from 'react-icons/fa'
import { toast } from 'sonner'

import { BattleStatus, IRound, IRoundTopUser } from '@/@types/battle'
import CountDown from '@/components/home/battles/count-down'
import CardWrapper from '@/components/home/card-wrapper'
import { UserAvatar } from '@/components/ui/avatar'
import useInvalidateTag from '@/hooks/use-invalidate-tag'

type CountDownToStartProps = {
  startAt?: Date
  roundIndex: number
}

function CountDownToStart({ roundIndex, startAt }: CountDownToStartProps) {
  const router = useRouter()
  const { invalidateTag } = useInvalidateTag()

  const onRoundStart = () => {
    invalidateTag(['battles'])

    router.refresh()
    toast.success(`Round ${roundIndex + 1} started!`)
  }

  if (!startAt) return <p className="py-8 text-center font-medium">Coming soon.</p>

  return (
    <div className="p-2">
      <p className="mb-4 text-center font-medium text-default-text-lightest">Unlock in</p>

      <CountDown type="animate" maxLength={2} endTime={startAt} onFinish={onRoundStart} />
    </div>
  )
}

type TopUserInfoProps = {
  roundIndex: number
  topUser?: IRoundTopUser
  startAt?: Date
  status: BattleStatus
}

function TopUserInfo({ roundIndex, topUser, startAt, status }: TopUserInfoProps) {
  if (status === 'UPCOMING') return <CountDownToStart startAt={startAt} roundIndex={roundIndex} />

  if (!topUser)
    return (
      <div className="flex-center mt-4 flex-col gap-2">
        <p className="text-3xl font-medium leading-[1.4]">😭</p>

        <p className="font-medium leading-[1.4] text-default-text-light">No highscore yet</p>

        <p className="font-medium leading-[1.4] text-default-text-lightest">Be the first?</p>

        <div className="font-secondary mt-4 w-full rounded-lg bg-online-round-bottom px-4 py-2 text-center text-sm">
          You - Not played
        </div>
      </div>
    )

  return (
    <div className="flex-center flex-col gap-4 p-2">
      <UserAvatar src={topUser.user.image} alt={topUser.user.name} plus />

      <div className="text-center">
        <Link href={`/player/${topUser.user.name}`} className="flex items-center gap-2 font-semibold text-default-link">
          <FaCrown className="text-default-brand" />
          {topUser.user.name}
        </Link>
        <p className="font-secondary">
          {topUser.point} - {topUser.time}s
        </p>
      </div>

      <div className="font-secondary w-full rounded-lg bg-online-round-bottom px-4 py-2 text-center text-sm">
        You - Not played
      </div>
    </div>
  )
}

type Props = {
  round: IRound
}

export default function BattleRoundCard({ round }: Props) {
  return (
    <CardWrapper
      link={`/play/10/${round.order}`}
      imageUrl={round.game?.image}
      className="card-item pointer-events-auto z-10 cursor-pointer hover:scale-105 hover:opacity-100 group-hover:opacity-40"
    >
      <TopUserInfo roundIndex={round.order} topUser={round.hightPoint} startAt={round.startAt} status={round.status} />
    </CardWrapper>
  )
}
