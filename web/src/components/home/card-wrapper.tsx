import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { cn } from '@/lib/utils'

type Props = {
  link?: string
  className?: string
  children: React.ReactNode
  imageUrl?: string
  disabled?: boolean
  linkLabel?: string
}

export default function CardWrapper({
  imageUrl = '/images/lock.png',
  link,
  className,
  disabled = false,
  linkLabel = 'Card link',
  children
}: Props) {
  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl bg-stack p-[0.6rem] shadow-stack-light transition-transform duration-200 hover:scale-105 dark:shadow-stack-dark',
        className
      )}
    >
      {link && !disabled && (
        <Link href={link} className="absolute right-0 top-0 h-full w-full rounded-2xl" aria-label={linkLabel} />
      )}
      <Image
        src={imageUrl}
        alt="kanji-stack"
        width="300"
        height="300"
        priority
        className="aspect-4/3 w-full rounded-[0.4rem] border-[3px] border-default-stack"
      />

      {children}
    </div>
  )
}
