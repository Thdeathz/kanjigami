'use client'

import { motion } from 'framer-motion'

import { BattleStatus } from '@/@types/battle'
import SectionWrapper from '@/components/home/battles/section-wrapper'
import OnlineBattlePanel from '@/components/home/online-battle-panel'
import Loading from '@/components/loading'
import { useGetAllBattlesQuery } from '@/data/battle'
import { grid } from '@/lib/animation-variants'

import ShowMoreButton from './show-more-button'

type BattlesListDataProps = {
  status: Props['status']
  page: Props['page']
}

function BattlesListData({ status, page }: BattlesListDataProps) {
  const { data: battles, isLoading } = useGetAllBattlesQuery(status, page)

  if (isLoading) {
    return <Loading className="text-4xl" />
  }

  if (!battles) {
    return <p>Empty</p>
  }

  return (
    <>
      {battles.map((battle) => (
        <motion.div key={battle.id} variants={grid.item()}>
          <OnlineBattlePanel battleData={battle} />
        </motion.div>
      ))}
    </>
  )
}

type Props = {
  status: BattleStatus
  title: string
  page: string
  showMore?: boolean
}

export default function BattlesList({ status, title, page, showMore = false }: Props) {
  return (
    <SectionWrapper title={title}>
      <BattlesListData status={status} page={page} />

      {showMore && <ShowMoreButton currentPage={page} />}
    </SectionWrapper>
  )
}
