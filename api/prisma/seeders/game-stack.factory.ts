import { Game, Stack } from '@prisma/client'

import gameStackFactory from '../factories/game-stack.factory'

import prisma from './prism-client'

const gameStackSeeder = async (games: Game[], stacks: Stack[]) => {
  console.log('🌱 Seeding game stacks...')
  const gameStacksData = await gameStackFactory(games, stacks)

  const gameStacks = await Promise.all(
    gameStacksData.map(
      async (gameStack) =>
        await prisma.gameStack.create({
          data: {
            game: {
              connect: {
                id: gameStack.game.id,
              },
            },
            stack: {
              connect: {
                id: gameStack.stack.id,
              },
            },
            numberOfWords: gameStack.numberOfWords,
            timeLimit: gameStack.timeLimit,
          },
        }),
    ),
  )

  console.log('🌱 Seeding game stacks completed!')

  return gameStacks
}

export default gameStackSeeder
