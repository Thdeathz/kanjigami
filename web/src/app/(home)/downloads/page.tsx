'use client'

import { useEffect, useState } from 'react'

import { IStackDetail } from '@/@types/stack'
import useIndexedDb from '@/hooks/use-indexed-db'

export default function DownloadsPage() {
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
    <div className="space-y-12">
      <h1 className="text-3xl font-bold">Downloads</h1>
      <div className="space-y-4">
        {stacks.map((stack) => (
          <div key={stack.id} className="flex items-center justify-between rounded-lg p-4 shadow-md">
            <div>
              <h2 className="text-xl font-semibold">{stack.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
