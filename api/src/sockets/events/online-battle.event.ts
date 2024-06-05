import type { Socket } from 'socket.io'
import uniqueSlug from 'unique-slug'

import { IBattleRoundData, IJoinRoundRequest, IJoinedUser, IUserInfo } from '../@types/event'

import { IStartEventData } from '@/apis/@types/event'
import redisService from '@/apis/services/redis.service'
import io from '@/servers/init.socket'

type StartGameProps = {
  battleSlug: string
  roundIndex: string
  roundData: IBattleRoundData
  user: IUserInfo
  joinedUser: IJoinedUser[]
  oldRound?: IJoinedUser['round']
}

const startGame = async ({ battleSlug, roundIndex, roundData, user, joinedUser, oldRound = [] }: StartGameProps) => {
  // Init user play game session
  const sessionId = uniqueSlug()
  const { gameStack, words } = roundData
  await redisService.setex('game', sessionId, gameStack.timeLimit.toString(), { user, gameStack, words })

  // Save session to event users list
  const newUser = {
    user,
    round: [
      ...oldRound,
      {
        order: roundIndex,
        sessionId,
        point: 0,
        time: 0,
      },
    ],
  }

  await redisService.set('event', `${battleSlug}:users`, [...joinedUser, newUser])
  io.to(battleSlug).emit('battle:leaderboard:data', getBattleTopUser([...joinedUser, newUser]))

  return sessionId
}

export const getBattleTopUser = (joinedUsers: IJoinedUser[]) =>
  joinedUsers
    .map((u) => ({
      user: {
        id: u.user.id,
        name: u.user.name,
        image: u.user.image,
        isPlus: u.user.isPlus,
      },
      point: u.round?.reduce((acc, r) => acc + r.point, 0) ?? 0,
      time: u.round?.reduce((acc, r) => acc + r.time, 0) ?? 0,
    }))
    .sort((a, b) => b.point - a.point && b.time - a.time)
    .slice(0, 15)

const onlineBattleEvent = (socket: Socket) => {
  socket.on('battle:info', async ({ battleSlug, roundIndex }: { battleSlug: string; roundIndex: string }) => {
    const battle = await redisService.get<IStartEventData>('event', battleSlug)

    if (!battle) {
      socket.emit('battle:round:not-found', { battleSlug })
      return
    }

    const currentRound = battle.rounds[roundIndex]

    if (currentRound.status === 'FINISHED') {
      socket.emit('battle:round:finished', { battleSlug, roundIndex })
      return
    }

    const roundData = await redisService.get<IBattleRoundData>('event', `${battleSlug}:${currentRound.id}`)

    if (!roundData) {
      socket.emit('battle:round:not-found', { battleSlug, roundIndex })
      return
    }

    socket.emit('battle:round:data', { ...roundData.gameStack })
  })

  socket.on('battle:round:join', async ({ battleSlug, roundIndex, user }: IJoinRoundRequest) => {
    const battle = await redisService.get<IStartEventData>('event', battleSlug)

    if (!battle) {
      socket.emit('battle:round:not-found', { battleSlug })
      return
    }

    const currentRound = battle.rounds[roundIndex]

    if (currentRound.status === 'FINISHED') {
      socket.emit('battle:round:finished', { battleSlug, roundIndex })
      return
    }

    const currentRoundData = await redisService.get<IBattleRoundData>('event', `${battleSlug}:${currentRound.id}`)

    if (!currentRoundData) {
      socket.emit('battle:round:not-found', { battleSlug, roundIndex })
      return
    }

    const joinedUser = (await redisService.get<IJoinedUser[]>('event', `${battleSlug}:users`)) || []
    const foundUser = joinedUser.find((u) => u.user.id === user.id)

    if (!foundUser) {
      const sessionId = await startGame({
        battleSlug,
        roundIndex,
        roundData: currentRoundData,
        user,
        joinedUser,
      })

      socket.emit('battle:round:joined', { sessionId })
      return
    }

    const currentRoundSession = foundUser.round?.find((r) => r.order === roundIndex)

    if (currentRoundSession) {
      const gameContent = await redisService.get<IBattleRoundData>('game', currentRoundSession.sessionId)

      if (!gameContent) {
        socket.emit('battle:round:played')
        return
      }

      socket.emit('battle:round:joined', { sessionId: currentRoundSession.sessionId })
      return
    }

    const sessionId = await startGame({
      battleSlug,
      roundIndex,
      roundData: currentRoundData,
      user,
      joinedUser: joinedUser.filter((u) => u.user.id !== user.id),
      oldRound: foundUser.round,
    })

    socket.emit('battle:round:joined', { sessionId })
  })

  socket.on('battle:leaderboard', async ({ battleSlug }: { battleSlug: string }) => {
    socket.join(battleSlug)

    const joinedUsers = await redisService.get<IJoinedUser[]>('event', `${battleSlug}:users`)

    if (!joinedUsers) {
      socket.emit('battle:leaderboard:data', [])
      return
    }

    io.to(battleSlug).emit('battle:leaderboard:data', getBattleTopUser(joinedUsers))
  })
}

export default onlineBattleEvent
