import MainProfile from '@/components/player/main-profile'
import UserStats from '@/components/player/user-stats'

export default function PlayerProfilePage() {
  return (
    <div className="flex flex-col gap-12">
      <MainProfile />

      <UserStats />
    </div>
  )
}
