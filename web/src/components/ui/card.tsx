import * as React from 'react'

import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'

const cardVariants = cva('rounded-2xl backdrop-blur-[20px]', {
  variants: {
    theme: {
      default: 'bg-panel shadow-panel',
      secondary: 'bg-panel-secondary shadow-panel-secondary'
    }
  },
  defaultVariants: {
    theme: 'default'
  }
})

interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, theme, ...props }, ref) => (
  <div ref={ref} className={cn(cardVariants({ theme }), className)} {...props} />
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('font-semibold leading-none tracking-tight', className)} {...props} />
  )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
)
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
)
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
)
CardFooter.displayName = 'CardFooter'

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: CardProps['theme']
  wrapperClass?: string
}

const Panel = React.forwardRef<HTMLDivElement, PanelProps>(({ wrapperClass, className, theme, ...props }, ref) => (
  <Card className={wrapperClass} theme={theme} ref={ref}>
    <CardContent className={cn('p-8', className)} {...props} />
  </Card>
))
Panel.displayName = 'Panel'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, Panel }
