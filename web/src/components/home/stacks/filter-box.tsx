'use client'

import { Panel } from '@/components/ui/card'
import useQueryParams from '@/hooks/use-query-params'
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
  const { onSearch } = useQueryParams()

  const isActiveAll = !filterOption || filterOption === 'all'
  const isActiveNotPlayed = filterOption === 'not-played'
  const isActivePlayed = filterOption === 'played'
  const isActiveFollowed = filterOption === 'followed'

  return (
    <Panel className="p-2">
      <FilterItem title="All stacks" isActive={isActiveAll} onClick={() => onSearch('filter', 'all')} />

      <FilterItem title="Not played" isActive={isActiveNotPlayed} onClick={() => onSearch('filter', 'not-played')} />

      <FilterItem title="Played" isActive={isActivePlayed} onClick={() => onSearch('filter', 'played')} />

      <FilterItem title="Followed" isActive={isActiveFollowed} onClick={() => onSearch('filter', 'followed')} />
    </Panel>
  )
}
