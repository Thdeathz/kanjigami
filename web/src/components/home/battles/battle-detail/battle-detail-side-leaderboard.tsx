'use client'

import SideLeaderboard from '@/components/home/side-leaderboard'
import Loading from '@/components/loading'
import { useGetAllTimeLeaderboardQuery } from '@/data/leaderboard'

type Props = {
  slug: string
}

export default function BattleDetailSideLeaderboard({ slug }: Props) {
  const { data: topUsers, isLoading } = useGetAllTimeLeaderboardQuery('event', slug)

  if (isLoading) return <Loading className="text-2xl" />

  if (!topUsers) return <p>Leaderboard empty.</p>

  return <SideLeaderboard topUsers={topUsers} />
}
