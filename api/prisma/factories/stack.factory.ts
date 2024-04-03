import { faker } from '@faker-js/faker'
import { Topic, User, UserRole, Word } from '@prisma/client'

type StackFactory = {
  name: string
  description: string
  image: string
  author: User
  words: Word[]
  topic: Topic[]
  followedUsers: User[]
}

const stackFactory = async (users: User[], words: Word[], topics: Topic[]) => {
  const stacks: StackFactory[] = []

  await Promise.all(
    Array.from({ length: 150 }).map(async () => {
      const name = faker.word.noun()
      const description = faker.lorem.words({ min: 6, max: 10 })
      const author = users.find((user) => user.role === UserRole.ADMIN)!
      const image = faker.image.url()
      const uniqueWords = faker.helpers.uniqueArray(words, faker.number.int({ min: 80, max: 120 }))
      const uniqueTopics = faker.helpers.uniqueArray(topics, faker.number.int({ min: 1, max: 2 }))

      const followedUsers = faker.helpers.uniqueArray(users, faker.number.int({ min: 10, max: 30 }))

      stacks.push({
        name,
        description,
        image,
        author,
        words: uniqueWords,
        topic: uniqueTopics,
        followedUsers,
      })
    }),
  )

  return stacks
}

export default stackFactory
