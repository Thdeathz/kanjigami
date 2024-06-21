import { BsTrophyFill } from 'react-icons/bs'

import FilterBox from '@/components/home/leaderboard/filter-box'
import LeaderboardsList from '@/components/home/leaderboard/leaderboards-list'
import PageHeader from '@/components/home/page-header'
import { getAllTimeLeaderboard } from '@/server/actions/leaderboard'

export const metadata = () => ({
  title: 'Battle Leaderboard',
  description: 'See your rank on Online battle, make your way to the top!',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/leaderboard/battle`
  }
})

export default async function LeaderBoardPage() {
  const topUsers = await getAllTimeLeaderboard('event')

  return (
    <div className="space-y-8 sm:space-y-12">
      <PageHeader icon={<BsTrophyFill />} title="Leaderboards">
        <FilterBox type="event" />
      </PageHeader>

      <LeaderboardsList topUsers={topUsers} />
    </div>
  )
}
