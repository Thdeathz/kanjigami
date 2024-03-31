import { Kanji } from '@prisma/client'

import wordFactory from '../factories/word.factory'

import prisma from './prism-client'

const wordSeeder = async (kanjis: Kanji[]) => {
  console.log('🌱 Seeding Words...')
  const wordsData = await wordFactory(kanjis)

  const words = await Promise.all(
    wordsData.map(
      async (word) =>
        await prisma.word.create({
          data: {
            content: word.content,
            meaning: word.meaning,
            romaji: word.romaji,
            hiragana: word.hiragana,
            image: word.image,
            kanjis: {
              connect: word.refKanjis.map((kanji) => ({
                id: kanji.id,
              })),
            },
          },
        }),
    ),
  )

  console.log('🌱 Seeding Words completed!')

  return words
}

export default wordSeeder
