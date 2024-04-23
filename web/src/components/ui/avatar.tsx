'use client'

import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { VariantProps, cva } from 'class-variance-authority'

const avatarVariants = cva('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', {
  variants: {
    size: {
      large: 'h-12 w-12',
      normal: 'h-10 w-10',
      small: 'h-8 w-8'
    }
  },
  defaultVariants: {
    size: 'normal'
  }
})

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ className, size, ...props }, ref) => (
    <AvatarPrimitive.Root ref={ref} className={cn(avatarVariants({ size }), className)} {...props} />
  )
)
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn('aspect-square h-full w-full', className)} {...props} />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn('flex h-full w-full items-center justify-center rounded-full bg-muted', className)}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

type UserAvatarProps = {
  src?: string
  fallback?: string
  alt: string
  plus?: boolean
  size?: AvatarProps['size']
} & React.ComponentProps<typeof Avatar>

const UserAvatar = ({ src, fallback, alt, plus = false, size, className, ...props }: UserAvatarProps) => {
  return (
    <div className="relative">
      <Avatar size={size} className={cn(plus && 'plus-avatar-mask', className)} {...props}>
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback>{fallback ?? alt.slice(0, 1)}</AvatarFallback>
      </Avatar>
      {plus && (
        <Image
          src="/images/plus-badge.svg"
          alt="plus-badge"
          width="30"
          height="15"
          className="plus-badge absolute bottom-[-4px] right-1/2 z-[2] translate-x-1/2"
        />
      )}
    </div>
  )
}

export { Avatar, AvatarImage, AvatarFallback, UserAvatar }
