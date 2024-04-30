'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { IconContext, IconType } from 'react-icons'

import { breadCrumb } from '@/lib/animation-variants'
import { cn } from '@/lib/utils'

type Props = {
  icon: React.ReactElement<IconType>
  content: React.ReactNode
  to: string
  lastItem?: boolean
  animate?: boolean
}

function Children({ icon, content, to, lastItem = false }: Omit<Props, 'animate'>) {
  const iconContextValue = useMemo(() => ({ className: '' }), [])

  return (
    <Link href={to} className="flex-center gap-1.5 text-default-text-lightest">
      <IconContext.Provider value={iconContextValue}>
        <div>{icon}</div>
      </IconContext.Provider>

      <p className={cn({ 'text-default-text': lastItem })}>{content}</p>
    </Link>
  )
}

export default function CrumbItem({ animate = false, ...props }: Props) {
  if (animate)
    return (
      <motion.div variants={breadCrumb.item()}>
        <Children {...props} />
      </motion.div>
    )

  return <Children {...props} />
}
