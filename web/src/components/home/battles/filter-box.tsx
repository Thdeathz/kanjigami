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

  const isActiveAll = !filterOption || filterOption === 'ALL'
  const isActiveNotPlayed = filterOption === 'ONGOING'
  const isActivePlayed = filterOption === 'UPCOMING'
  const isActiveFollowed = filterOption === 'FINISHED'

  return (
    <Panel wrapperClass="w-min whitespace-nowrap" className="p-2">
      <FilterItem title="All" isActive={isActiveAll} onClick={() => onSearch('status', 'ALL')} />

      <FilterItem title="Latest" isActive={isActiveNotPlayed} onClick={() => onSearch('status', 'ONGOING')} />

      <FilterItem title="Upcoming" isActive={isActivePlayed} onClick={() => onSearch('status', 'UPCOMING')} />

      <FilterItem title="Past" isActive={isActiveFollowed} onClick={() => onSearch('status', 'FINISHED')} />
    </Panel>
  )
}
