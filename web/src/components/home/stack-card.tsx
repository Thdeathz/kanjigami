import { BsBookmarksFill } from 'react-icons/bs'

import CardWrapper from './card-wrapper'
import UserHiScore from './user-hi-score'

export default function StackCard() {
  return (
    <CardWrapper link="/stacks/10">
      <div className="p-2">
        <h5 className="mb-2 text-lg font-semibold text-default-heading">井上 菜摘</h5>

        <UserHiScore />

        <button
          type="button"
          className="absolute bottom-4 right-4 z-10 aspect-square rounded-full bg-border-1 p-3 transition-transform duration-200 active:scale-90"
        >
          <BsBookmarksFill />
        </button>
      </div>
    </CardWrapper>
  )
}
