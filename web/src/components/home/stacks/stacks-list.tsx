'use client'

import { useCallback, useRef } from 'react'

import StackCard from '@/components/home/stack-card'
import Loading from '@/components/loading'
import { useGetAllStacksQuery } from '@/data/stack'

type Props = {
  filterOption?: string
  searchValue?: string
}

export default function StacksList({ filterOption, searchValue }: Props) {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, isLoading } = useGetAllStacksQuery(
    filterOption,
    searchValue
  )

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
    <>
      <div className="grid grid-cols-5 gap-8">
        {data.pages.map((eachPage) => eachPage.map((stack) => <StackCard key={stack.id} stack={stack} />))}

        <div ref={lastPostRef} />
      </div>

      {isFetchingNextPage && hasNextPage && (
        <div className="flex-center w-full">
          <Loading className="text-2xl" />
        </div>
      )}
    </>
  )
}
