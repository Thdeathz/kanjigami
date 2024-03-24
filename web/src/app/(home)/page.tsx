import FollowingBattle from '@/components/home/homepage/following-battle'
import LatestBattle from '@/components/home/homepage/latest-battle'
import Thumbnail from '@/components/home/homepage/thumbnail'
import RootNotification from '@/components/home/root-notification'

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
