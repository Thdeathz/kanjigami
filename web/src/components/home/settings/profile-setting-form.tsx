'use client'

import EditUsernameForm from '@/components/home/settings/edit-username-form'
import { Panel } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import EditAvatarForm from './edit-avatar-form'

export default function ProfileSettingForm() {
  return (
    <Panel>
      <EditUsernameForm />

      <Separator className="my-10" />

      <EditAvatarForm />

      <p className="font-secondary mt-4 font-medium tracking-[0.2px]">Note: All information entered here is public.</p>
    </Panel>
  )
}
