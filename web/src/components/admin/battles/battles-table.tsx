'use client'

import Image from 'next/image'

import { Panel } from '@/components/ui/card'
import { DefaultTable } from '@/components/ui/table'

export default function BattlesTable() {
  return (
    <Panel>
      <DefaultTable
        columns={[
          {
            title: 'Round',
            dataIndex: 'round',
            render: (value) => (
              <div className="font-secondary flex items-center justify-center gap-2">
                <Image
                  src={value}
                  alt="battle-thumbnail"
                  width="400"
                  height="300"
                  className="aspect-4/3 w-[50px] rounded-[6px]"
                />
                #194
              </div>
            )
          },
          {
            title: 'My score',
            dataIndex: 'myScore'
          },
          {
            title: 'My rank',
            dataIndex: 'myRank'
          }
        ]}
        dataSources={[
          {
            round: '/images/lock.png',
            myScore: '-',
            myRank: '-'
          }
        ]}
      />
    </Panel>
  )
}
