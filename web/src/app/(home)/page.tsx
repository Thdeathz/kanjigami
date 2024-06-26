import FollowingBattle from '@/components/home/homepage/following-battle'
import LatestBattle from '@/components/home/homepage/latest-battle'
import Thumbnail from '@/components/home/homepage/thumbnail'
import RootNotification from '@/components/home/root-notification'
import { getAllBattles } from '@/server/actions/battle'
import { getNewestNotification } from '@/server/actions/notification'
import { getThumbnails } from '@/server/actions/setting'
import { auth } from '@/server/auth'

export const metadata = {
  description:
    '⚔️ 漢字ガミー Learn Japanese kanji through an engaging, game-based platform. Master kanji characters with interactive lessons, fun challenges, and community support. Perfect for all skill levels, Kanjigami makes learning Japanese kanji an adventure!',
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL
  }
}

export default async function Home() {
  const session = await auth()
  const notifications = await getNewestNotification()
  const battles = await getAllBattles({ status: 'FINISHED' })
  const thumbnails = await getThumbnails()

  return (
    <div className="space-y-8 sm:space-y-12">
      <Thumbnail thumbnails={thumbnails} />

      <RootNotification notifications={notifications} />

      <LatestBattle battles={battles} />

      {session && <FollowingBattle />}
    </div>
  )
}
