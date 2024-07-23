import { Suspense } from 'react'
import { FaUsers } from 'react-icons/fa'

import UsersTable from '@/components/admin/users/users-table'
import PageHeader from '@/components/home/page-header'
import Loading from '@/components/loading'

type Props = {
  searchParams: {
    page?: string
  }
}

export default function AdminUsersPage({ searchParams }: Props) {
  const page = searchParams?.page || '1'

  return (
    <div className="space-y-8 sm:space-y-12">
      <PageHeader icon={<FaUsers />} title="Users list" description="User list in this app" />

      <Suspense key={page} fallback={<Loading className="text-4xl" />}>
        <UsersTable page={page} />
      </Suspense>
    </div>
  )
}
