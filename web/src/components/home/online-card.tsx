import Image from 'next/image'

import { IRound } from '@/@types/battle'

type CardProps = {
  imageUrl?: string
  stackSlug?: string
}

function Card({ imageUrl, stackSlug }: CardProps) {
  return (
    <div className="relative rounded-lg transition-transform duration-200 hover:scale-105">
      <Image
        src={imageUrl ?? '/images/lock.png'}
        width="400"
        height="300"
        alt="online-round"
        className="aspect-4/3 h-auto w-full rounded-lg"
      />

      <div className="font-secondary absolute right-1.5 top-1.5 rounded bg-black px-2 py-[0.2rem] text-sm font-semibold uppercase text-white">
        #{stackSlug}
      </div>
    </div>
  )
}

type Props = {
  round: IRound
}

export default function OnlineCard({ round }: Props) {
  return <Card imageUrl={round.game?.image} stackSlug={round.stack?.slug.toString()} />
}
