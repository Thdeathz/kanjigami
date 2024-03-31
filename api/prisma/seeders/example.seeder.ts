import { Word } from '@prisma/client'

import exampleFactory from '../factories/example.factory'

import prisma from './prism-client'

const exampleSeeder = async (words: Word[]) => {
  console.log('🌱 Seeding Examples...')
  const examplesData = await exampleFactory(words)

  const examples = await Promise.all(
    examplesData.map(
      async (example) =>
        await prisma.example.create({
          data: {
            content: example.content,
            romaji: example.romaji,
            meaning: example.meaning,
            words: {
              connect: example.words.map((word) => ({
                id: word.id,
              })),
            },
          },
        }),
    ),
  )

  console.log('🌱 Seeding Examples completed!')

  return examples
}

export default exampleSeeder
