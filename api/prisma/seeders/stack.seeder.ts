import { Topic, User, Word } from '@prisma/client'

import stackFactory from '../factories/stack.factory'

import prisma from './prism-client'

const stackSeeder = async (users: User[], words: Word[], topics: Topic[]) => {
  console.log('🌱 Seeding Stacks...')
  const stacksData = await stackFactory(users, words, topics)

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
            followedUsers: {
              connect: stack.followedUsers.map((user) => ({
                id: user.id,
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
