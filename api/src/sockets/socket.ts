import dotenv from 'dotenv'
import type { Socket } from 'socket.io'

import flipCardEvent from './events/flip-card.event'
import gameEvent from './events/game.event'

dotenv.config()

const socketEvent = (socket: Socket) => {
  if (process.env.NODE_ENV === 'development') console.log('Socket connected', socket.id)

  gameEvent(socket)

  flipCardEvent(socket)
}

export default socketEvent
