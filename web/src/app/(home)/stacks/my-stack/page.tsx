import { Suspense } from 'react'

import StacksTable from '@/components/admin/stacks/stacks-table'
import PageHeader from '@/components/home/page-header'
import RequirePlus from '@/components/home/require-plus'
import Loading from '@/components/loading'
import { SectionDivider } from '@/components/ui/separator'
import { getCurrentUserInfo } from '@/server/actions/user'

type Props = {
  searchParams: {
    page?: string
  }
}

export default async function MyStack({ searchParams }: Props) {
  const page = searchParams.page || '1'
  const user = await getCurrentUserInfo()

  if (!user?.isPlus) {
    return <RequirePlus />
  }

  return (
    <div className="space-y-8 sm:space-y-12">
      <PageHeader title="My stacks" description="My stack which i had created" />

      <SectionDivider title="Stacks" />

      <Suspense key={page} fallback={<Loading className="text-4xl" />}>
        <StacksTable page={page} />
      </Suspense>
    </div>
  )
}
