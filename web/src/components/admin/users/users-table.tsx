'use client'

import Loading from '@/components/loading'
import { UserAvatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Panel } from '@/components/ui/card'
import { PagePagination } from '@/components/ui/pagination'
import { DefaultTable } from '@/components/ui/table'
import { useAdminGetAllUsersQuery } from '@/data/user'

type Props = {
  page: string
}

export default function UsersTable({ page }: Props) {
  const { data: users, isLoading } = useAdminGetAllUsersQuery(page)

  if (isLoading) return <Loading className="text-4xl" />

  if (!users || !users.data) return <p>Users empty.</p>

  return (
    <Panel>
      <DefaultTable
        columns={[
          {
            title: 'Id',
            dataIndex: 'id',
            render: (value) => <p className="text-center font-medium">{value}</p>
          },
          {
            title: 'Avatar',
            dataIndex: 'avatar',
            render: (value) => (
              <div className="font-secondary flex items-center justify-center gap-2">
                <UserAvatar src={value} alt="user-avatar" />
              </div>
            )
          },
          {
            title: 'Email',
            dataIndex: 'email'
          },
          {
            title: 'Name',
            dataIndex: 'name'
          },
          {
            title: 'Score',
            dataIndex: 'score',
            render: (value) => <p className="font-secondary text-center font-medium">{value}</p>
          },
          {
            title: 'State',
            dataIndex: 'state',
            render: (value) => <Badge className={value === 'PLUS' ? 'bg-default-brand text-black' : ''}>{value}</Badge>
          }
        ]}
        dataSources={users.data.map((user) => ({
          id: user.id,
          avatar: user.image,
          email: user.email,
          name: user.name,
          score: user.score,
          state: user.state
        }))}
      />

      <PagePagination className="mt-4" currentPage={Number(page)} availablePages={users.pagination?.totalPages ?? 0} />
    </Panel>
  )
}
