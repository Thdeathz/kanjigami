import type { Socket } from 'socket.io'

import { IGetGameContentRequest } from '../@types/game'

import { IGameData, IWord } from '@/apis/@types/game'
import gameService from '@/apis/services/game.service'
import redisService from '@/apis/services/redis.service'

const handleGetContent = async (socket: Socket, { sessionId, userId }: IGetGameContentRequest) => {
  const gameData = await redisService.get<IGameData>('game', sessionId)

  if (!gameData || userId !== gameData.user.id) {
    socket.emit('game:content-not-found')
    return
  }

  if (gameData.gameStack.game.name === 'Kanji Shooter') {
    socket.emit('game:content', {
      words: getKanjiShooterGameContent(gameData.words),
    })
  }
}

const handleSaveScore = async (
  socket: Socket,
  { sessionId, userId, score }: IGetGameContentRequest & { score: number },
) => {
  const gameData = await redisService.get<IGameData>('game', sessionId)
  const time = await redisService.ttl('game', sessionId)

  if (!gameData || userId !== gameData.user.id) {
    socket.emit('game:content-not-found')
    return
  }

  await redisService.del('game', sessionId)

  const result = await gameService.saveScore(gameData.gameStack.id, userId, {
    score,
    time: Math.abs(gameData.gameStack.timeLimit - time),
    type: 'OFFLINE',
  })

  socket.emit('game:calculate-score:success', { logId: result.id })
}

const getKanjiShooterGameContent = (words: IWord[]) =>
  words.map((word) => ({
    id: word.id,
    content: word.content,
    romaji: word.romaji,
  }))

export default {
  handleGetContent,
  handleSaveScore,
}
