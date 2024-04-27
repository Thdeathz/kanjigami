import { Suspense } from 'react'
import { RiSwordFill } from 'react-icons/ri'

import { BattleStatus } from '@/@types/battle'
import Battles from '@/components/home/battles'
import BattlesLeaderboard from '@/components/home/battles/battles-leaderboard'
import Filter from '@/components/home/battles/filter'
import SectionWrapper from '@/components/home/battles/section-wrapper'
import PageHeader from '@/components/home/page-header'
import RootNotification from '@/components/home/root-notification'
import Loading from '@/components/loading'

export const metadata = () => ({
  title: 'Battles | 漢字ガミ'
})

export default function BattlesPage({
  searchParams
}: {
  searchParams?: {
    status?: string
    page?: string
  }
}) {
  const status = searchParams?.status || ''
  const page = searchParams?.page || '1'

  return (
    <div className="flex flex-col gap-12">
      <PageHeader
        icon={<RiSwordFill />}
        title="Online battles"
        description="Compete with players around the world and learn kanji"
      >
        <Filter currentStatus={status.toUpperCase() as BattleStatus} />
      </PageHeader>

      <RootNotification />

      <div className="flex gap-12">
        <div className="shrink grow">
          <Suspense key={status} fallback={<Loading />}>
            <Battles status={status.toUpperCase() as BattleStatus} page={page} />
          </Suspense>
        </div>

        <SectionWrapper title="All-time leaders" className="w-min-[18rem] w-[18rem]">
          <BattlesLeaderboard />
        </SectionWrapper>
      </div>
    </div>
  )
}
