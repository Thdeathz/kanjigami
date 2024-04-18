'use client'

import { motion } from 'framer-motion'

import { ITopUser } from '@/@types/leaderboard'
import SideLeaderboardItem, { SideLeaderboardItemProps } from '@/components/home/side-leaderboard/item'
import { Button } from '@/components/ui/button'
import { grid } from '@/lib/animation-variants'

type Props = {
  topUsers: ITopUser[]
}

export default function SideLeaderboard({ topUsers }: Props) {
  return (
    <motion.div className="flex flex-col gap-4" variants={grid.container()}>
      {topUsers.map((topUser, index) => (
        <SideLeaderboardItem
          key={topUser.user.id}
          top={index < 3 ? (String(index + 1) as SideLeaderboardItemProps['top']) : 'default'}
          topUser={topUser}
        />
      ))}

      <motion.div variants={grid.item()}>
        <Button link="/leaderboard" className="w-full">
          See top 100
        </Button>
      </motion.div>
    </motion.div>
  )
}
