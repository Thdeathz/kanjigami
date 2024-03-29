import Image from 'next/image'
import { FaPlay } from 'react-icons/fa'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import UserHiScore from '../user-hi-score'

type Props = {
  name: string
  thumbnail: string
}

export default function GameItem({ name, thumbnail }: Props) {
  return (
    <div className="flex-center flex-col gap-4">
      <Badge>{name}</Badge>

      <div className="rounded-2xl border-2 border-border bg-stack p-[0.6rem] transition-all duration-200 hover:border-default-brand hover:shadow-glory">
        <Image
          src={thumbnail}
          alt={name}
          width="400"
          height="400"
          className="aspect-4/3 rounded-xl border-[3px] border-default-stack object-cover"
        />

        <div className="flex items-center justify-between p-2">
          <UserHiScore />

          <Button variant="primary" shape="circle">
            <FaPlay className="text-white" />
          </Button>
        </div>
      </div>
    </div>
  )
}
