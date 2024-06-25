import { GameStack, NotificationType, User } from '@prisma/client'

import gameLogFactory from '../factories/game-log.factory'

import prisma from './prism-client'

const gameLogSeeder = async (users: User[], gameStacks: GameStack[]) => {
  console.log('🌱 Seeding game logs...')
  const gameLogsData = await gameLogFactory(users, gameStacks)

  const gameLogs = await Promise.all(
    gameLogsData.map(async (gameLog) => {
      const oldGameLog = await prisma.gameLog.findUnique({
        where: {
          gameStackId_userId: {
            gameStackId: gameLog.gameStackId,
            userId: gameLog.userId,
          },
        },
        select: {
          point: true,
        },
      })

      if (oldGameLog) {
        if (oldGameLog.point < gameLog.point)
          await prisma.gameLog.update({
            where: {
              gameStackId_userId: {
                gameStackId: gameLog.gameStackId,
                userId: gameLog.userId,
              },
            },
            data: {
              point: gameLog.point,
              time: gameLog.time,
            },
          })
      } else {
        await prisma.gameLog.create({
          data: {
            point: gameLog.point,
            time: gameLog.time,
            type: gameLog.type,
            gameStack: {
              connect: {
                id: gameLog.gameStackId,
              },
            },
            user: {
              connect: {
                id: gameLog.userId,
              },
            },
          },
        })
      }

      const currentStack = await prisma.gameStack.findUnique({
        where: {
          id: gameLog.gameStackId,
        },
        select: {
          stack: {
            select: {
              id: true,
              slug: true,
            },
          },
        },
      })

      if (!currentStack) return

      const currentHighScore = await prisma.gameLog.groupBy({
        by: ['userId'],
        where: {
          gameStack: {
            stackId: currentStack.stack.id,
          },
          NOT: {
            userId: gameLog.userId,
          },
        },
        _sum: {
          point: true,
        },
        orderBy: {
          _sum: {
            point: 'desc',
          },
        },
        take: 1,
      })

      const currentUserHighScore = await prisma.gameLog.groupBy({
        by: ['userId'],
        where: {
          AND: [
            {
              userId: gameLog.userId,
            },
            {
              gameStack: {
                stackId: currentStack.stack.id,
              },
            },
          ],
        },
        _sum: {
          point: true,
        },
      })

      if (
        currentHighScore.length === 0 ||
        (currentHighScore[0]._sum.point ?? 0) < (currentUserHighScore[0]._sum.point ?? 0)
      ) {
        await prisma.notification.create({
          data: {
            userId: gameLog.userId,
            action: 'broke own record on',
            type: NotificationType.STACK,
            link: currentStack.stack.slug.toString(),
            point: currentUserHighScore[0]._sum.point,
          },
        })
      }
    }),
  )

  console.log('🌱 Seeding game logs completed!')

  return gameLogs
}

export default gameLogSeeder
