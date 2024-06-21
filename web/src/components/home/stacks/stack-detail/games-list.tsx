import { IStackGame } from '@/@types/stack'
import GameItem from '@/components/home/stacks/stack-detail/game-item'
import { Panel } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

type Props = {
  games: IStackGame[]
}

export default function GamesList({ games }: Props) {
  return (
    <Panel theme="secondary">
      <ScrollArea>
        <div className="flex-center w-full gap-8 overflow-y-auto">
          {games.map((game) => (
            <GameItem key={game.id} game={game} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Panel>
  )
}
