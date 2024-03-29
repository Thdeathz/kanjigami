import { BattleStatus } from '@/@types/battle'
import { Button } from '@/components/ui/button'
import { Panel } from '@/components/ui/card'
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
      className={cn('text-lg', status === 'finished' && 'line-through')}
      disabled={status !== 'ongoing'}
    >
      {name}
    </Button>
  )
}

export default function BattleStacksList() {
  return (
    <Panel className="mb-12 flex flex-wrap gap-4 p-4">
      <StackItem name="世代交代" status="finished" />

      <StackItem name="世代交代" status="finished" />

      <StackItem name="世代交代" status="finished" />

      <StackItem name="世代交代" status="finished" />

      <StackItem name="世代交代" status="finished" />

      <StackItem name="世代交代" status="finished" />

      <StackItem name="世代交代" status="finished" />
    </Panel>
  )
}
