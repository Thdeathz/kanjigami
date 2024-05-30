'use client'

import { IUserInfo } from '@/@types/auth'
import EditUsernameForm from '@/components/home/settings/edit-username-form'
import { Separator } from '@/components/ui/separator'

import EditAvatarForm from './edit-avatar-form'

type Props = {
  user: IUserInfo | null
}

export default function ProfileSettingForm({ user }: Props) {
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
