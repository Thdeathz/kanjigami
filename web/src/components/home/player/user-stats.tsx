import React from 'react'
import { type IconType } from 'react-icons'
import { BsStack } from 'react-icons/bs'
import { RiSwordFill } from 'react-icons/ri'

import { IUserStats } from '@/@types/user'
import StatsItem from '@/components/home/player/stats-item'

type BattleStatsWrapperProps = {
  icon: React.ReactElement<IconType>
  title: string
  children: React.ReactNode
}

function BattleStatsWrapper({ icon, title, children }: BattleStatsWrapperProps) {
  return (
    <div className="basis-1/2">
      <div className="flex items-center gap-2 text-[1.375rem] font-semibold leading-[1.4] text-default-heading">
        <div className="text-default-text-lightest">{icon}</div>
        <h3>{title}</h3>
      </div>

      <div className="mt-4 flex gap-4">{children}</div>
    </div>
  )
}

type Props = {
  event: IUserStats
  stack: IUserStats
}

export default function UserStats({ event, stack }: Props) {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <BattleStatsWrapper icon={<RiSwordFill />} title="Online battle stats">
        <StatsItem label="Battles played" value={event.totalGame} />
        <StatsItem label="Avg time" value={event.time} />
        <StatsItem label="Totals score" value={event.point} />
      </BattleStatsWrapper>

      <BattleStatsWrapper icon={<BsStack />} title="Kanji stack stats">
        <StatsItem label="Games played" value={stack.totalGame} />
        <StatsItem label="Avg time" value={stack.time} />
        <StatsItem label="Totals score" value={stack.point} />
      </BattleStatsWrapper>
    </div>
  )
}
