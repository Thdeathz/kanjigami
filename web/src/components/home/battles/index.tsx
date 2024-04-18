import { BattleStatus } from '@/@types/battle'
import BattlesList from '@/components/home/battles/battles-list'
import battle from '@/constants/battle'

type Props = {
  status?: BattleStatus
  page: string
}

export default function Battles({ status, page }: Props) {
  if (status === battle.STATUS.ONGOING) {
    return <BattlesList status={battle.STATUS.ONGOING} page={page} showMore title="Ongoing battles" />
  }

  if (status === battle.STATUS.UPCOMING) {
    return <BattlesList status={battle.STATUS.UPCOMING} page={page} showMore title="Upcoming battles" />
  }

  if (status === battle.STATUS.FINISHED) {
    return <BattlesList status={battle.STATUS.FINISHED} page={page} showMore title="Past battles" />
  }

  return (
    <>
      <BattlesList status={battle.STATUS.ONGOING} page="1" title="Ongoing battles" />
      <BattlesList status={battle.STATUS.UPCOMING} page="1" title="Upcoming battles" />
      <BattlesList status={battle.STATUS.FINISHED} page="1" title="Past battles" />
    </>
  )
}
