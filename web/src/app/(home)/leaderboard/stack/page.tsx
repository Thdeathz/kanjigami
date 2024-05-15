import { BsTrophyFill } from 'react-icons/bs'

import FilterBox from '@/components/home/leaderboard/filter-box'
import LeaderboardsList from '@/components/home/leaderboard/leaderboards-list'
import PageHeader from '@/components/home/page-header'

export const metadata = () => ({
  title: 'Leaderboard'
})

export default function LeaderBoardPage() {
  return (
    <div className="space-y-12">
      <PageHeader icon={<BsTrophyFill />} title="Leaderboards">
        <FilterBox type="stack" />
      </PageHeader>

      <LeaderboardsList type="stack" />
    </div>
  )
}
