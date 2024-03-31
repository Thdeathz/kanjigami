import { GameStack, User } from '@prisma/client'

import gameLogFactory from '../factories/game-log.factory'

import prisma from './prism-client'

const gameLogSeeder = async (users: User[], gameStacks: GameStack[]) => {
  console.log('🌱 Seeding game logs...')
  const gameLogsData = await gameLogFactory(users, gameStacks)

  const gameLogs = await Promise.all(
    gameLogsData.map(
      async (gameLog) =>
        await prisma.gameLog.create({
          data: {
            point: gameLog.point,
            time: gameLog.time,
            type: gameLog.type,
            gameStackId: gameLog.gameStackId,
            userId: gameLog.userId,
          },
        }),
    ),
  )

  console.log('🌱 Seeding game logs completed!')

  return gameLogs
}

export default gameLogSeeder
