import FollowingBattle from '@/components/home/homepage/following-battle'
import LatestBattle from '@/components/home/homepage/latest-battle'
import Thumbnail from '@/components/home/homepage/thumbnail'
import RootNotification from '@/components/home/root-notification'
import { auth } from '@/server/auth'

export default async function Home() {
  const session = await auth()

  return (
    <div className="space-y-12">
      <Thumbnail />

      <RootNotification />

      <LatestBattle />

      {session && <FollowingBattle />}
    </div>
  )
}
