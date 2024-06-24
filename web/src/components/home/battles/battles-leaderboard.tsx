import { ITopUser } from '@/@types/leaderboard'
import SideLeaderboard from '@/components/home/side-leaderboard'

type Props = {
  topUsers?: ITopUser[] | null
}

export default function BattlesLeaderboard({ topUsers }: Props) {
  if (!topUsers) {
    return <p>Leaderboard not found</p>
  }

  return <SideLeaderboard topUsers={topUsers} />
}
