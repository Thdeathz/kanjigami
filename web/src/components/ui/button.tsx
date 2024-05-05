import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const buttonVariants = cva(
  'inline-flex items-center justify-center text-secondary-btn-text whitespace-nowrap text-sm font-semibold text-base transition-all duration-200 hover:translate-y-[-3px] active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      shape: {
        default: 'rounded-[1000px] px-[0.9rem] py-[0.35rem]',
        circle: 'rounded-full aspect-square'
      },
      variant: {
        default: 'shadow-btn bg-default-btn hover:bg-default-btn-hover',
        primary: 'shadow-btn bg-primary-btn text-white hover:bg-primary-btn-hover',
        danger: 'shadow-btn bg-danger-btn hover:bg-danger-btn-hover',
        link: 'text-primary underline-offset-4 hover:underline',
        outline: 'border border-border-bright bg-input hover:border-border-2'
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
  link?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, tooltip, link, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    if (tooltip) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Comp
                className={cn(link && 'relative', buttonVariants({ variant, size, shape, className }))}
                ref={ref}
                {...props}
              >
                {children}
                {link && <Link className="absolute left-0 top-0 h-full w-full rounded-full" href={link} />}
              </Comp>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return (
      <Comp
        className={cn(link && 'relative', buttonVariants({ variant, size, shape, className }))}
        ref={ref}
        {...props}
      >
        {children}
        {link && <Link className="absolute left-0 top-0 h-full w-full rounded-full" href={link} />}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
