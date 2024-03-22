import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center text-secondary-btn-text whitespace-nowrap text-sm font-semibold text-base transition-all duration-200 hover:translate-y-[-3px] active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      shape: {
        default: 'rounded-[1000px] px-3 py-[0.35rem]',
        circle: 'rounded-full aspect-square'
      },
      variant: {
        default: 'shadow-btn bg-default-btn hover:bg-btn-hover',
        primary: 'shadow-btn bg-primary-btn hover:bg-btn-hover',
        danger: 'shadow-btn bg-danger-btn hover:bg-btn-hover',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-[2.5rem]',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  tooltip?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, tooltip, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    if (tooltip) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Comp className={cn(buttonVariants({ variant, size, shape, className }))} ref={ref} {...props} />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return <Comp className={cn(buttonVariants({ variant, size, shape, className }))} ref={ref} {...props} />
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
