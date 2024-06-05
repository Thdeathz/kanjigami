'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { ITopUser } from '@/@types/leaderboard'
import { socket } from '@/components/connect-socket'
import SideLeaderboard from '@/components/home/side-leaderboard'

type Props = {
  slug: string
}

export default function OngoingBattleLeaderboard({ slug }: Props) {
  const [topUsers, setTopUsers] = useState<ITopUser[]>([])
  const router = useRouter()

  const onLeaderboardData = (data: ITopUser[]) => {
    setTopUsers(data)
  }

  const onBattleFinished = () => {
    toast.info('Battle is finished', {
      id: 'battle-finished'
    })
    router.refresh()
  }

  useEffect(() => {
    socket.emit('battle:leaderboard', { battleSlug: slug })

    socket.on('battle:leaderboard:data', onLeaderboardData)

    socket.on('battle:finished', onBattleFinished)

    return () => {
      socket.off('battle:leaderboard:data', onLeaderboardData)
      socket.off('battle:finished', onBattleFinished)
    }
  }, [])

  if (topUsers.length === 0) return <p>Leaderboard empty.</p>

  return <SideLeaderboard topUsers={topUsers} />
}
