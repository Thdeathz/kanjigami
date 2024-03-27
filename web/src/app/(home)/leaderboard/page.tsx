import { BsTrophyFill } from 'react-icons/bs'

import FilterBox from '@/components/home/leaderboard/filter-box'
import LeaderboardsList from '@/components/home/leaderboard/leaderboards-list'
import PageHeader from '@/components/home/page-header'

export const metadata = () => ({
  title: 'Leaderboard | 漢字ガミ'
})

export default function LeaderBoardPage() {
  return (
    <div className="flex flex-col gap-12">
      <PageHeader icon={<BsTrophyFill />} title="Leaderboards">
        <FilterBox />
      </PageHeader>

      <LeaderboardsList />
    </div>
  )
}
