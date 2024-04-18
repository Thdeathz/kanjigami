'use client'

import Loading from '@/components/loading'
import { useGetBattleLeaderboardQuery } from '@/data/leaderboard'

import SideLeaderboard from '../side-leaderboard'

export default function BattlesLeaderboard() {
  const { data: topUsers, isLoading } = useGetBattleLeaderboardQuery()

  if (isLoading) {
    return <Loading className="text-4xl" />
  }

  if (!topUsers) {
    return <p>Leaderboard not found</p>
  }

  return <SideLeaderboard topUsers={topUsers} />
}
