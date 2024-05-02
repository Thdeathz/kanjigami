import { Socket } from 'socket.io'

import { IUpdateGameStatusRequest } from '../@types/game'

import gameController from './game.controller'

import { FlipCardGameContent, IGameData } from '@/apis/@types/game'
import redisService from '@/apis/services/redis.service'

const handleUpdateGameStatus = async (socket: Socket, { sessionId, wordId, userId }: IUpdateGameStatusRequest) => {
  const gameData = await redisService.get<IGameData<FlipCardGameContent>>('game', sessionId)

  if (!gameData || userId !== gameData.user.id) {
    socket.emit('game:content-not-found')
    return
  }

  let availableKanji = 0
  const newGameContent = gameData.words.map((word) => {
    if (word.id === wordId && word.isVisible) {
      return {
        ...word,
        isVisible: false,
      }
    } else {
      if (word.isVisible) availableKanji++
    }

    return word
  })

  if (availableKanji === 0) {
    gameController.handleSaveScore(socket, { sessionId, userId, score: 12 })
  }

  await redisService.reSet('game', sessionId, {
    ...gameData,
    score: 12 - availableKanji / 2,
    words: newGameContent,
  })
}

export default {
  handleUpdateGameStatus,
}
