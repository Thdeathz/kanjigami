import { AiOutlineLoading } from 'react-icons/ai'

import { cn } from '@/lib/utils'

type Props = {
  className?: string
}

export default function Loading({ className }: Props) {
  return <AiOutlineLoading className={cn('animate-spin', className)} />
}
