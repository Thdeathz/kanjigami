import { motion } from 'framer-motion'
import { BsBookmarks, BsBookmarksFill } from 'react-icons/bs'
import { toast } from 'sonner'

import CardWrapper from '@/components/home/card-wrapper'
import UserHiScore from '@/components/home/user-hi-score'
import Loading from '@/components/loading'
import { useFollowStackMutation } from '@/data/stack'
import useInvalidateTag from '@/hooks/use-invalidate-tag'
import { grid } from '@/lib/animation-variants'

type Props = {
  stackId: string
  name: string
  image: string
  slug: number
  userPoint?: number
  isFollowed: boolean
  isLoggedIn?: boolean
}

export default function StackCard({ stackId, name, image, slug, userPoint, isFollowed, isLoggedIn = false }: Props) {
  const { mutateAsync, isPending } = useFollowStackMutation()
  const { invalidateTag } = useInvalidateTag()

  const handleFollow = async () => {
    try {
      await mutateAsync(stackId)
      toast.success(isFollowed ? 'UnFollowed stack' : 'Followed stack')
      invalidateTag(['stacks'])
    } catch (error) {
      toast.error('Failed to follow stack. Please try again later.')
    }
  }

  return (
    <motion.div variants={grid.item(0.2)}>
      <CardWrapper link={`/stacks/${slug}`} imageUrl={image}>
        <div className="p-2">
          <h2 className="mb-2 text-lg font-semibold text-default-heading">{name}</h2>

          <UserHiScore score={userPoint} />

          {isLoggedIn && (
            <button
              type="button"
              className="absolute bottom-4 right-4 z-10 aspect-square rounded-full bg-border-1 p-3 transition-transform duration-200 active:scale-90"
              onClick={handleFollow}
              disabled={isPending}
              aria-label={isFollowed ? 'UnFollow stack' : 'Follow stack'}
            >
              {isPending ? <Loading /> : isFollowed ? <BsBookmarksFill /> : <BsBookmarks />}
            </button>
          )}
        </div>
      </CardWrapper>
    </motion.div>
  )
}
