import { BsBookmarks, BsBookmarksFill } from 'react-icons/bs'
import { toast } from 'sonner'

import CardWrapper from '@/components/home/card-wrapper'
import UserHiScore from '@/components/home/user-hi-score'
import { useFollowStackMutation } from '@/data/stack'
import useInvalidateTag from '@/hooks/use-invalidate-tag'

type Props = {
  stackId: string
  name: string
  image: string
  slug: number
  userPoint?: number
  isFollowed: boolean
}

export default function StackCard({ stackId, name, image, slug, userPoint, isFollowed }: Props) {
  const { mutateAsync, isPending } = useFollowStackMutation()
  const { invalidateTag } = useInvalidateTag()

  const handleFollow = async () => {
    try {
      await mutateAsync(stackId)
      toast.success(isFollowed ? 'Unfollowed stack' : 'Followed stack')
      invalidateTag(['stacks'])
    } catch (error) {
      toast.error('Failed to follow stack. Please try again later.')
    }
  }

  return (
    <CardWrapper link={`/stacks/${slug}`} imageUrl={image}>
      <div className="p-2">
        <h5 className="mb-2 text-lg font-semibold text-default-heading">{name}</h5>

        <UserHiScore score={userPoint} />

        <button
          type="button"
          className="absolute bottom-4 right-4 z-10 aspect-square rounded-full bg-border-1 p-3 transition-transform duration-200 active:scale-90"
          onClick={handleFollow}
        >
          {isFollowed ? <BsBookmarksFill /> : <BsBookmarks />}
        </button>
      </div>
    </CardWrapper>
  )
}
