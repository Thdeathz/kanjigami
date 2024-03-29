import { BsBookmarksFill } from 'react-icons/bs'

import CardWrapper from './card-wrapper'

export default function StackCard() {
  return (
    <CardWrapper link="/stacks">
      <div className="p-2">
        <h5 className="mb-2 text-lg font-semibold text-default-heading">井上 菜摘</h5>

        <div className="font-medium leading-5">
          <p className="text-default-text-lightest">Your hi-score</p>
          <p className="font-secondary text-default-text-light">Not played</p>
        </div>

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
