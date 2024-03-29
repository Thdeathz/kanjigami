'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { BattleStatus } from '@/@types/battle'
import { Button } from '@/components/ui/button'

export default function Filter() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const isLatest = searchParams.get('status')?.toString() === 'latest'
  const isUpcoming = searchParams.get('status')?.toString() === 'upcoming'
  const isPast = searchParams.get('status')?.toString() === 'past'

  const handleFilter = (filter: BattleStatus) => {
    const params = new URLSearchParams(searchParams)

    if (filter) {
      params.set('status', filter)
    } else {
      params.delete('status')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex-center mt-4 gap-4">
      <Button onClick={() => handleFilter('ongoing')} variant={isLatest ? 'primary' : 'default'}>
        Latest battles
      </Button>

      <Button onClick={() => handleFilter('upcoming')} variant={isUpcoming ? 'primary' : 'default'}>
        Upcoming battles
      </Button>

      <Button onClick={() => handleFilter('finished')} variant={isPast ? 'primary' : 'default'}>
        Past battles
      </Button>
    </div>
  )
}
