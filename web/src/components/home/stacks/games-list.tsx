import GameItem from '@/components/home/stacks/game-item'
import { Panel } from '@/components/ui/card'

const games = [
  {
    id: '1',
    name: 'Multiple Choice',
    thumbnail: 'https://storage.googleapis.com/kanjigami-61289.appspot.com/images/thumbnails/multiple-choice.png'
  },
  {
    id: '2',
    name: 'Kanji Shooter',
    thumbnail: 'https://storage.googleapis.com/kanjigami-61289.appspot.com/images/thumbnails/kanji-shooter.png'
  },
  {
    id: '3',
    name: 'Typing Racing',
    thumbnail: 'https://storage.googleapis.com/kanjigami-61289.appspot.com/images/thumbnails/typing-racing.png'
  },
  {
    id: '4',
    name: 'Blind Flip Card',
    thumbnail: 'https://storage.googleapis.com/kanjigami-61289.appspot.com/images/thumbnails/flip-blind-card.png'
  }
]

export default function GamesList() {
  return (
    <Panel theme="secondary" className="grid grid-cols-4 gap-8">
      {games.map((game, index) => (
        <GameItem key={game.id} name={game.name} thumbnail={game.thumbnail} />
      ))}
    </Panel>
  )
}
