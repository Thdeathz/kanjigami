'use client'

import { INotification } from '@/@types/notification'
import SectionWrapper from '@/components/home/battles/section-wrapper'
import PageHeader from '@/components/home/page-header'
import RootNotification from '@/components/home/root-notification'
import ButtonBookmark from '@/components/home/stacks/stack-detail/button-bookmark'
import ButtonDownLoad from '@/components/home/stacks/stack-detail/button-download'
import GamesList from '@/components/home/stacks/stack-detail/games-list'
import StackSideLeaderboard from '@/components/home/stacks/stack-detail/stack-side-leaderboard'
import WordsList from '@/components/home/stacks/stack-detail/words-list'
import Loading from '@/components/loading'
import { useGetStackDetailQuery } from '@/data/stack'

type Props = {
  slug: string
  openWord?: string
  notifications?: INotification[]
}

export default function StackDetailOnlineContent({ slug, openWord, notifications }: Props) {
  const { data: stack, isLoading } = useGetStackDetailQuery(slug)

  if (isLoading) return <Loading className="text-4xl" />

  if (!stack) {
    return <p>Stack not found.</p>
  }

  return (
    <>
      <PageHeader title={stack.name} description={stack.description}>
        <div className="flex-center gap-4">
          <ButtonDownLoad stack={stack} />
          <ButtonBookmark stackId={stack.id} isFollowed={stack.isFollowed} />
        </div>
      </PageHeader>

      <RootNotification notifications={notifications} />

      <GamesList games={stack.games} />

      <div className="flex flex-col gap-6 md:flex-row md:gap-12">
        <div className="w-full shrink grow md:w-0">
          <SectionWrapper title="Kanji list">
            <WordsList words={stack.words} openWord={openWord} />
          </SectionWrapper>
        </div>

        <div className="w-full md:w-[18rem]">
          <SectionWrapper title="Stack leaders">
            <StackSideLeaderboard slug={slug} />
          </SectionWrapper>
        </div>
      </div>
    </>
  )
}
