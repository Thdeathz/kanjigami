import { BattleStatus } from '@/@types/battle'
import BattlesList from '@/components/home/battles/battles-list'

type Props = {
  status?: BattleStatus
}

export default function Battles({ status }: Props) {
  if (status === 'ongoing') {
    return <BattlesList title="Ongoing battles" />
  }

  if (status === 'upcoming') {
    return <BattlesList title="Upcoming battles" />
  }

  if (status === 'finished') {
    return <BattlesList title="Past battles" />
  }

  return (
    <>
      <BattlesList title="Ongoing battles" />
      <BattlesList title="Upcoming battles" />
      <BattlesList title="Past battles" />
    </>
  )
}
