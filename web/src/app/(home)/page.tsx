import FollowingBattle from '@/components/home/homepage/following-battle'
import LatestBattle from '@/components/home/homepage/latest-battle'
import Thumbnail from '@/components/home/homepage/thumbnail'
import RootNotification from '@/components/home/root-notification'
import { getAllBattles } from '@/server/actions/battle'
import { getNewestNotification } from '@/server/actions/notification'
import { auth } from '@/server/auth'

export default async function Home() {
  const session = await auth()
  const notifications = await getNewestNotification()
  const battles = await getAllBattles({ status: 'FINISHED' })

  return (
    <div className="space-y-8 sm:space-y-12">
      <Thumbnail />

      <RootNotification notifications={notifications} />

      <LatestBattle battles={battles} />

      {session && <FollowingBattle />}
    </div>
  )
}
