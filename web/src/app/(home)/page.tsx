import FollowingBattle from '@/components/home/following-battle'
import LatestBattle from '@/components/home/latest-battle'
import RootNotification from '@/components/home/root-notification'
import Thumbnail from '@/components/home/thumbnail'

export default async function Home() {
  return (
    <div className="flex flex-col gap-12">
      <Thumbnail />

      <RootNotification />

      <LatestBattle />

      <FollowingBattle />
    </div>
  )
}
