import React from 'react'
import { type IconType } from 'react-icons'

type Props = {
  icon: React.ReactElement<IconType>
  title: string
  description: string
  children?: React.ReactNode
}

export default function PageHeader({ icon, title, description, children }: Props) {
  return (
    <div className="page-header flex-center flex-col gap-4">
      <div className="text-[2rem] text-default-brand">{icon}</div>

      <h1 className="text-[2rem] font-semibold leading-[1.4] text-default-heading">{title}</h1>

      <p className="font-medium leading-[1.5] tracking-[0.3px] text-default-text-light">{description}</p>

      {children}
    </div>
  )
}
