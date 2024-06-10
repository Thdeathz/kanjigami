import { motion } from 'framer-motion'
import Link from 'next/link'

import { ITopUser } from '@/@types/leaderboard'
import { UserAvatar } from '@/components/ui/avatar'
import { grid } from '@/lib/animation-variants'

type Props = {
  topUser: ITopUser
  index: number
}

function getLabel(topUser: Props['topUser']) {
  if (topUser.totalGame) {
    return `${topUser.totalGame ?? 0} Games`
  }

  if (topUser.time) {
    return `avg ${topUser.time}s`
  }

  return ''
}

export default function TopUserItem({ topUser, index }: Props) {
  const label = getLabel(topUser)

  return (
    <motion.tr
      className="side-leaderboard-item group flex items-center justify-between rounded-2xl bg-leaderboard-top px-4 py-[0.7rem] text-left shadow-hard"
      variants={grid.item()}
    >
      <td className="flex basis-1/2 items-center gap-4">
        <UserAvatar src={topUser.user.image} alt={topUser.user.name} plus={topUser.user.isPlus} />

        <Link
          href="/player"
          className="inline-block max-w-[6rem] truncate font-semibold text-default-link group-hover:text-default-brand"
        >
          {topUser.user.name}
        </Link>
      </td>

      <td className="font-secondary font-medium">{topUser.point}</td>
      <td className="font-secondary font-medium">({label})</td>
      <td className="font-secondary text-[1.375rem] font-medium text-default-text-lightest">
        #{String(index).padStart(2, '0')}
      </td>
    </motion.tr>
  )
}
