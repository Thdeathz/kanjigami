'use client'

import SideLeaderboard from '@/components/home/side-leaderboard'
import Loading from '@/components/loading'
import { useGetAllTimeLeaderboardQuery } from '@/data/leaderboard'

type Props = {
  slug: string
}

export default function StackSideLeaderboard({ slug }: Props) {
  const { data: topUsers, isLoading } = useGetAllTimeLeaderboardQuery('stack', slug, 10)

  if (isLoading) return <Loading className="text-4xl" />

  if (!topUsers) return <p>Leaderboard empty.</p>

  return <SideLeaderboard topUsers={topUsers} />
}
