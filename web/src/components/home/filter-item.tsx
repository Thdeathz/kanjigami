import Link from 'next/link'

import { cn } from '@/lib/utils'

type Props = {
  title: string
  isActive?: boolean
  to?: string
}

export default function FilterItem({ title, isActive = false, to }: Props) {
  if (to)
    return (
      <Link
        href={to}
        className={cn(
          'inline-block rounded-lg px-4 py-2 font-medium',
          isActive && 'bg-filter text-default-link shadow-badge'
        )}
      >
        {title}
      </Link>
    )

  return (
    <button
      type="button"
      className={cn('rounded-lg px-4 py-2 font-medium', isActive && 'bg-filter text-default-link shadow-badge')}
    >
      {title}
    </button>
  )
}
