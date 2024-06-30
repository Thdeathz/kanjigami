import { PaginationRequest } from '../@types'
import { ICreateStackRequest, IGameStackRequest, StacksFilterOption } from '../@types/stack'
import prisma from '../databases/init.prisma'
import stackTransformer, { StackDetailResponse, StacksResponse } from '../transformers/stack.transformer'
import HttpError from '../utils/http-error'

const getFilter = (
  filter?: StacksFilterOption,
  currentUserId?: string,
  search?: string,
  topic?: string,
  authorId?: string,
) => {
  let returnFilter = {}

  if (filter === 'played' && currentUserId)
    returnFilter = {
      games: {
        some: {
          logs: {
            some: {
              userId: currentUserId ?? '',
            },
          },
        },
      },
    }

  if (filter === 'followed' && currentUserId) returnFilter = { followedUsers: { some: { id: currentUserId } } }

  if (filter === 'not-played' && currentUserId)
    returnFilter = {
      NOT: [
        {
          games: {
            some: {
              logs: {
                some: {
                  userId: currentUserId ?? '',
                },
              },
            },
          },
        },
      ],
    }

  if (search)
    returnFilter = {
      ...returnFilter,
      name: {
        search: search + ':*',
      },
    }

  if (topic)
    returnFilter = {
      ...returnFilter,
      topics: {
        some: {
          name: topic,
        },
      },
    }

  if (authorId)
    returnFilter = {
      ...returnFilter,
      authorId: authorId,
    }

  return returnFilter
}

interface GetAllStacksProps extends PaginationRequest {
  currentUserId?: string
  filter?: StacksFilterOption
  search?: string
  topic?: string
  authorId?: string
}

const getAllStacks = async ({ page, offset, currentUserId, filter, search, topic, authorId }: GetAllStacksProps) => {
  const where = getFilter(filter, currentUserId, search, topic, authorId)

  const total = await prisma.stack.count({
    where,
  })

  if (total === 0) return { total, stacks: [] }

  const stacks = await prisma.stack.findMany({
    where,
    skip: (page - 1) * offset,
    take: offset,
    select: {
      id: true,
      slug: true,
      name: true,
      image: true,
      createdAt: true,
      topics: {
        select: {
          name: true,
        },
      },
      followedUsers: {
        where: {
          id: currentUserId ?? '',
        },
        select: {
          id: true,
        },
      },
      games: {
        select: {
          logs: {
            where: {
              userId: currentUserId ?? '',
            },
            select: {
              point: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return { total, stacks: stackTransformer.getAllStacks(stacks as StacksResponse[]) }
}

const getStackBySlug = async (slug: string, currentUserId?: string) => {
  const stack = await prisma.stack.findUnique({
    where: {
      slug: Number(slug),
    },
    select: {
      id: true,
      slug: true,
      name: true,
      description: true,
      createdAt: true,
      topics: {
        select: {
          name: true,
        },
      },
      followedUsers: {
        where: {
          id: currentUserId,
        },
        select: {
          id: true,
        },
      },
      games: {
        select: {
          id: true,
          game: {
            select: {
              name: true,
              image: true,
            },
          },
          logs: {
            where: {
              userId: currentUserId ?? '',
            },
            select: {
              point: true,
            },
          },
        },
      },
      words: {
        select: {
          id: true,
          content: true,
        },
      },
    },
  })

  return stackTransformer.getStackBySlug(stack as StackDetailResponse)
}

const followStack = async (id: string, currentUserId: string) => {
  const foundedStack = await prisma.stack.findFirst({
    where: {
      id,
      followedUsers: {
        some: {
          id: currentUserId,
        },
      },
    },
  })

  await prisma.stack.update({
    where: {
      id,
    },
    data: {
      followedUsers: foundedStack
        ? {
            disconnect: {
              id: currentUserId,
            },
          }
        : {
            connect: {
              id: currentUserId,
            },
          },
    },
  })

  return foundedStack ? 'UnFollow' : 'Follow'
}

const searchStack = async (search: string) => {
  const stack = await prisma.stack.findFirst({
    where: {
      name: {
        search: search + ':*',
      },
    },
    select: {
      id: true,
      slug: true,
      name: true,
      image: true,
      createdAt: true,
      topics: {
        select: {
          name: true,
        },
      },
      games: {
        select: {
          id: true,
          game: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
    },
  })

  if (!stack) return null

  const numberWords = await prisma.word.count({
    where: {
      stacks: {
        some: {
          id: stack.id,
        },
      },
    },
  })

  const numberFollowed = await prisma.user.count({
    where: {
      followedStacks: {
        some: {
          id: stack.id,
        },
      },
    },
  })

  return { ...stack, numberWords, numberFollowed }
}

const createStack = async (data: ICreateStackRequest, imageUrl: string[], createdBy: string) => {
  const topics = [data.topic]

  const stack = await prisma.stack.create({
    data: {
      name: data.name,
      description: data.description,
      image: imageUrl.shift() as string,
      topics: {
        connectOrCreate: topics.map((topic) => ({
          where: {
            name: topic,
          },
          create: {
            name: topic,
          },
        })),
      },
      words: {
        create: data.words.map((word) => ({
          content: word.content,
          hiragana: word.hiragana,
          romaji: word.romaji,
          meaning: word.meaning,
          image: imageUrl.shift() as string,
          examples: {
            create: word.examples.map((example) => ({
              content: example.content,
              romaji: example.romaji,
              meaning: example.meaning,
            })),
          },
        })),
      },
      author: {
        connect: {
          id: createdBy,
        },
      },
    },
  })

  return stack
}

const getStackDetailToEdit = async (slug: string) => {
  const stack = await prisma.stack.findUnique({
    where: {
      slug: Number(slug),
    },
    select: {
      id: true,
      name: true,
      description: true,
      image: true,
      topics: {
        select: {
          name: true,
        },
      },
      words: {
        select: {
          id: true,
          content: true,
          hiragana: true,
          romaji: true,
          meaning: true,
          image: true,
          examples: {
            select: {
              id: true,
              content: true,
              romaji: true,
              meaning: true,
            },
          },
        },
      },
      games: {
        select: {
          id: true,
          game: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          numberOfWords: true,
          timeLimit: true,
        },
      },
    },
  })

  return {
    ...stack,
    topic: stack?.topics.map((topic) => topic.name).join(', '),
  }
}

const editGameStack = async (slug: string, data: IGameStackRequest[]) => {
  const stack = await prisma.stack.findUnique({
    where: {
      slug: Number(slug),
    },
    select: {
      id: true,
      games: {
        select: {
          id: true,
          game: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  })

  if (!stack) {
    throw new HttpError(404, 'Stack not found')
  }

  for (const game of data) {
    const isHasGame = stack?.games.find((each) => each.game.id === game.game.id)

    if (!isHasGame) {
      await prisma.gameStack.create({
        data: {
          game: {
            connect: {
              id: game.game.id,
            },
          },
          stack: {
            connect: {
              id: stack?.id,
            },
          },
          numberOfWords: game.numberOfWords,
          timeLimit: game.timeLimit,
        },
      })
    } else {
      await prisma.gameStack.update({
        where: {
          id: isHasGame.id,
        },
        data: {
          game: {
            connect: {
              id: game.game.id,
            },
          },
          numberOfWords: game.numberOfWords,
          timeLimit: game.timeLimit,
        },
      })
    }
  }

  return stack
}

export default {
  getAllStacks,
  getStackBySlug,
  followStack,
  searchStack,
  createStack,
  getStackDetailToEdit,
  editGameStack,
}
