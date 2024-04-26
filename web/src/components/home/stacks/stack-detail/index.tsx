'use client'

import SectionWrapper from '@/components/home/battles/section-wrapper'
import PageHeader from '@/components/home/page-header'
import RootNotification from '@/components/home/root-notification'
import GamesList from '@/components/home/stacks/stack-detail/games-list'
import WordsList from '@/components/home/stacks/stack-detail/words-list'
import Loading from '@/components/loading'
import { useGetStackDetailQuery } from '@/data/stack'

import StackSideLeaderboard from './stack-side-leaderboard'

type Props = {
  slug: string
}

export default function StackDetail({ slug }: Props) {
  const { data: stack, isLoading } = useGetStackDetailQuery(slug)

  if (isLoading) return <Loading className="text-4xl" />

  if (!stack) {
    return <p>Stack not found.</p>
  }

  return (
    <>
      <PageHeader title={stack.name} description={stack.description} />

      <RootNotification />

      <GamesList games={stack.games} />

      <div className="flex gap-12">
        <div className="w-0 shrink grow">
          <SectionWrapper title="Kanji stack">
            <WordsList words={stack.words} />
          </SectionWrapper>
        </div>

        <div className="w-[18rem]">
          <SectionWrapper title="Stack leaders">
            <StackSideLeaderboard slug={slug} />
          </SectionWrapper>
        </div>
      </div>
    </>
  )
}
