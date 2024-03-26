import React from 'react'
import { type IconType } from 'react-icons'
import { BsStack } from 'react-icons/bs'
import { RiSwordFill } from 'react-icons/ri'

import StatsItem from './stats-item'

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

export default function UserStats() {
  return (
    <div className="flex gap-8">
      <BattleStatsWrapper icon={<RiSwordFill />} title="Online battle stats">
        <StatsItem label="Global rank" value="0" />
        <StatsItem label="Battles played" value="0" />
        <StatsItem label="Totals score" value="0" />
      </BattleStatsWrapper>

      <BattleStatsWrapper icon={<BsStack />} title="Kanji stack stats">
        <StatsItem label="Games played" value="0" />
        <StatsItem label="Avg time" value="0" />
        <StatsItem label="Totals score" value="0" />
      </BattleStatsWrapper>
    </div>
  )
}
