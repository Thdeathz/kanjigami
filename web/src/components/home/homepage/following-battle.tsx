'use client'

import { useCallback, useRef } from 'react'
import { BsStack } from 'react-icons/bs'

import HomeSection from '@/components/home/homepage/home-section'
import StackCard from '@/components/home/stack-card'
import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { useGetAllStacksQuery } from '@/data/stack'

export default function FollowingBattle() {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, isLoading } = useGetAllStacksQuery('followed')

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

  if (!data) {
    return <p>No stack found.</p>
  }

  return (
    <HomeSection
      title="Following kanji stack"
      description="Play game and learn more kanji"
      icon={<BsStack />}
      viewButton={<Button onClick={() => {}}>View all kanji stacks</Button>}
    >
      <div className="grid grid-cols-5 gap-8">
        {data.pages.map((eachPage) =>
          eachPage.map((stack) => (
            <StackCard
              key={stack.id}
              name={stack.name}
              image={stack.image}
              slug={stack.slug}
              userPoint={stack.userPoint}
              isFollowed={stack.isFollowed}
            />
          ))
        )}
      </div>

      <div ref={lastPostRef} />

      {isFetchingNextPage && hasNextPage && (
        <div className="flex-center w-full">
          <Loading className="text-2xl" />
        </div>
      )}
    </HomeSection>
  )
}
