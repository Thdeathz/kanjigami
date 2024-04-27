import { GameLog, Stack, Topic, User, Word } from '@prisma/client'

export interface StacksResponse extends Stack {
  topics: Topic[]
  followedUsers: User[]
  games: {
    logs: GameLog[]
  }[]
}

const getAllStacks = (stacks: StacksResponse[]) =>
  stacks.map((stack) => ({
    id: stack.id,
    name: stack.name,
    slug: stack.slug,
    image: stack.image,
    createdAt: stack.createdAt,
    topic: stack.topics.length > 0 && stack.topics[0].name,
    isFollowed: stack.followedUsers.length > 0,
    userPoint: stack.games.reduce((total, game) => total + game.logs.reduce((acc, log) => acc + log.point, 0), 0),
  }))

export interface StackDetailResponse extends Stack {
  topics: Topic[]
  followedUsers: User[]
  games: {
    id: string
    game: {
      name: string
      image: string
    }
    logs: GameLog[]
  }[]
  words: Word[]
}

const getStackBySlug = (stack: StackDetailResponse) => ({
  id: stack.id,
  slug: stack.slug,
  name: stack.name,
  description: stack.description,
  createdAt: stack.createdAt,
  topics: stack.topics.map((topic) => topic.name),
  isFollowed: stack.followedUsers.length > 0,
  games: stack.games.map((game) => ({
    id: game.id,
    name: game.game.name,
    image: game.game.image,
    userPoint: game.logs?.reduce((acc, log) => acc + log.point, 0),
  })),
  words: stack.words,
})

export default {
  getAllStacks,
  getStackBySlug,
}
