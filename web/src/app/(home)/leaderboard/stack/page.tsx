import { BsTrophyFill } from 'react-icons/bs'

import FilterBox from '@/components/home/leaderboard/filter-box'
import LeaderboardsList from '@/components/home/leaderboard/leaderboards-list'
import PageHeader from '@/components/home/page-header'
import { getAllTimeLeaderboard } from '@/server/actions/leaderboard'

export const metadata = () => ({
  title: 'Stack Leaderboard',
  description: 'See your rank on Kanji stack, make your way to the top!',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/leaderboard/stack`
  }
})

export default async function LeaderBoardPage() {
  const topUsers = await getAllTimeLeaderboard('stack')

  return (
    <div className="space-y-8 sm:space-y-12">
      <PageHeader icon={<BsTrophyFill />} title="Leaderboards">
        <FilterBox type="stack" />
      </PageHeader>

      <LeaderboardsList topUsers={topUsers} />
    </div>
  )
}
