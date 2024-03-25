import { motion } from 'framer-motion'
import Link from 'next/link'

import { UserAvatar } from '@/components/ui/avatar'
import { grid } from '@/lib/animation-variants'

export default function TopUserItem() {
  return (
    <motion.tr
      className="side-leaderboard-item group flex items-center justify-between rounded-2xl bg-leaderboard-top px-4 py-[0.7rem] text-left shadow-hard"
      variants={grid.item()}
    >
      <td className="flex basis-1/2 items-center gap-4">
        <UserAvatar src="/images/default-avatar.jpg" alt="leaderboard" plus />

        <Link href="/player" className="inline-block font-semibold text-default-link group-hover:text-default-brand">
          Kantan kanji
        </Link>
      </td>

      <td className="font-secondary font-medium">341123</td>
      <td className="font-secondary font-medium">(194 Targets)</td>
      <td className="font-secondary text-[1.375rem] font-medium text-default-text-lightest">#04</td>
    </motion.tr>
  )
}
