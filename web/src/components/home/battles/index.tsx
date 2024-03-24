import { BattleStatus } from '@/@types/battle'
import BattlesList from '@/components/home/battles/battles-list'

type Props = {
  status?: BattleStatus
}

export default function Battles({ status }: Props) {
  if (status === 'latest') {
    return <BattlesList title="Latest battles" />
  }

  if (status === 'upcoming') {
    return <BattlesList title="Upcoming battles" />
  }

  if (status === 'past') {
    return <BattlesList title="Past battles" />
  }

  return (
    <>
      <BattlesList title="Latest battles" />
      <BattlesList title="Upcoming battles" />
      <BattlesList title="Past battles" />
    </>
  )
}
