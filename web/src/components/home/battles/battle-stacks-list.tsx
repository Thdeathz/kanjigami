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

export default function BattleStacksList() {
  return (
    <Panel className="mb-12 flex flex-wrap gap-4 p-4">
      <StackItem name="世代交代" status={battle.STATUS.FINISHED} />

      <StackItem name="世代交代" status={battle.STATUS.FINISHED} />

      <StackItem name="世代交代" status={battle.STATUS.FINISHED} />

      <StackItem name="世代交代" status={battle.STATUS.FINISHED} />

      <StackItem name="世代交代" status={battle.STATUS.FINISHED} />

      <StackItem name="世代交代" status={battle.STATUS.FINISHED} />

      <StackItem name="世代交代" status={battle.STATUS.FINISHED} />
    </Panel>
  )
}
