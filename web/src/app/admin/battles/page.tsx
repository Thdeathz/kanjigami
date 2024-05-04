import { RiSwordFill } from 'react-icons/ri'

import BattlesTable from '@/components/admin/battles/battles-table'
import PageHeader from '@/components/home/page-header'
import { Button } from '@/components/ui/button'

export default function AdminBattlesPage() {
  return (
    <div className="flex flex-col gap-12">
      <PageHeader
        icon={<RiSwordFill />}
        title="Online battles"
        description="Compete with players around the world and learn kanji"
      >
        <Button link="/admin/battles/create">Create new battle</Button>
      </PageHeader>

      <BattlesTable />
    </div>
  )
}
