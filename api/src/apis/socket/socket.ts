/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Socket } from 'socket.io'

const socketEvent = (socket: Socket) => {
  console.log('🚀 New socket connection')
}

export default socketEvent
