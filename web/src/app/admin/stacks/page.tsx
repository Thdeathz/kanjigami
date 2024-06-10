import { Suspense } from 'react'
import { BsStack } from 'react-icons/bs'

import StacksTable from '@/components/admin/stacks/stacks-table'
import PageHeader from '@/components/home/page-header'
import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { Panel } from '@/components/ui/card'

type Props = {
  searchParams: {
    page?: string
  }
}

export default function AdminStacksPage({ searchParams }: Props) {
  const page = searchParams?.page || '1'

  return (
    <div className="space-y-8 sm:space-y-12">
      <PageHeader icon={<BsStack />} title="Kanji stack" description="Play game and learn more kanji">
        <Button link="/admin/stacks/create">Create new stack</Button>
      </PageHeader>

      <Suspense key={page} fallback={<Loading className="text-4xl" />}>
        <Panel>
          <StacksTable page={page} />
        </Panel>
      </Suspense>
    </div>
  )
}
