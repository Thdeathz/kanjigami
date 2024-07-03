import type { Socket } from 'socket.io'

import { IGetGameContentRequest } from '../@types/game'
import gameController from '../controllers/game.controller'

const kanjiShooterEvent = (socket: Socket) => {
  socket.on('game:get', (data: IGetGameContentRequest) => {
    try {
      gameController.handleGetContent(socket, data)
    } catch (error) {
      socket.emit('game:error')
    }
  })

  socket.on(
    'game:calculate-score',
    (data: IGetGameContentRequest & { score: number; battleSlug?: string; roundIndex?: string }) => {
      try {
        gameController.handleSaveScore(socket, data)
      } catch (error) {
        socket.emit('game:error')
      }
    },
  )
}

export default kanjiShooterEvent
