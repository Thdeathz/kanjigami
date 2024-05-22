'use client'

import EditUsernameForm from '@/components/home/settings/edit-username-form'
import Loading from '@/components/loading'
import { Separator } from '@/components/ui/separator'
import { useGetCurrentUserInfoQuery } from '@/data/user'

import EditAvatarForm from './edit-avatar-form'

export default function ProfileSettingForm() {
  const { data: user, isLoading } = useGetCurrentUserInfoQuery()

  if (isLoading) return <Loading className="text-2xl" />

  if (!user) return <p className="font-secondary text-center font-medium">User not found</p>

  return (
    <>
      <EditUsernameForm currentUsername={user.name} />

      <Separator className="my-10" />

      <EditAvatarForm currentAvatar={user.image} />

      <p className="font-secondary mt-4 font-medium tracking-[0.2px]">Note: All information entered here is public.</p>
    </>
  )
}
