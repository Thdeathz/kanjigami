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
import { getNewestNotification } from '@/server/actions/notification'

export const metadata = () => ({
  title: 'Battles',
  description: 'Compete with players around the world and learn more kanji'
})

export default async function BattlesPage({
  searchParams
}: {
  searchParams?: {
    status?: string
  }
}) {
  const status = searchParams?.status || ''
  const notifications = await getNewestNotification()

  return (
    <div className="space-y-8 sm:space-y-12">
      <PageHeader
        icon={<RiSwordFill />}
        title="Online battles"
        description="Compete with players around the world and learn more kanji"
      >
        <Filter currentStatus={status.toUpperCase() as BattleStatus} />
      </PageHeader>

      <RootNotification notifications={notifications} />

      <div className="flex flex-col gap-12 md:flex-row">
        <div className="shrink grow">
          <Suspense key={status} fallback={<Loading />}>
            <Battles status={status.toUpperCase() as BattleStatus} />
          </Suspense>
        </div>

        <SectionWrapper title="All-time leaders" className="w-full md:w-[18rem]">
          <BattlesLeaderboard />
        </SectionWrapper>
      </div>
    </div>
  )
}
