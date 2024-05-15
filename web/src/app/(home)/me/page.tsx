import { Suspense } from 'react'
import { FaChartArea } from 'react-icons/fa'

import PageHeader from '@/components/home/page-header'
import FilterBox from '@/components/home/user-stats/filter-box'
import UserStatsTable from '@/components/home/user-stats/user-stats-table'
import Loading from '@/components/loading'
import { Panel } from '@/components/ui/card'

export const metadata = () => ({
  title: 'My Analytics'
})

type Props = {
  searchParams: {
    battle?: string
  }
}

export default function UserStatusPage({ searchParams }: Props) {
  const { battle } = searchParams

  return (
    <div className="space-y-12">
      <Suspense key={battle} fallback={<Loading className="text-4xl" />}>
        <PageHeader icon={<FaChartArea />} title="Your stats">
          <FilterBox currentBattle={battle} />
        </PageHeader>

        <Panel wrapperClass="mx-auto w-[40rem]">
          <UserStatsTable battleSlug={battle} />
        </Panel>
      </Suspense>
    </div>
  )
}
