import { VariantProps, cva } from 'class-variance-authority'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaCrown } from 'react-icons/fa'

import { ITopUser } from '@/@types/battle'
import { UserAvatar } from '@/components/ui/avatar'
import { grid } from '@/lib/animation-variants'
import { cn } from '@/lib/utils'

const sideLeaderboardItemVariants = cva(
  'side-leaderboard-item shadow-hard text-default-text-lightest group flex items-center gap-2 rounded-full p-2 font-medium',
  {
    variants: {
      top: {
        '1': 'bg-leaderboard-top-1',
        '2': 'bg-leaderboard-top-2',
        '3': 'bg-leaderboard-top-3',
        default: 'bg-leaderboard-top'
      }
    },
    defaultVariants: {
      top: 'default'
    }
  }
)

export interface SideLeaderboardItemProps extends VariantProps<typeof sideLeaderboardItemVariants> {
  topUser: ITopUser
}

function getCrownClass(top: SideLeaderboardItemProps['top']) {
  if (top === '1') return 'text-crown-gold'
  if (top === '2') return 'text-crown-silver'
  if (top === '3') return 'text-crown-bronze'

  return ''
}

export default function SideLeaderboardItem({ top = 'default', topUser }: SideLeaderboardItemProps) {
  const crownClass = getCrownClass(top)

  return (
    <motion.div className={cn(sideLeaderboardItemVariants({ top }))} variants={grid.item()}>
      <UserAvatar src={topUser.user.image} alt={topUser.user.name} plus />

      <div className="leading-[18px]">
        <div className="flex gap-1">
          {top !== 'default' && <FaCrown className={crownClass} />}

          <Link
            href={`/player/${topUser.user.name}`}
            className="w-32 truncate font-semibold text-default-link transition-colors group-hover:text-default-brand"
          >
            {topUser.user.name}
          </Link>
        </div>

        <p className="font-secondary mt-0.5 text-sm">
          {topUser.point} <span>(avg {topUser.time}s)</span>
        </p>
      </div>
    </motion.div>
  )
}
