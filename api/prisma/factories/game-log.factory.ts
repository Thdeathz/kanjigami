import { faker } from '@faker-js/faker'
import { GameLogType, GameStack, User } from '@prisma/client'

type GameLogFactory = {
  point: number
  time: number
  type: GameLogType
  gameStackId: string
  userId: string
}

const gameLogFactory = async (users: User[], gameStacks: GameStack[]) => {
  const gameLogs: GameLogFactory[] = []

  await Promise.all(
    gameStacks.map(async (gameStack) => {
      Array.from({
        length: faker.number.int({
          min: 10,
          max: 20,
        }),
      }).map(() => {
        const userId = faker.helpers.arrayElement(users).id

        gameLogs.push({
          point: faker.number.int({
            min: 20,
            max: 200,
          }),
          time: faker.number.int({
            min: 100,
            max: 300,
          }),
          type: GameLogType.OFFLINE,
          gameStackId: gameStack.id,
          userId,
        })
      })
    }),
  )

  return gameLogs.reduce((acc: GameLogFactory[], gameLog) => {
    const existingGameLog = acc.find(
      (item) => item.gameStackId === gameLog.gameStackId && item.userId === gameLog.userId,
    )

    if (existingGameLog) {
      if (existingGameLog.point < gameLog.point) {
        existingGameLog.point = gameLog.point
        existingGameLog.time = gameLog.time
      }

      return acc
    }

    return [...acc, gameLog]
  }, [])
}

export default gameLogFactory
