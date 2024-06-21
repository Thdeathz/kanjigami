'use client'

import { motion } from 'framer-motion'
import React from 'react'

import { grid } from '@/lib/animation-variants'
import { cn } from '@/lib/utils'

type Props = {
  title: string
  children: React.ReactNode
  className?: string
}

export default function SectionWrapper({ children, title, className }: Props) {
  return (
    <div className={cn('mb-8 flex flex-col gap-4', className)}>
      <h2 className="text-[1.375rem] font-semibold leading-[1.4] text-default-heading">{title}</h2>

      <motion.div className="flex flex-col gap-8" variants={grid.container(0)} initial="hidden" animate="enter">
        {children}
      </motion.div>
    </div>
  )
}
