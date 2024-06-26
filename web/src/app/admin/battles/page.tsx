import { Suspense } from 'react'
import { RiSwordFill } from 'react-icons/ri'

import BattlesTable from '@/components/admin/battles/battles-table'
import PageHeader from '@/components/home/page-header'
import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'

type Props = {
  searchParams: {
    page?: string
  }
}

export default function AdminBattlesPage({ searchParams }: Props) {
  const page = searchParams.page || '1'

  return (
    <div className="space-y-8 sm:space-y-12">
      <PageHeader
        icon={<RiSwordFill />}
        title="Online battles"
        description="Compete with players around the world and learn kanji"
      >
        <Button link="/admin/battles/create">Create new battle</Button>
      </PageHeader>

      <Suspense key={page} fallback={<Loading className="text-4xl" />}>
        <BattlesTable page={page} />
      </Suspense>
    </div>
  )
}
