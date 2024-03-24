import Image from 'next/image'
import Link from 'next/link'
import { BsBookmarksFill } from 'react-icons/bs'

export default function StackCard() {
  return (
    <div className="relative rounded-2xl bg-stack p-[0.6rem] shadow-stack-light transition-transform duration-200 hover:scale-105 dark:shadow-stack-dark">
      <Link href="/stacks" className="absolute right-0 top-0 h-full w-full rounded-2xl" />
      <Image
        src="/images/lock.png"
        alt="kanji-stack"
        width="300"
        height="300"
        className="aspect-4/3 w-full rounded-[0.4rem] border-[3px] border-default-stack"
      />

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
    </div>
  )
}
