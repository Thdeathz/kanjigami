import { Panel } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type FilterItemProps = {
  title: string
  isActive?: boolean
}

function FilterItem({ title, isActive = false }: FilterItemProps) {
  return (
    <button
      type="button"
      className={cn('rounded-lg px-4 py-2 font-medium', isActive && 'bg-filter text-default-link shadow-badge')}
    >
      {title}
    </button>
  )
}

export default function FilterBox() {
  return (
    <Panel className="p-2">
      <FilterItem title="All stacks" isActive />

      <FilterItem title="Not played" />

      <FilterItem title="Played" />

      <FilterItem title="Followed" />
    </Panel>
  )
}
