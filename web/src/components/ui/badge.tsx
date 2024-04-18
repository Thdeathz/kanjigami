import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex font-secondary uppercase items-center rounded px-2 py-[0.2rem] text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 leading-[1rem] shadow-badge',
  {
    variants: {
      variant: {
        default: 'bg-badge-default',
        secondary: 'bg-secondary text-secondary-foreground',
        FINISHED: 'bg-badge-danger text-white',
        UPCOMING: 'bg-badge-warning text-badge-warning-text',
        ONGOING: 'bg-badge-success text-badge-success-text',
        outline: 'border text-foreground shadow-none'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
