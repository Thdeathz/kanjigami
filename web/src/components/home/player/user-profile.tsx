'use client'

import { IUserProfile } from '@/@types/user'
import MainProfile from '@/components/home/player/main-profile'
import UserStats from '@/components/home/player/user-stats'

type Props = {
  userProfile?: IUserProfile
  isCurrentUser?: boolean
}

export default function UserProfile({ userProfile, isCurrentUser = false }: Props) {
  if (!userProfile) return <div>User not found.</div>

  return (
    <div className="space-y-8 sm:space-y-12">
      <MainProfile user={userProfile.user} isCurrentUser={isCurrentUser} />

      <UserStats event={userProfile.stats.event} stack={userProfile.stats.stack} />
    </div>
  )
}
