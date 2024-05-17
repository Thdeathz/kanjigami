import { BsBookmarks, BsBookmarksFill } from 'react-icons/bs'

import CardWrapper from '@/components/home/card-wrapper'
import UserHiScore from '@/components/home/user-hi-score'

type Props = {
  name: string
  image: string
  slug: number
  userPoint?: number
  isFollowed: boolean
}

export default function StackCard({ name, image, slug, userPoint, isFollowed }: Props) {
  return (
    <CardWrapper link={`/stacks/${slug}`} imageUrl={image}>
      <div className="p-2">
        <h5 className="mb-2 text-lg font-semibold text-default-heading">{name}</h5>

        <UserHiScore score={userPoint} />

        <button
          type="button"
          className="absolute bottom-4 right-4 z-10 aspect-square rounded-full bg-border-1 p-3 transition-transform duration-200 active:scale-90"
        >
          {isFollowed ? <BsBookmarksFill /> : <BsBookmarks />}
        </button>
      </div>
    </CardWrapper>
  )
}
