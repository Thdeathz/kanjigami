import { Topic, User, UserRole, Word } from '@prisma/client'

import stackFactory from '../factories/stack.factory'

import prisma from './prism-client'

const stackSeeder = async (users: User[], words: Word[], topics: Topic[]) => {
  console.log('🌱 Seeding Stacks...')
  const stacksData = await stackFactory(users.find((user) => user.role === UserRole.ADMIN)!, words, topics)

  const stacks = await Promise.all(
    stacksData.map(
      async (stack) =>
        await prisma.stack.create({
          data: {
            name: stack.name,
            description: stack.description,
            image: stack.image,
            author: {
              connect: {
                id: stack.author.id,
              },
            },
            words: {
              connect: stack.words.map((word) => ({
                id: word.id,
              })),
            },
            topics: {
              connect: stack.topic.map((topic) => ({
                id: topic.id,
              })),
            },
          },
        }),
    ),
  )

  console.log('🌱 Seeding Stacks completed!')

  return stacks
}

export default stackSeeder
