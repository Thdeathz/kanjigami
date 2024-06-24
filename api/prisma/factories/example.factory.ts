import { faker } from '@faker-js/faker'
import { Word } from '@prisma/client'

type ExampleFactory = {
  content: string
  romaji: string
  meaning: string
  words: Word[]
}

const exampleFactory = async (words: Word[]) => {
  const examples: ExampleFactory[] = []

  await Promise.all(
    Array.from({ length: 250 }).map(async () => {
      const uniqueWords = faker.helpers.uniqueArray(words, faker.number.int({ min: 1, max: 4 }))

      const content = faker.lorem.words({
        min: 6,
        max: 10,
      })
      const romaji = faker.lorem.words({ min: 6, max: 10 })
      const meaning = faker.lorem.words({ min: 6, max: 10 })

      examples.push({
        content: `${content} ${uniqueWords.map((word) => word.content).join(' ')}`,
        romaji,
        meaning,
        words: [...uniqueWords],
      })
    }),
  )

  return examples
}

export default exampleFactory
