'use client'

import Link from 'next/link'
import { FaCrown } from 'react-icons/fa'

import { BattleStatus } from '@/@types/battle'
import { UserAvatar } from '@/components/ui/avatar'

import CardWrapper from '../card-wrapper'

import CountDown from './count-down'

function TopUserInfo() {
  return (
    <div className="flex-center flex-col gap-4 p-2">
      <UserAvatar src="/images/default-avatar.jpg" alt="online-round" plus />

      <div className="text-center">
        <Link href="/player" className="flex items-center gap-2 font-semibold text-default-link">
          <FaCrown className="text-default-brand" />
          Kantan kanji
        </Link>
        <p className="font-secondary">865</p>
      </div>

      <div className="font-secondary w-full rounded-lg bg-online-round-bottom px-4 py-2 text-center text-sm">
        You - Not played
      </div>
    </div>
  )
}

function CountDownToStart() {
  return (
    <div className="p-2">
      <p className="mb-4 text-center font-medium text-default-text-lightest">Unlock in</p>

      <CountDown type="animate" maxLength={2} endTime={new Date()} />
    </div>
  )
}

type Props = {
  status: BattleStatus
}

export default function BattleRoundCard({ status }: Props) {
  return (
    <CardWrapper
      link="/battles/10"
      className="card-item pointer-events-auto z-10 cursor-pointer hover:scale-105 hover:opacity-100 group-hover:opacity-40"
    >
      {status === 'upcoming' ? <CountDownToStart /> : <TopUserInfo />}
    </CardWrapper>
  )
}
