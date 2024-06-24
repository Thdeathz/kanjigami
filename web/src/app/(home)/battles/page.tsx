import { Suspense } from 'react'
import { RiSwordFill } from 'react-icons/ri'

import { BattleStatus } from '@/@types/battle'
import Battles from '@/components/home/battles'
import BattlesLeaderboard from '@/components/home/battles/battles-leaderboard'
import FilterBox from '@/components/home/battles/filter-box'
import SectionWrapper from '@/components/home/battles/section-wrapper'
import PageHeader from '@/components/home/page-header'
import RootNotification from '@/components/home/root-notification'
import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { getBattleLeaderboard } from '@/server/actions/leaderboard'
import { getNewestNotification } from '@/server/actions/notification'
import { getCurrentUserInfo } from '@/server/actions/user'

export const metadata = () => ({
  title: 'Battles',
  description: 'Compete with players around the world and learn more kanji',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/battles`
  }
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
  const user = await getCurrentUserInfo()
  const topUsers = await getBattleLeaderboard()

  return (
    <div className="space-y-8 sm:space-y-12">
      <PageHeader
        icon={<RiSwordFill />}
        title="Online battles"
        description="Compete with players around the world and learn more kanji"
      >
        {/* <Filter currentStatus={status.toUpperCase() as BattleStatus} /> */}
        {user?.isPlus && (
          <div className="flex gap-4">
            <Button link="/battles/create">Create a battle</Button>

            <Button>My battles</Button>
          </div>
        )}
      </PageHeader>

      <RootNotification notifications={notifications} />

      <div className="flex flex-col gap-12 md:flex-row">
        <div className="shrink grow">
          <div className="mb-2 flex items-center justify-end">
            <FilterBox filterOption={status.toUpperCase() as BattleStatus} />
          </div>

          <Suspense key={status} fallback={<Loading />}>
            <Battles status={status.toUpperCase() as BattleStatus} />
          </Suspense>
        </div>

        <SectionWrapper title="All-time leaders" className="w-full md:w-[18rem]">
          <BattlesLeaderboard topUsers={topUsers} />
        </SectionWrapper>
      </div>
    </div>
  )
}
