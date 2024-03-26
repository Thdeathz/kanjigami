import React from 'react'
import { type IconType } from 'react-icons'

type Props = {
  icon: React.ReactElement<IconType>
  label: string
  value: string
}

export default function ProfileStats({ icon, label, value }: Props) {
  return (
    <div className="profile-stats flex-center relative mt-2 basis-1/2 flex-col p-3 text-center leading-[1.4]">
      <p className="mb-2 mt-[-1.5rem] text-2xl text-default-brand">{icon}</p>
      <p className="text-lg font-semibold text-default-heading">{value}</p>
      <p className="text-sm font-medium text-default-text-lightest">{label}</p>
    </div>
  )
}
