'use client'

import { AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai'

import Loading from '@/components/loading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Panel } from '@/components/ui/card'
import { PagePagination } from '@/components/ui/pagination'
import { DefaultTable } from '@/components/ui/table'
import { useAdminGetAllBattlesQuery } from '@/data/battle'

type Props = {
  page?: string
}

export default function BattlesTable({ page }: Props) {
  const { data: battles, isLoading } = useAdminGetAllBattlesQuery(page)

  if (isLoading) return <Loading className="text-4xl" />

  if (!battles || !battles.data || battles.data.length === 0) return <p>Battles empty.</p>

  return (
    <Panel>
      <DefaultTable
        columns={[
          {
            title: 'Index',
            dataIndex: 'slug',
            render: (value) => <p className="text-center font-medium">#{value}</p>
          },
          {
            title: 'Name',
            dataIndex: 'name'
          },
          {
            title: 'Type',
            dataIndex: 'type',
            render: (value) => <Badge>{value}</Badge>
          },
          {
            title: 'Status',
            dataIndex: 'status',
            render: (value) => <Badge variant={value}>{value}</Badge>
          },
          {
            title: 'Number rounds',
            dataIndex: 'numberRounds',
            render: (value) => <p className="text-center text-lg font-medium">{value}</p>
          },
          {
            title: 'Start At',
            dataIndex: 'startAt'
          },
          {
            title: 'Action',
            dataIndex: 'action',
            render: (_, row) => (
              <div className="flex-center gap-4">
                <Button variant="primary" shape="circle" disabled={row.status !== 'UPCOMING'}>
                  <AiTwotoneEdit />
                </Button>
                <Button variant="danger" shape="circle" disabled={row.status !== 'UPCOMING'}>
                  <AiTwotoneDelete />
                </Button>
              </div>
            )
          }
        ]}
        dataSources={battles?.data?.map((battle) => ({
          slug: battle.slug,
          name: battle.name,
          type: battle.type,
          status: battle.status,
          numberRounds: battle.rounds.length,
          startAt: new Date(battle.startAt).toLocaleDateString()
        }))}
      />

      <PagePagination
        className="mt-4"
        currentPage={Number(page)}
        availablePages={battles.pagination?.totalPages ?? 0}
      />
    </Panel>
  )
}
