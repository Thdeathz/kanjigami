import { BsStack } from 'react-icons/bs'

import PageHeader from '@/components/home/page-header'
import RootNotification from '@/components/home/root-notification'
import FilterBox from '@/components/home/stacks/filter-box'
import SearchBox from '@/components/home/stacks/search-box'
import StacksList from '@/components/home/stacks/stacks-list'

export const metadata = () => ({
  title: 'Kanji stacks | 漢字ガミ'
})

export default function KanjiStackPage() {
  return (
    <div className="flex flex-col gap-12">
      <PageHeader icon={<BsStack />} title="Kanji stack" description="Play game and learn more kanji" />

      <RootNotification />

      <div className="flex items-center justify-between">
        <SearchBox />

        <FilterBox />
      </div>

      <StacksList />
    </div>
  )
}
