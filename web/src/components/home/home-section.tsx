import React from 'react'
import { type IconType } from 'react-icons'

import { cn } from '@/lib/utils'

type Props = {
  title: string
  description?: string
  icon?: React.ReactElement<IconType>
  viewButton?: React.ReactNode
  className?: string
  children: React.ReactNode
}

export default function HomeSection({ title, description, icon, viewButton, className, children }: Props) {
  return (
    <div className={cn('min-w-full max-w-full', className)}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-full items-center justify-start gap-4">
          {icon && (
            <div className="flex-center aspect-square h-14 w-14 rounded-full bg-border-1 text-2xl text-default-brand">
              {icon}
            </div>
          )}

          <div className="flex w-full flex-col items-start justify-between">
            <h2 className="text-2xl font-semibold leading-[1.4] text-default-heading">{title}</h2>
            {description && (
              <p className="text-base font-medium leading-[1.5] text-default-text-light">{description}</p>
            )}
          </div>
        </div>

        {viewButton}
      </div>

      {children}
    </div>
  )
}
