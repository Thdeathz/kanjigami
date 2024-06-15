'use client'

import { BsBookmarks, BsBookmarksFill } from 'react-icons/bs'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { useFollowStackMutation } from '@/data/stack'
import useInvalidateTag from '@/hooks/use-invalidate-tag'

type Props = {
  stackId: string
  isFollowed?: boolean
}

export default function ButtonBookmark({ stackId, isFollowed = false }: Props) {
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
    <Button shape="circle" isLoading={isPending} onClick={handleFollow}>
      {isFollowed ? <BsBookmarksFill /> : <BsBookmarks />}
    </Button>
  )
}
