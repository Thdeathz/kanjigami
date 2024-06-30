import type { Socket } from 'socket.io'

import { IJoinRoundRequest } from '../@types/event'
import onlineBattleController from '../controllers/online-battle.controller'

const onlineBattleEvent = (socket: Socket) => {
  socket.on('battle:info', async (data: { battleSlug: string; roundIndex: string }) => {
    try {
      onlineBattleController.handleBattleJoin(socket, data)
    } catch (error) {
      socket.emit('battle:error')
    }
  })

  socket.on('battle:round:join', async (data: IJoinRoundRequest) => {
    try {
      onlineBattleController.handleBattleRoundJoin(socket, data)
    } catch (error) {
      socket.emit('battle:error')
    }
  })

  socket.on('battle:leaderboard', async (data: { battleSlug: string }) => {
    try {
      onlineBattleController.handleBattleLeaderboard(socket, data)
    } catch (error) {
      socket.emit('battle:error')
    }
  })
}

export default onlineBattleEvent
