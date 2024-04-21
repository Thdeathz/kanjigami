'use client'

import MainProfile from '@/components/home/player/main-profile'
import UserStats from '@/components/home/player/user-stats'
import Loading from '@/components/loading'
import { useGetUserProfileQuery } from '@/data/user'

type Props = {
  username: string
}

export default function UserProfile({ username }: Props) {
  const { data: userProfile, isLoading } = useGetUserProfileQuery(username)

  if (isLoading) return <Loading className="text-4xl" />

  if (!userProfile) return <div>User not found.</div>

  return (
    <div className="flex flex-col gap-12">
      <MainProfile user={userProfile.user} />

      <UserStats event={userProfile.stats.event} stack={userProfile.stats.stack} />
    </div>
  )
}
