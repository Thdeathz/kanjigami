import rankFactory from '../factories/rank.factory'

import prisma from './prism-client'

const rankSeeder = async () => {
  console.log('🌱 Seeding Ranks...')
  const ranksData = rankFactory()

  const ranks = await Promise.all(
    ranksData.map(
      async (rank) =>
        await prisma.rank.create({
          data: {
            name: rank.name,
            icon: rank.icon,
            score: rank.score,
          },
        }),
    ),
  )

  console.log('🌱 Seeding Ranks completed!')

  return ranks
}

export default rankSeeder
