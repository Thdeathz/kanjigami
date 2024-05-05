'use client'

import Image from 'next/image'
import Link from 'next/link'

import Loading from '@/components/loading'
import { DefaultTable } from '@/components/ui/table'
import { useGetUserStatsQuery } from '@/data/battle'

type Props = {
  battleSlug?: string
}

export default function UserStatsTable({ battleSlug }: Props) {
  const { data: userStats, isLoading } = useGetUserStatsQuery(battleSlug)

  if (isLoading) return <Loading className="text-4xl" />

  if (!userStats) return <p className="text-center font-medium opacity-50">You don&apos;t play this battle.</p>

  return (
    <DefaultTable
      columns={[
        {
          title: 'Round',
          dataIndex: 'order',
          render: (value) => <p className="text-center">#{value + 1}</p>
        },
        {
          title: 'Stack',
          dataIndex: 'stack'
        },
        {
          title: 'Game',
          dataIndex: 'game'
        },
        {
          title: 'Point',
          dataIndex: 'point',
          render: (value) => <p className="text-center">{value}</p>
        },
        {
          title: 'Time',
          dataIndex: 'time',
          render: (value) => <p className="text-center">{value}s</p>
        }
      ]}
      dataSources={userStats.rounds.map((round) => ({
        order: round.order,
        stack: (
          <div className="grid grid-cols-3 items-center gap-1.5">
            <Image
              src={round.stack.image}
              alt={round.stack.name}
              width={100}
              height={75}
              className="aspect-4/3 h-12 rounded object-cover"
            />
            <Link
              href={`/stacks/${round.stack.slug}`}
              className="col-span-2 truncate whitespace-nowrap transition-all hover:underline"
            >
              {`#${round.stack.slug} - ${round.stack.name}`}
            </Link>
          </div>
        ),
        game: round.game.name,
        point: round.log.point,
        time: round.log.time
      }))}
    />
  )
}
