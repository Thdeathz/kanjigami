import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'

import { BattleStatus } from '@/@types/battle'
import { cn } from '@/lib/utils'

const lightStickVariants = cva('battle-lights-container', {
  variants: {
    status: {
      ONGOING: 'battle-lights-container--ongoing',
      UPCOMING: 'battle-lights-container--upcoming',
      FINISHED: 'battle-lights-container--finished'
    }
  },
  defaultVariants: {
    status: 'ONGOING'
  }
})

interface LightStickProps extends VariantProps<typeof lightStickVariants> {
  children?: React.ReactNode
}

function LightStick({ status, children }: LightStickProps) {
  return (
    <div className={cn(lightStickVariants({ status }))}>
      <div className="battle-lights  battle-lights--left  battle-lights--1" />
      <div className="battle-lights  battle-lights--left  battle-lights--2" />

      {children}

      <div className="battle-lights  battle-lights--right  battle-lights--1" />
      <div className="battle-lights  battle-lights--right  battle-lights--2" />
    </div>
  )
}

type Props = {
  icon?: React.ReactNode
  badge?: React.ReactNode
  showLightStick?: BattleStatus
  title: string
  description?: string
  children?: React.ReactNode
}

export default function PageHeader({ icon, badge, showLightStick, title, description, children }: Props) {
  return (
    <div className="page-header flex-center flex-col gap-4">
      {icon && <div className="text-[2rem] text-default-brand">{icon}</div>}

      <div>
        {showLightStick ? (
          <LightStick status={showLightStick}>
            <h1 className="text-[2rem] font-semibold leading-[1.4] text-default-heading">{title}</h1>
          </LightStick>
        ) : (
          <h1 className="text-[2rem] font-semibold leading-[1.4] text-default-heading">{title}</h1>
        )}
      </div>

      {badge && <div className="flex-center gap-4">{badge}</div>}

      {description && (
        <p className="max-w-[48rem] text-center font-medium leading-[1.5] tracking-[0.3px] text-default-text-light">
          {description}
        </p>
      )}

      {children}
    </div>
  )
}
