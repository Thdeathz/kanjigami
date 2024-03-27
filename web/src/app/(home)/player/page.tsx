import MainProfile from '@/components/home/player/main-profile'
import UserStats from '@/components/home/player/user-stats'

export default function PlayerProfilePage() {
  return (
    <div className="flex flex-col gap-12">
      <MainProfile />

      <UserStats />
    </div>
  )
}
