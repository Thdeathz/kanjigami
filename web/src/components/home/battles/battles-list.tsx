'use client'

import { motion } from 'framer-motion'
import { useCallback, useRef } from 'react'

import { BattleStatus } from '@/@types/battle'
import SectionWrapper from '@/components/home/battles/section-wrapper'
import OnlineBattlePanel from '@/components/home/online-battle-panel'
import Loading from '@/components/loading'
import { useGetAllBattlesQuery } from '@/data/battle'
import { grid } from '@/lib/animation-variants'

type Props = {
  status: BattleStatus
  title: string
  showMore?: boolean
}

export default function BattlesList({ status, title, showMore = false }: Props) {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, isLoading } = useGetAllBattlesQuery(status)

  const intObserver = useRef<IntersectionObserver>()
  const lastPostRef = useCallback(
    (stack: Element | null) => {
      if (isFetchingNextPage) return

      if (intObserver.current) intObserver.current.disconnect()

      intObserver.current = new IntersectionObserver((stacks) => {
        if (stacks[0].isIntersecting && hasNextPage) fetchNextPage()
      })

      if (stack) intObserver.current.observe(stack)
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  )

  if (isLoading) {
    return <Loading className="text-4xl" />
  }

  if (!data || data.pages.length === 0 || data.pages[0].length === 0) return null

  return (
    <SectionWrapper title={title}>
      {data.pages.map((battles) =>
        battles.map((battle) => (
          <motion.div key={battle.id} variants={grid.item()}>
            <OnlineBattlePanel battleData={battle} />
          </motion.div>
        ))
      )}

      {showMore && <div ref={lastPostRef} />}

      {isFetchingNextPage && hasNextPage && (
        <div className="flex-center w-full">
          <Loading className="text-2xl" />
        </div>
      )}
    </SectionWrapper>
  )
}
