'use client'

import { IUserProfile } from '@/@types/user'
import MainProfile from '@/components/home/player/main-profile'
import UserStats from '@/components/home/player/user-stats'

type Props = {
  userProfile?: IUserProfile
}

export default function UserProfile({ userProfile }: Props) {
  if (!userProfile) return <div>User not found.</div>

  return (
    <div className="space-y-8 sm:space-y-12">
      <MainProfile user={userProfile.user} />

      <UserStats event={userProfile.stats.event} stack={userProfile.stats.stack} />
    </div>
  )
}
