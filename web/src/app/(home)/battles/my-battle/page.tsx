import { Suspense } from 'react'

import BattlesTable from '@/components/admin/battles/battles-table'
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

export default async function MyBattle({ searchParams }: Props) {
  const page = searchParams.page || '1'
  const user = await getCurrentUserInfo()

  if (!user?.isPlus) {
    return <RequirePlus />
  }

  return (
    <div className="space-y-8 sm:space-y-12">
      <PageHeader title="My battles" description="My battle which i had created" />

      <SectionDivider title="Thumbnail" />

      <Suspense key={page} fallback={<Loading className="text-4xl" />}>
        <BattlesTable page={page} />
      </Suspense>
    </div>
  )
}
