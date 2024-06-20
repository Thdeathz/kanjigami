'use client'

import Image from 'next/image'
import { AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai'

import Loading from '@/components/loading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PagePagination } from '@/components/ui/pagination'
import { DefaultTable } from '@/components/ui/table'
import { useAdminGetAllStacksQuery } from '@/data/stack'

type Props = {
  page: string
}

export default function StacksTable({ page }: Props) {
  const { data: stacks, isLoading } = useAdminGetAllStacksQuery(page)

  if (isLoading) return <Loading className="text-4xl" />

  if (!stacks || !stacks.data) return <p>Stacks empty.</p>

  return (
    <>
      <DefaultTable
        columns={[
          {
            title: 'Index',
            dataIndex: 'slug',
            render: (value) => <p className="text-center font-medium">#{value}</p>
          },
          {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            render: (value) => (
              <div className="font-secondary flex items-center justify-center gap-2">
                <Image
                  src={value}
                  alt="stack-thumbnail"
                  width="400"
                  height="300"
                  className="aspect-4/3 w-[150px] rounded-[6px]"
                />
              </div>
            )
          },
          {
            title: 'Name',
            dataIndex: 'name'
          },
          {
            title: 'Topic',
            dataIndex: 'topic',
            render: (value) => <Badge>{value}</Badge>
          },
          {
            title: 'Created At',
            dataIndex: 'createdAt'
          },
          {
            title: 'Action',
            dataIndex: 'action',
            render: () => (
              <div className="flex-center gap-4">
                <Button variant="primary" shape="circle">
                  <AiTwotoneEdit />
                </Button>
                <Button variant="danger" shape="circle">
                  <AiTwotoneDelete />
                </Button>
              </div>
            )
          }
        ]}
        dataSources={stacks.data.map((stack) => ({
          slug: stack.slug,
          thumbnail: stack.image,
          name: stack.name,
          topic: stack.topic,
          createdAt: new Date(stack.createdAt).toLocaleDateString()
        }))}
      />

      <PagePagination className="mt-4" currentPage={Number(page)} availablePages={stacks.pagination?.totalPages ?? 0} />
    </>
  )
}
