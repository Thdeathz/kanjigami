import Image from 'next/image'
import Link from 'next/link'
import { FaPlay } from 'react-icons/fa'

import { IStackGame } from '@/@types/stack'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import UserHiScore from '../../user-hi-score'

type Props = {
  game: IStackGame
}

export default function GameItem({ game }: Props) {
  return (
    <div className="flex-center w-[22rem] flex-col gap-4">
      <Badge>{game.name}</Badge>

      <Link
        href={`/play/${game.id}`}
        className="h-full w-full rounded-2xl border-2 border-border bg-stack p-[0.6rem] transition-all duration-200 hover:border-default-brand hover:shadow-glory"
      >
        <Image
          src={game.image}
          alt={game.name}
          width="400"
          height="400"
          className="aspect-4/3 w-full rounded-xl border-[3px] border-default-stack object-cover"
          priority
        />

        <div className="flex items-center justify-between p-2">
          <UserHiScore score={game.userPoint} />

          <Button variant="primary" shape="circle">
            <FaPlay className="text-white" />
          </Button>
        </div>
      </Link>
    </div>
  )
}
