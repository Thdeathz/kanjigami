import { BsStack } from 'react-icons/bs'

import StacksTable from '@/components/admin/stacks/stacks-table'
import PageHeader from '@/components/home/page-header'
import { Button } from '@/components/ui/button'

export default function AdminStacksPage() {
  return (
    <div className="flex flex-col gap-12">
      <PageHeader icon={<BsStack />} title="Kanji stack" description="Play game and learn more kanji">
        <Button link="/admin/stacks/create">Create new stack</Button>
      </PageHeader>

      <StacksTable />
    </div>
  )
}
