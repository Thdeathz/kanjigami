import { Suspense } from 'react'
import { BsStack } from 'react-icons/bs'

import PageHeader from '@/components/home/page-header'
import RootNotification from '@/components/home/root-notification'
import FilterBox from '@/components/home/stacks/filter-box'
import SearchBox from '@/components/home/stacks/search-box'
import StacksList from '@/components/home/stacks/stacks-list'
import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { getNewestNotification } from '@/server/actions/notification'
import { getCurrentUserInfo } from '@/server/actions/user'

export const metadata = () => ({
  title: 'Kanji stacks',
  description: 'Play game and learn more kanji'
})

export default async function KanjiStackPage({
  searchParams
}: {
  searchParams?: {
    topic?: string
    filter?: string
    search?: string
  }
}) {
  const topic = searchParams?.topic || ''
  const filterOption = searchParams?.filter || 'all'
  const searchValue = searchParams?.search || ''

  const user = await getCurrentUserInfo()
  const notifications = await getNewestNotification()

  return (
    <div className="space-y-8 sm:space-y-12">
      <PageHeader icon={<BsStack />} title="Kanji stack" description="Play game and learn more kanji">
        {user?.isPlus && (
          <div className="flex gap-4">
            <Button link="/stacks/create">Create new stack</Button>

            <Button>My stacks</Button>
          </div>
        )}
      </PageHeader>

      <RootNotification notifications={notifications} />

      <Suspense key={filterOption || searchValue || topic} fallback={<Loading />}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          <SearchBox searchValue={searchValue} topic={topic} />

          {user && <FilterBox filterOption={filterOption} />}
        </div>

        <StacksList filterOption={filterOption} searchValue={searchValue} topic={topic} isLoggedIn={!!user} />
      </Suspense>
    </div>
  )
}
