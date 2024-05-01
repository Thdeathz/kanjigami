'use client'

import { motion } from 'framer-motion'

import useGlobalContext from '@/hooks/use-global-context'

export default function Underlay() {
  const { isOpenSidebar, toggle } = useGlobalContext()

  if (isOpenSidebar)
    return (
      <motion.div
        className="absolute inset-0 mb-[2.5rem] mt-[3.75rem] bg-underlay"
        onClick={toggle}
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        exit={{
          opacity: 0
        }}
      />
    )
}
