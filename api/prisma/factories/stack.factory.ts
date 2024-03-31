import { faker } from '@faker-js/faker'
import { Topic, User, Word } from '@prisma/client'

type StackFactory = {
  name: string
  description: string
  image: string
  author: User
  words: Word[]
  topic: Topic[]
}

const stackFactory = async (author: User, words: Word[], topics: Topic[]) => {
  const stacks: StackFactory[] = []

  await Promise.all(
    Array.from({ length: 150 }).map(async () => {
      const name = faker.word.noun()
      const description = faker.lorem.words({ min: 6, max: 10 })
      const image = faker.image.url()
      const uniqueWords = faker.helpers.uniqueArray(words, faker.number.int({ min: 80, max: 120 }))
      const uniqueTopics = faker.helpers.uniqueArray(topics, faker.number.int({ min: 1, max: 2 }))

      stacks.push({
        name,
        description,
        image,
        author,
        words: uniqueWords,
        topic: uniqueTopics,
      })
    }),
  )

  return stacks
}

export default stackFactory
