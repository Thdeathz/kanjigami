import type { Socket } from 'socket.io'

import { IGetGameContentRequest } from '../@types/game'

import { IGameData, IWord } from '@/apis/@types/game'
import gameService from '@/apis/services/game.service'
import redisService from '@/apis/services/redis.service'

const handleGetContent = async (socket: Socket, { sessionId, userId }: IGetGameContentRequest) => {
  const gameData = await redisService.get<IGameData<IWord>>('game', sessionId)

  if (!gameData || userId !== gameData.user.id) {
    socket.emit('game:content-not-found')
    return
  }

  socket.emit('game:content', {
    words: gameData.words,
  })
}

const handleSaveScore = async (
  socket: Socket,
  { sessionId, userId, score }: IGetGameContentRequest & { score: number },
) => {
  const gameData = await redisService.get<IGameData<IWord>>('game', sessionId)
  const time = await redisService.ttl('game', sessionId)

  if (!gameData || userId !== gameData.user.id) {
    socket.emit('game:content-not-found')
    return
  }

  await redisService.del('game', sessionId)

  const playTime = Math.abs(gameData.gameStack.timeLimit - time)

  const result = await gameService.saveScore(gameData.gameStack.id, userId, {
    score: calculateScore(gameData.gameStack.game.name, playTime, score),
    time: playTime,
    type: 'OFFLINE',
  })

  socket.emit('game:calculate-score:success', { logId: result.id })
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
