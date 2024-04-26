import { IStackGame } from '@/@types/stack'
import GameItem from '@/components/home/stacks/stack-detail/game-item'
import { Panel } from '@/components/ui/card'

type Props = {
  games: IStackGame[]
}

export default function GamesList({ games }: Props) {
  return (
    <Panel theme="secondary" className="grid grid-cols-4 gap-8">
      {games.map((game) => (
        <GameItem key={game.id} name={game.name} thumbnail={game.image} userScore={game.userPoint} />
      ))}
    </Panel>
  )
}
