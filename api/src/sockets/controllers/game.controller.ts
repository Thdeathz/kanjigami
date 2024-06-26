import type { Socket } from 'socket.io'

import { IGetGameContentRequest } from '../@types/game'

import { IStartEventData } from '@/apis/@types/event'
import { IGameData, IWord } from '@/apis/@types/game'
import gameService from '@/apis/services/game.service'
import redisService from '@/apis/services/redis.service'
import io from '@/servers/init.socket'
import { IJoinedUser } from '@/sockets/@types/event'
import { getBattleTopUser } from '@/sockets/events/online-battle.event'

const handleGetContent = async (socket: Socket, { sessionId, userId, type }: IGetGameContentRequest) => {
  const gameData = await redisService.get<IGameData<IWord>>('game', sessionId)

  if (!gameData || userId !== gameData.user.id) {
    if (type === 'ONLINE') {
      socket.emit('battle:round:played')
      return
    }

    socket.emit('game:content-not-found')
    return
  }

  socket.emit('game:content', {
    words: gameData.words,
  })
}

const handleSaveScore = async (
  socket: Socket,
  {
    sessionId,
    userId,
    score,
    type,
    battleSlug,
    roundIndex,
  }: IGetGameContentRequest & { score: number; battleSlug?: string; roundIndex?: string },
) => {
  const gameData = await redisService.get<IGameData<IWord>>('game', sessionId)
  const time = await redisService.ttl('game', sessionId)

  if (!gameData || userId !== gameData.user.id) {
    socket.emit('game:content-not-found')
    return
  }

  await redisService.del('game', sessionId)

  const playTime = Math.abs(gameData.gameStack.timeLimit - time)

  if (type === 'OFFLINE') {
    console.log('save offline game score', gameData.gameStack.id)
    const gameLog = await gameService.saveScoreOfflineGame(gameData.gameStack.id, userId, {
      score: calculateScore(gameData.gameStack.game.name, playTime, score),
      time: playTime,
      type,
    })

    socket.emit('game:calculate-score:success', {
      stackSlug: gameLog.gameStack.stack.slug,
      logId: gameLog.id,
      currentScore: gameLog.currentScore,
    })
    return
  }

  if (type === 'ONLINE' && battleSlug && roundIndex !== undefined) {
    console.log('save online game score', battleSlug, roundIndex)
    const eventData = await redisService.get<IStartEventData>('event', battleSlug)
    const currentRound = eventData?.rounds.find((r) => r.order === Number(roundIndex))

    if (!currentRound) {
      socket.emit('game:calculate-score:failed')
      return
    }

    const result = await gameService.saveScoreOnlineGame(currentRound.id, userId, {
      score: calculateScore(gameData.gameStack.game.name, playTime, score),
      time: playTime,
      type,
    })

    const usersList = (await redisService.get<IJoinedUser[]>('event', `${battleSlug}:users`)) || []
    const foundedUser = usersList?.find((u) => u.user.id === userId)

    console.log('foundedUser', foundedUser)

    if (!foundedUser) {
      socket.emit('game:calculate-score:failed')
      return
    }

    const foundedUserRound = foundedUser.round.map((r) => {
      if (Number(r.order) === Number(currentRound.order)) {
        console.log('r', r, result.point)
        return { ...r, point: result.point, time: result.time }
      }

      return r
    })

    const newUsersList = [
      ...usersList.filter((u) => u.user.id !== userId),
      { user: foundedUser.user, round: foundedUserRound },
    ]

    console.log('newUsersList', newUsersList, foundedUserRound)

    await redisService.set('event', `${battleSlug}:users`, newUsersList)

    socket.emit('game:calculate-score:success', { logId: result.id })
    io.to(battleSlug).emit('battle:leaderboard:data', getBattleTopUser(newUsersList))
    return
  }
}

const calculateScore = (gameType: string, time: number, score: number) => {
  if (gameType === 'Blind Flip Card' || gameType === 'Multiple Choice') {
    return score * 16
  }

  const finalScore = score - time * 0.2

  return finalScore < 0 ? 0 : finalScore
}

export default {
  handleGetContent,
  handleSaveScore,
}
