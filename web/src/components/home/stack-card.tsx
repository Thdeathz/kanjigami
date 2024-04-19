import { BsBookmarks, BsBookmarksFill } from 'react-icons/bs'

import { IStack } from '@/@types/stack'

import CardWrapper from './card-wrapper'
import UserHiScore from './user-hi-score'

type Props = {
  stack: IStack
}

export default function StackCard({ stack }: Props) {
  return (
    <CardWrapper link={`/stacks/${stack.slug}`} imageUrl={stack.image}>
      <div className="p-2">
        <h5 className="mb-2 text-lg font-semibold text-default-heading">{stack.name}</h5>

        <UserHiScore score={stack.userPoint} />

        <button
          type="button"
          className="absolute bottom-4 right-4 z-10 aspect-square rounded-full bg-border-1 p-3 transition-transform duration-200 active:scale-90"
        >
          {stack.isFollowed ? <BsBookmarksFill /> : <BsBookmarks />}
        </button>
      </div>
    </CardWrapper>
  )
}
