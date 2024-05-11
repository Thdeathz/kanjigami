/* eslint-disable react/no-array-index-key */

import { BattleStatus } from '@/@types/battle'
import { Button } from '@/components/ui/button'
import { Panel } from '@/components/ui/card'
import battle from '@/constants/battle'
import { cn } from '@/lib/utils'

type StackItemProps = {
  name: string
  status: BattleStatus
}

function StackItem({ name, status }: StackItemProps) {
  return (
    <Button
      link="/stacks"
      variant="link"
      className={cn('text-lg', status === battle.STATUS.FINISHED && 'line-through')}
      disabled={status !== battle.STATUS.ONGOING}
    >
      {name}
    </Button>
  )
}

type Props = {
  stacks: {
    slug: number
    name: string
    status: BattleStatus
  }[]
}

export default function BattleStacksList({ stacks }: Props) {
  return (
    <Panel className="mb-12 flex flex-wrap gap-4 p-4">
      {stacks.map((stack, index) => (
        <StackItem key={`${stack.slug}-${index}`} name={stack.name} status={stack.status} />
      ))}
    </Panel>
  )
}
