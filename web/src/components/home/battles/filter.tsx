'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { BattleStatus } from '@/@types/battle'
import { Button } from '@/components/ui/button'
import battle from '@/constants/battle'

export default function Filter() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const isLatest = searchParams.get('status')?.toString().toUpperCase() === battle.STATUS.ONGOING
  const isUpcoming = searchParams.get('status')?.toString().toUpperCase() === battle.STATUS.UPCOMING
  const isPast = searchParams.get('status')?.toString().toUpperCase() === battle.STATUS.FINISHED

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
      <Button onClick={() => handleFilter(battle.STATUS.ONGOING)} variant={isLatest ? 'primary' : 'default'}>
        Latest battles
      </Button>

      <Button onClick={() => handleFilter(battle.STATUS.UPCOMING)} variant={isUpcoming ? 'primary' : 'default'}>
        Upcoming battles
      </Button>

      <Button onClick={() => handleFilter(battle.STATUS.FINISHED)} variant={isPast ? 'primary' : 'default'}>
        Past battles
      </Button>
    </div>
  )
}
