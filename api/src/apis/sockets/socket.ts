import dotenv from 'dotenv'
import type { Socket } from 'socket.io'

import gameEvent from './events/game.event'

dotenv.config()

const socketEvent = (socket: Socket) => {
  if (process.env.NODE_ENV === 'development') console.log('Socket connected', socket.id)

  gameEvent(socket)
}

export default socketEvent
