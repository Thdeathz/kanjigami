'use client'

import CountDown from '../home/battles/count-down'
import { Button } from '../ui/button'

type Props = {
  gameTime?: string | null
  onTimeEnd: () => void
}

export default function GameTime({ gameTime, onTimeEnd }: Props) {
  if (!gameTime) return null

  return (
    <Button disabled className="absolute right-2 top-[7rem] font-medium text-default-brand !opacity-100">
      <CountDown endTime={gameTime} onFinish={onTimeEnd} />
    </Button>
  )
}
