import gameFactory from '../factories/game.factory'

import prisma from './prism-client'

const gameSeeder = async () => {
  console.log('🌱 Seeding Games...')
  const gamesData = gameFactory()

  const games = await Promise.all(
    gamesData.map(
      async (game) =>
        await prisma.game.create({
          data: {
            name: game.name,
            image: game.image,
          },
        }),
    ),
  )

  console.log('🌱 Seeding Games completed!')

  return games
}

export default gameSeeder
