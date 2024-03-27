import FilterItem from '@/components/home/filter-item'
import { Panel } from '@/components/ui/card'

export default function FilterBox() {
  return (
    <div className="mt-4">
      <Panel className="p-2">
        <FilterItem title="following amid fawn" />
      </Panel>
    </div>
  )
}
