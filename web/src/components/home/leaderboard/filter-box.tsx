import { LeaderboardType } from '@/@types/leaderboard'
import FilterItem from '@/components/home/filter-item'
import { Panel } from '@/components/ui/card'

type Props = {
  type: LeaderboardType
}

export default function FilterBox({ type }: Props) {
  return (
    <div className="mt-4">
      <Panel className="p-2">
        <FilterItem title="All-time" to="/leaderboard" isActive={type === 'all-time'} />

        <FilterItem title="Kanji stack" to="/leaderboard/stack" isActive={type === 'stack'} />

        <FilterItem title="Online battle" to="/leaderboard/battle" isActive={type === 'event'} />
      </Panel>
    </div>
  )
}
