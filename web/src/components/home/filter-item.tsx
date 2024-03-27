import { cn } from '@/lib/utils'

type Props = {
  title: string
  isActive?: boolean
}

export default function FilterItem({ title, isActive = false }: Props) {
  return (
    <button
      type="button"
      className={cn('rounded-lg px-4 py-2 font-medium', isActive && 'bg-filter text-default-link shadow-badge')}
    >
      {title}
    </button>
  )
}
