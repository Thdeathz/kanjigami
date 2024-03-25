'use client'

import { motion } from 'framer-motion'

import { grid } from '@/lib/animation-variants'

import TopUser from './top-user'
import TopUserItem from './top-user-item'

export default function LeaderboardsList() {
  return (
    <div className="mx-auto flex flex-col gap-4">
      <div className="flex w-[55rem] items-end gap-2">
        <TopUser top="2" />

        <TopUser top="1" />

        <TopUser top="3" />
      </div>

      <table>
        <motion.tbody
          className="mx-auto flex w-[45rem] flex-col gap-4"
          variants={grid.container(0.4)}
          initial="hidden"
          animate="enter"
        >
          <TopUserItem />

          <TopUserItem />

          <TopUserItem />

          <TopUserItem />

          <TopUserItem />

          <TopUserItem />

          <TopUserItem />

          <TopUserItem />

          <TopUserItem />

          <TopUserItem />

          <TopUserItem />

          <TopUserItem />
        </motion.tbody>
      </table>
    </div>
  )
}
