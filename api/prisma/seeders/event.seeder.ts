import { GameStack, User } from '@prisma/client'

import eventFactory from '../factories/event.factory'

import prisma from './prism-client'

const eventSeeder = async (users: User[], gameStacks: GameStack[]) => {
  console.log('🌱 Seeding Events...')
  const eventsData = await eventFactory(users, gameStacks)

  const events = await Promise.all(
    eventsData.map(async (event) => {
      const createdEvent = await prisma.event.create({
        data: {
          name: event.name,
          description: event.description,
          type: event.type,
          status: event.status,
          startAt: event.startAt,
          joiners: {
            connect: event.joiners.map((user) => ({ id: user.id })),
          },
        },
      })

      await Promise.all(
        event.rounds.map(async (round) => {
          const createdRound = await prisma.round.create({
            data: {
              order: round.order,
              status: round.status,
              gameStackId: round.gameStackId,
              eventId: createdEvent.id,
            },
          })

          if (round.gameLog.length > 0) {
            await prisma.gameLog.createMany({
              data: round.gameLog.map((gameLog) => ({
                point: gameLog.point,
                time: gameLog.time,
                type: gameLog.type,
                userId: gameLog.userId,
                roundId: createdRound.id,
              })),
            })
          }
        }),
      )

      return createdEvent
    }),
  )

  console.log('🌱 Seeding Events completed!')

  return events
}

export default eventSeeder
