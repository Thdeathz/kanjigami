import { NotificationType } from '@prisma/client'

import prisma from '@/apis/databases/init.prisma'
import notificationTransformer from '@/apis/transformers/notification.transformer'

const getNewestNotification = async () => {
  const newestLink = await prisma.notification.findMany({
    take: 10,
    select: {
      id: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      type: true,
      action: true,
      link: true,
      point: true,
      createdAt: true,
    },
    orderBy: {
      id: 'desc',
    },
    distinct: ['link'],
  })

  return notificationTransformer.getNewestNotification(newestLink)
}

const recordNewHighScore = async (gameStackId: string, userId: string) => {
  const currentStack = await prisma.gameStack.findUnique({
    where: {
      id: gameStackId,
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
        userId,
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
          userId,
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
        userId,
        action: 'broke own record on',
        type: NotificationType.STACK,
        link: currentStack.stack.slug.toString(),
        point: currentUserHighScore[0]._sum.point,
      },
    })
  }
}

const recordEventHighestScore = async (eventId: string) => {
  const currentEvent = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    select: {
      slug: true,
      rounds: {
        select: {
          id: true,
        },
      },
    },
  })

  if (!currentEvent) return

  const currentHighScore = await prisma.gameLog.groupBy({
    by: ['userId'],
    where: {
      roundId: {
        in: currentEvent.rounds.map((round) => round.id),
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

  if (currentHighScore.length > 0) {
    await prisma.notification.create({
      data: {
        userId: currentHighScore[0].userId,
        action: 'got rank 1 on event',
        type: NotificationType.EVENT,
        link: currentEvent.slug.toString(),
        point: currentHighScore[0]._sum.point,
      },
    })
  }
}

export default {
  getNewestNotification,
  recordNewHighScore,
  recordEventHighestScore,
}
