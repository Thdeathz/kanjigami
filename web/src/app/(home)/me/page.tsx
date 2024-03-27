import { FaChartArea } from 'react-icons/fa'

import PageHeader from '@/components/home/page-header'
import FilterBox from '@/components/home/user-stats/filter-box'
import UserStatsTable from '@/components/home/user-stats/user-stats-table'

export const metadata = () => ({
  title: 'My Analytics | 漢字ガミ'
})

export default function UserStatusPage() {
  return (
    <div className="flex flex-col gap-12">
      <PageHeader icon={<FaChartArea />} title="Your stats">
        <FilterBox />
      </PageHeader>

      <div className="mx-auto w-[30rem]">
        <UserStatsTable />
      </div>
    </div>
  )
}
