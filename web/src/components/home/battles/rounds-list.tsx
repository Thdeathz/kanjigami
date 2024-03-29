import BattleRoundCard from './battle-round-card'

export default function RoundsList() {
  return (
    <div className="group pointer-events-none grid w-full auto-rows-fr grid-cols-auto-fill gap-6">
      <BattleRoundCard status="upcoming" />

      <BattleRoundCard status="upcoming" />

      <BattleRoundCard status="upcoming" />

      <BattleRoundCard status="upcoming" />

      <BattleRoundCard status="upcoming" />

      <BattleRoundCard status="upcoming" />
    </div>
  )
}
