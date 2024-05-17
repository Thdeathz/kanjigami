import { Session } from 'next-auth'

import FollowingBattle from '@/components/home/homepage/following-battle'
import LatestBattle from '@/components/home/homepage/latest-battle'
import Thumbnail from '@/components/home/homepage/thumbnail'
import RootNotification from '@/components/home/root-notification'

type Props = {
  session: Session | null
}

export default function OnlineContent({ session }: Props) {
  return (
    <div className="space-y-12">
      <Thumbnail />

      <RootNotification />

      <LatestBattle />

      {session && <FollowingBattle />}
    </div>
  )
}
