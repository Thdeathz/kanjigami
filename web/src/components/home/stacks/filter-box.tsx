'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Panel } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type FilterItemProps = {
  title: string
  isActive?: boolean
  onClick?: () => void
}

function FilterItem({ title, isActive = false, onClick }: FilterItemProps) {
  const handleOnClick = () => {
    if (typeof onClick === 'function') onClick()
  }

  return (
    <button
      type="button"
      className={cn('rounded-lg px-4 py-2 font-medium', isActive && 'bg-filter text-default-link shadow-badge')}
      onClick={handleOnClick}
    >
      {title}
    </button>
  )
}

type Props = {
  filterOption?: string
}

export default function FilterBox({ filterOption }: Props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const isActiveAll = !filterOption || filterOption === 'all'
  const isActiveNotPlayed = filterOption === 'not-played'
  const isActivePlayed = filterOption === 'played'
  const isActiveFollowed = filterOption === 'followed'

  const onFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams)

    if (filter) {
      params.set('filter', filter)
    } else {
      params.delete('filter')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Panel className="p-2">
      <FilterItem title="All stacks" isActive={isActiveAll} onClick={() => onFilter('all')} />

      <FilterItem title="Not played" isActive={isActiveNotPlayed} onClick={() => onFilter('not-played')} />

      <FilterItem title="Played" isActive={isActivePlayed} onClick={() => onFilter('played')} />

      <FilterItem title="Followed" isActive={isActiveFollowed} onClick={() => onFilter('followed')} />
    </Panel>
  )
}
