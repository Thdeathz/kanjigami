import { BattleStatus } from '@/@types/battle'
import BattlesList from '@/components/home/battles/battles-list'
import battle from '@/constants/battle'

type Props = {
  status?: BattleStatus
}

export default function Battles({ status }: Props) {
  if (status === battle.STATUS.ONGOING) {
    return <BattlesList status={battle.STATUS.ONGOING} showMore title="Ongoing battles" />
  }

  if (status === battle.STATUS.UPCOMING) {
    return <BattlesList status={battle.STATUS.UPCOMING} showMore title="Upcoming battles" />
  }

  if (status === battle.STATUS.FINISHED) {
    return <BattlesList status={battle.STATUS.FINISHED} showMore title="Past battles" />
  }

  return (
    <>
      <BattlesList status={battle.STATUS.ONGOING} title="Ongoing battles" />
      <BattlesList status={battle.STATUS.UPCOMING} title="Upcoming battles" />
      <BattlesList status={battle.STATUS.FINISHED} title="Past battles" />
    </>
  )
}
