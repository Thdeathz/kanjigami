import { Game, Stack } from '@prisma/client'

type GameStackFactory = {
  game: Game
  stack: Stack
  numberOfWords: number
  timeLimit: number
}

const gameStackFactory = async (games: Game[], stacks: Stack[]) => {
  const gameStacks: GameStackFactory[] = []

  await Promise.all(
    stacks.map((stack) =>
      games.map((game) => {
        let numberOfWords = 100
        if (game.name === 'Blind Flip Card') {
          numberOfWords = 24
        }

        if (game.name === 'Multiple Choice') {
          numberOfWords = 12
        }

        const timeLimit = 300

        gameStacks.push({
          game,
          stack,
          numberOfWords,
          timeLimit,
        })
      }),
    ),
  )

  return gameStacks
}

export default gameStackFactory
