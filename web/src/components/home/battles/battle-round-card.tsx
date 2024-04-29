'use client'

import Link from 'next/link'
import { FaCrown } from 'react-icons/fa'

import { IRound, IRoundTopUser } from '@/@types/battle'
import { UserAvatar } from '@/components/ui/avatar'

import CardWrapper from '../card-wrapper'

import CountDown from './count-down'

type CountDownToStartProps = {
  startAt?: Date
}

function CountDownToStart({ startAt }: CountDownToStartProps) {
  if (!startAt) return <p className="py-8 text-center font-medium">Coming soon.</p>

  return (
    <div className="p-2">
      <p className="mb-4 text-center font-medium text-default-text-lightest">Unlock in</p>

      <CountDown type="animate" maxLength={2} endTime={startAt} />
    </div>
  )
}

type TopUserInfoProps = {
  topUser?: IRoundTopUser
  startAt?: Date
}

function TopUserInfo({ topUser, startAt }: TopUserInfoProps) {
  if (!topUser) return <CountDownToStart startAt={startAt} />

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
      link="/battles/10"
      imageUrl={round.game?.image}
      className="card-item pointer-events-auto z-10 cursor-pointer hover:scale-105 hover:opacity-100 group-hover:opacity-40"
    >
      <TopUserInfo topUser={round.hightPoint} startAt={round.startAt} />
    </CardWrapper>
  )
}
