import { VariantProps, cva } from 'class-variance-authority'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaCrown } from 'react-icons/fa'

import { ITopUser } from '@/@types/leaderboard'
import { UserAvatar } from '@/components/ui/avatar'
import { topLeader } from '@/lib/animation-variants'
import { cn } from '@/lib/utils'

const crownVariants = cva('text-lg', {
  variants: {
    top: {
      '1': 'text-crown-gold',
      '2': 'text-crown-silver',
      '3': 'text-crown-bronze'
    }
  },
  defaultVariants: {
    top: '3'
  }
})

const auraVariants = cva(
  'relative before:absolute before:block before:h-full before:w-full before:rounded-full before:opacity-50 before:blur-[20px]',
  {
    variants: {
      top: {
        '1': 'before:bg-crown-gold',
        '2': 'before:bg-crown-silver',
        '3': 'before:bg-crown-bronze'
      }
    },
    defaultVariants: {
      top: '3'
    }
  }
)

const podiumVariants = cva(
  'flex-center text-secondary-podium bg-top-user top-user relative z-[1] text-[8rem] font-bold',
  {
    variants: {
      top: {
        '1': 'h-[14rem]',
        '2': 'h-[10rem]',
        '3': 'h-[8rem]'
      }
    },
    defaultVariants: {
      top: '3'
    }
  }
)

export interface TopUserProps extends VariantProps<typeof crownVariants> {
  topUser: ITopUser
}

function getHeight(top: TopUserProps['top']) {
  if (top === '1') return '14rem'
  if (top === '2') return '10rem'
  return '8rem'
}

export default function TopUser({ top, topUser }: TopUserProps) {
  return (
    <motion.div
      className={cn('basis-1/3', {
        'order-2': top === '1',
        'order-0': top === '2',
        'order-3': top === '3'
      })}
      variants={topLeader.container}
      initial="hidden"
      animate="enter"
    >
      <motion.div className="flex-center side-leaderboard-item group mb-4 flex-col" variants={topLeader.userInfo}>
        <div className="flex-center flex-col gap-4">
          <FaCrown className={cn(crownVariants({ top }))} />

          <div className={cn(auraVariants({ top }))}>
            <UserAvatar
              src={topUser.user.image}
              alt={topUser.user.name}
              plus={topUser.user.isPlus}
              className="h-[52px] w-[52px]"
            />
          </div>
        </div>

        <Link
          href={`/player/${topUser.user.name}`}
          className="mt-4 text-lg font-semibold text-default-link group-hover:text-default-brand"
        >
          {topUser.user.name}
        </Link>

        <p className="font-secondary font-medium text-default-text-light">{topUser.point}</p>
      </motion.div>

      <motion.div className={cn(podiumVariants({ top }))} variants={topLeader.topBar(getHeight(top))}>
        {top}
      </motion.div>
    </motion.div>
  )
}
