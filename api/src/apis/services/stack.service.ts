import { PaginationRequest } from '../@types'
import { StacksFilterOption } from '../@types/stack'
import prisma from '../databases/init.prisma'
import stackTransformer, { StackDetailResponse, StacksResponse } from '../transformers/stack.transformer'

const getFilter = (filter?: StacksFilterOption, currentUserId?: string, search?: string) => {
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

  return returnFilter
}

const getAllStacks = async (
  { page, offset }: PaginationRequest,
  currentUserId?: string,
  filter?: StacksFilterOption,
  search?: string,
) => {
  const where = getFilter(filter, currentUserId, search)

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

export default {
  getAllStacks,
  getStackBySlug,
  followStack,
}
