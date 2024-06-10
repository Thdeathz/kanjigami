'use client'

import { BattleStatus } from '@/@types/battle'
import { Button } from '@/components/ui/button'
import battle from '@/constants/battle'
import useQueryParams from '@/hooks/use-query-params'

type Props = {
  currentStatus?: BattleStatus
}

export default function Filter({ currentStatus }: Props) {
  const { onSearch } = useQueryParams()

  const isLatest = currentStatus === battle.STATUS.ONGOING
  const isUpcoming = currentStatus === battle.STATUS.UPCOMING
  const isPast = currentStatus === battle.STATUS.FINISHED

  return (
    <div className="flex-center mt-4 flex-col gap-4 sm:flex-row">
      <Button onClick={() => onSearch('status', battle.STATUS.ONGOING)} variant={isLatest ? 'primary' : 'default'}>
        Latest battles
      </Button>

      <Button onClick={() => onSearch('status', battle.STATUS.UPCOMING)} variant={isUpcoming ? 'primary' : 'default'}>
        Upcoming battles
      </Button>

      <Button onClick={() => onSearch('status', battle.STATUS.FINISHED)} variant={isPast ? 'primary' : 'default'}>
        Past battles
      </Button>
    </div>
  )
}
