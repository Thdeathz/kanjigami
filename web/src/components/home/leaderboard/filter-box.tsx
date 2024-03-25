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
    <div className="mt-4">
      <Panel className="p-2">
        <FilterItem title="All-time" isActive />

        <FilterItem title="Kanji stack" />

        <FilterItem title="Online battle" />
      </Panel>
    </div>
  )
}
