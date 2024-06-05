import type { Socket } from 'socket.io'

import { IGetGameContentRequest } from '../@types/game'
import gameController from '../controllers/game.controller'

const kanjiShooterEvent = (socket: Socket) => {
  socket.on('game:get', (data: IGetGameContentRequest) => gameController.handleGetContent(socket, data))

  socket.on(
    'game:calculate-score',
    (data: IGetGameContentRequest & { score: number; battleSlug?: string; roundIndex?: string }) => {
      console.log('game:calculate-score', data)
      return gameController.handleSaveScore(socket, data)
    },
  )
}

export default kanjiShooterEvent
