'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import React from 'react'
import { BiSolidChevronRight } from 'react-icons/bi'
import { BsStack } from 'react-icons/bs'
import { RiSwordFill } from 'react-icons/ri'

import { breadCrumb } from '@/lib/animation-variants'

import CrumbItem from './CrumbItem'

function Crumb({ pathnames }: { pathnames: string[] }) {
  if (pathnames.length < 2) return null

  if (pathnames[0] === 'battles')
    return (
      <>
        <CrumbItem icon={<RiSwordFill />} content="Battles" to="/battles" />

        {pathnames.length > 1 && (
          <CrumbItem
            icon={<BiSolidChevronRight />}
            content={`Battle #${pathnames[1]}`}
            to={`/battles/${pathnames[1]}`}
            lastItem
            animate
          />
        )}
      </>
    )

  if (pathnames[0] === 'stacks')
    return (
      <>
        <CrumbItem icon={<BsStack />} content="Stacks" to="/stacks" />

        {pathnames.length > 1 && (
          <CrumbItem
            icon={<BiSolidChevronRight />}
            content={`Stack #${pathnames[1]}`}
            to={`/stacks/${pathnames[1]}`}
            lastItem
            animate
          />
        )}
      </>
    )
  return null
}

export default function Breadcrumb() {
  const pathnames = usePathname()
    .split('/')
    .filter((x) => x)

  return (
    <motion.div
      className="flex items-center gap-1.5 font-medium"
      variants={breadCrumb.container()}
      initial="hidden"
      animate="enter"
    >
      <Crumb pathnames={pathnames} />
    </motion.div>
  )
}
