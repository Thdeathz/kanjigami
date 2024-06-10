'use client'

import { motion } from 'framer-motion'

import { LeaderboardType } from '@/@types/leaderboard'
import Loading from '@/components/loading'
import { useGetAllTimeLeaderboardQuery } from '@/data/leaderboard'
import { grid } from '@/lib/animation-variants'

import TopUser, { TopUserProps } from './top-user'
import TopUserItem from './top-user-item'

type Props = {
  type: LeaderboardType
}

export default function LeaderboardsList({ type }: Props) {
  const { data: topUsers, isLoading } = useGetAllTimeLeaderboardQuery(type)

  if (isLoading) {
    return <Loading className="text-4xl" />
  }

  if (!topUsers) {
    return <p>Leaderboard empty.</p>
  }

  return (
    <div className="mx-auto flex flex-col items-center gap-4">
      <div className="flex w-[95vw] items-end gap-2 lg:w-[55rem]">
        {topUsers.slice(0, 3).map((topUser, index) => (
          <TopUser key={topUser.user.id} top={String(index + 1) as TopUserProps['top']} topUser={topUser} />
        ))}
      </div>

      <table>
        <motion.tbody
          className="mx-auto flex w-[90vw] flex-col gap-4 lg:w-[45rem]"
          variants={grid.container(0.4)}
          initial="hidden"
          animate="enter"
        >
          {topUsers.slice(3).map((topUser, index) => (
            <TopUserItem key={topUser.user.id} topUser={topUser} index={index + 4} />
          ))}
        </motion.tbody>
      </table>
    </div>
  )
}
