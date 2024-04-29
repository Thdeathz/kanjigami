import { IRound } from '@/@types/battle'

import BattleRoundCard from './battle-round-card'

type Props = {
  rounds: IRound[]
}

export default function RoundsList({ rounds }: Props) {
  return (
    <div className="group pointer-events-none grid w-full auto-rows-fr grid-cols-auto-fill gap-6">
      {rounds.map((round) => (
        <BattleRoundCard key={round.order} round={round} />
      ))}
    </div>
  )
}
