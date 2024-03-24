'use client'

import { motion } from 'framer-motion'

import SectionWrapper from '@/components/home/battles/section-wrapper'
import OnlineBattlePanel from '@/components/home/online-battle-panel'
import { Button } from '@/components/ui/button'
import { grid } from '@/lib/animation-variants'

type Props = {
  title: string
}

export default function BattlesList({ title }: Props) {
  return (
    <SectionWrapper title={title}>
      <motion.div variants={grid.item()}>
        <OnlineBattlePanel />
      </motion.div>

      <motion.div variants={grid.item()}>
        <OnlineBattlePanel />
      </motion.div>

      <motion.div variants={grid.item()}>
        <OnlineBattlePanel />
      </motion.div>

      <div className="flex-center">
        <Button variant="link" className="w-min">
          Show more
        </Button>
      </div>
    </SectionWrapper>
  )
}
