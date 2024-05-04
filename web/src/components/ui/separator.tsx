'use client'

import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

import { cn } from '@/lib/utils'

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn('shrink-0 bg-border', orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]', className)}
    {...props}
  />
))
Separator.displayName = SeparatorPrimitive.Root.displayName

type SectionDividerProps = {
  title: string
  className?: string
}

const SectionDivider = ({ title, className }: SectionDividerProps) => {
  return (
    <div className={cn('flex-center', className)}>
      <span className="whitespace-nowrap bg-box pe-4 font-semibold">{title}</span>
      <Separator className="w-0 shrink grow" />
    </div>
  )
}
SectionDivider.displayName = 'SectionDivider'

export { Separator, SectionDivider }
