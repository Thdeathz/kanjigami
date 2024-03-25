'use client'

import { motion } from 'framer-motion'

import SideLeaderboardItem from '@/components/home/side-leaderboard/item'
import { Button } from '@/components/ui/button'
import { grid } from '@/lib/animation-variants'

export default function SideLeaderboard() {
  return (
    <motion.div className="flex flex-col gap-4" variants={grid.container()}>
      <SideLeaderboardItem top="1" />

      <SideLeaderboardItem top="2" />

      <SideLeaderboardItem top="3" />

      <SideLeaderboardItem />

      <SideLeaderboardItem />

      <SideLeaderboardItem />

      <SideLeaderboardItem />

      <motion.div variants={grid.item()}>
        <Button className="w-full">See top 100</Button>
      </motion.div>
    </motion.div>
  )
}
