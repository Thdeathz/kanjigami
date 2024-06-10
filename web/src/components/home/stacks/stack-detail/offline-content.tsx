'use client'

import { useEffect, useState } from 'react'

import { IStackDetail } from '@/@types/stack'
import SectionWrapper from '@/components/home/battles/section-wrapper'
import PageHeader from '@/components/home/page-header'
import GamesList from '@/components/home/stacks/stack-detail/games-list'
import WordsList from '@/components/home/stacks/stack-detail/words-list'
import useIndexedDb from '@/hooks/use-indexed-db'

type Props = {
  slug: string
  openWord?: string
}

export default function StackDetailOfflineContent({ slug, openWord }: Props) {
  const [stack, setStack] = useState<IStackDetail>()
  const { get } = useIndexedDb<IStackDetail>('local-data', 'stacks')

  useEffect(() => {
    const handleGetOfflineStacks = async () => {
      const offlineStack = await get(slug)
      console.log(offlineStack)
      setStack(offlineStack)
    }

    handleGetOfflineStacks()

    return () => {
      setStack(undefined)
    }
  }, [])

  if (!stack) {
    return <p className="text-center text-lg font-medium">Stack not found.</p>
  }

  return (
    <>
      <PageHeader title={stack.name} description={stack.description} />

      <GamesList games={stack.games} />

      <div className="flex gap-12">
        <div className="w-0 shrink grow">
          <SectionWrapper title="Kanji list">
            <WordsList words={stack.words} openWord={openWord} />
          </SectionWrapper>
        </div>

        <div className="w-[18rem]">
          <SectionWrapper title="Stack leaders">
            <p className="font-secondary font-medium opacity-65">Leaderboard empty.</p>
          </SectionWrapper>
        </div>
      </div>
    </>
  )
}
