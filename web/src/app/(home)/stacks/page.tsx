import { Suspense } from 'react'
import { BsStack } from 'react-icons/bs'

import PageHeader from '@/components/home/page-header'
import RootNotification from '@/components/home/root-notification'
import FilterBox from '@/components/home/stacks/filter-box'
import SearchBox from '@/components/home/stacks/search-box'
import StacksList from '@/components/home/stacks/stacks-list'
import Loading from '@/components/loading'
import { auth } from '@/server/auth'

export const metadata = () => ({
  title: 'Kanji stacks | 漢字ガミ'
})

export default async function KanjiStackPage({
  searchParams
}: {
  searchParams?: {
    filter?: string
    search?: string
  }
}) {
  const filterOption = searchParams?.filter || 'all'
  const searchValue = searchParams?.search || ''

  const session = await auth()

  return (
    <div className="flex flex-col gap-12">
      <PageHeader icon={<BsStack />} title="Kanji stack" description="Play game and learn more kanji" />

      <RootNotification />

      <Suspense key={filterOption || searchValue} fallback={<Loading />}>
        <div className="flex items-center justify-between">
          <SearchBox searchValue={searchValue} />

          {session && <FilterBox filterOption={filterOption} />}
        </div>

        <StacksList filterOption={filterOption} searchValue={searchValue} />
      </Suspense>
    </div>
  )
}
