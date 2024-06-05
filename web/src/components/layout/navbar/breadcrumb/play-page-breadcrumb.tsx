'use client'

import { BiSolidChevronRight } from 'react-icons/bi'
import { BsStack } from 'react-icons/bs'
import { RiSwordFill } from 'react-icons/ri'

import { useGetGameStackQuery } from '@/data/game'

import CrumbItem from './CrumbItem'

type Props = {
  id: string
}

export const BattlePlayPageBreadcrumb = ({ battleSlug, roundIndex }: { battleSlug: string; roundIndex: string }) => {
  return (
    <>
      <CrumbItem icon={<RiSwordFill />} content="Battles" to="/battles" />

      <CrumbItem
        icon={<BiSolidChevronRight />}
        content={`Battle #${battleSlug}`}
        to={`/battles/${battleSlug}`}
        animate
      />

      <CrumbItem
        icon={<BiSolidChevronRight />}
        content={`Round ${roundIndex}`}
        to={`/play/${battleSlug}/${roundIndex}`}
        lastItem
        animate
      />
    </>
  )
}

export default function PlayPageBreadcrumb({ id }: Props) {
  const { data: gameStack } = useGetGameStackQuery(id)

  if (!gameStack) return null

  if (gameStack.stack)
    return (
      <>
        <CrumbItem icon={<BsStack />} content="Stacks" to="/stacks" />

        <CrumbItem
          icon={<BiSolidChevronRight />}
          content={`Stack #${gameStack.stack.slug}`}
          to={`/stacks/${gameStack.stack.slug}`}
          animate
        />

        <CrumbItem
          icon={<BiSolidChevronRight />}
          content={gameStack.game.name}
          to={`/play/${gameStack.id}`}
          lastItem
          animate
        />
      </>
    )

  return null
}
