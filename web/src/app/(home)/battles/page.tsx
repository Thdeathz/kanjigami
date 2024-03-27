import { Suspense } from 'react'
import { RiSwordFill } from 'react-icons/ri'

import { BattleStatus } from '@/@types/battle'
import Battles from '@/components/home/battles'
import Filter from '@/components/home/battles/filter'
import SectionWrapper from '@/components/home/battles/section-wrapper'
import PageHeader from '@/components/home/page-header'
import RootNotification from '@/components/home/root-notification'
import SideLeaderboard from '@/components/home/side-leaderboard'
import Loading from '@/components/loading'

export const metadata = () => ({
  title: 'Battles | 漢字ガミ'
})

export default function BattlesPage({
  searchParams
}: {
  searchParams?: {
    status?: string
  }
}) {
  const status = searchParams?.status || ''

  return (
    <div className="flex flex-col gap-12">
      <PageHeader
        icon={<RiSwordFill />}
        title="Online battles"
        description="Compete with players around the world and learn kanji"
      >
        <Filter />
      </PageHeader>

      <RootNotification />

      <div className="flex gap-12">
        <div className="shrink grow">
          <Suspense key={status} fallback={<Loading />}>
            <Battles status={status as BattleStatus} />
          </Suspense>
        </div>

        <SectionWrapper title="All-time leaders" className="w-min-[18rem] w-[18rem]">
          <SideLeaderboard />
        </SectionWrapper>
      </div>
    </div>
  )
}
