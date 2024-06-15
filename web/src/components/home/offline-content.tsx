'use client'

import { useEffect, useState } from 'react'

import { IStackDetail } from '@/@types/stack'
import PageHeader from '@/components/home/page-header'
import StackCard from '@/components/home/stack-card'
import useIndexedDb from '@/hooks/use-indexed-db'

export default function OfflineContent() {
  const [stacks, setStacks] = useState<IStackDetail[]>([])
  const { getAll } = useIndexedDb<IStackDetail>('local-data', 'stacks')

  useEffect(() => {
    const handleGetOfflineStacks = async () => {
      const offlineStacks = await getAll()
      setStacks(offlineStacks)
    }

    handleGetOfflineStacks()

    return () => {
      setStacks([])
    }
  }, [])

  return (
    <div className="space-y-8 sm:space-y-12">
      <PageHeader title="Saved stacks" description="Downloaded stacks for offline learning" />

      <div className="grid grid-cols-5 gap-8">
        {stacks.map((stack) => (
          <StackCard
            key={stack.id}
            stackId={stack.id}
            name={stack.name}
            image="/images/lock.png"
            slug={stack.slug}
            isFollowed={stack.isFollowed}
          />
        ))}
      </div>
    </div>
  )
}
