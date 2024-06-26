import type { Socket } from 'socket.io'

import { IUpdateGameStatusRequest } from '../@types/game'
import flipCardController from '../controllers/flip-card.controller'

const flipCardEvent = (socket: Socket) => {
  socket.on('game:flip-card:update', (data: IUpdateGameStatusRequest) =>
    flipCardController.handleUpdateGameStatus(socket, data),
  )
}

export default flipCardEvent
