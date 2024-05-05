import { GameLog } from '@prisma/client'

import { PaginationRequest } from '@/apis/@types'
import prisma from '@/apis/databases/init.prisma'
import gameLogService from '@/apis/services/game-log.service'
import eventTransformer, {
  EventDetailResponse,
  EventsResponse,
  UserStatsResponse,
} from '@/apis/transformers/event.transformer'

const getFilter = (status?: string, search?: string) => {
  let returnFilter = {}

  if (status) returnFilter = { ...returnFilter, status }

  if (search)
    returnFilter = {
      ...returnFilter,
      name: {
        search: search + ':*',
      },
    }

  return returnFilter
}

const getAllEvents = async ({ page, offset }: PaginationRequest, status?: string, search?: string) => {
  const where = getFilter(status, search)

  const total = await prisma.event.count({
    where,
  })

  if (total === 0) return { total, events: [] }

  const events = await prisma.event.findMany({
    where,
    skip: (page - 1) * offset,
    take: offset,
    select: {
      id: true,
      slug: true,
      name: true,
      description: true,
      type: true,
      status: true,
      startAt: true,
      rounds: {
        select: {
          order: true,
          status: true,
          gameStack: {
            select: {
              stack: {
                select: {
                  slug: true,
                  name: true,
                },
              },
              game: {
                select: {
                  image: true,
                },
              },
            },
          },
        },
        orderBy: {
          order: 'asc',
        },
      },
    },
    orderBy: {
      slug: 'desc',
    },
  })

  const topUsers = await gameLogService.getEventsTopUsers(events.map((event) => event.id))

  return { total, events: eventTransformer.getAllEvents(events as EventsResponse[], topUsers) }
}

const getEventBySlug = async (slug: string, currentUserId?: string) => {
  const event = await prisma.event.findUnique({
    where: {
      slug: Number(slug),
    },
    select: {
      id: true,
      slug: true,
      name: true,
      description: true,
      type: true,
      status: true,
      startAt: true,
      rounds: {
        select: {
          id: true,
          order: true,
          status: true,
          gameStack: {
            select: {
              stack: {
                select: {
                  slug: true,
                  name: true,
                },
              },
              game: {
                select: {
                  image: true,
                },
              },
            },
          },
          logs: {
            take: 1,
            select: {
              point: true,
              time: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
            orderBy: {
              point: 'desc',
            },
          },
        },
        orderBy: {
          order: 'asc',
        },
      },
    },
  })

  if (!event) return null

  const currentUserLog = await prisma.gameLog.findMany({
    where: {
      roundId: {
        in: event.rounds.map((round) => round.id),
      },
      userId: currentUserId ?? '',
    },
    select: {
      point: true,
      time: true,
      roundId: true,
    },
  })

  const returnEvent = eventTransformer.getEventBySlug(event as EventDetailResponse, currentUserLog as GameLog[])

  if (event.status === 'FINISHED') {
    const playedUsers = await prisma.gameLog.groupBy({
      by: 'userId',
      where: {
        roundId: {
          in: event.rounds.map((round) => round.id),
        },
      },
    })

    return {
      ...returnEvent,
      playedUsers: playedUsers.length,
    }
  }

  return returnEvent
}

const getUserPlayedEventsList = async (userId: string) => {
  const playedEvents = await prisma.gameLog.groupBy({
    by: ['roundId'],
    where: {
      userId,
      roundId: { not: null },
    },
  })

  if (playedEvents.length === 0) return []

  const playedEventsList = await prisma.event.findMany({
    where: {
      rounds: {
        some: {
          id: {
            in: playedEvents.map((event) => event.roundId!),
          },
        },
      },
    },
    select: {
      id: true,
      slug: true,
      name: true,
    },
    orderBy: {
      slug: 'desc',
    },
  })

  return playedEventsList
}

const getCondition = (userId: string, slug?: string) => {
  if (!slug)
    return {
      rounds: {
        some: {
          logs: {
            some: {
              userId,
            },
          },
        },
      },
    }

  return {
    AND: [
      {
        slug: Number(slug),
      },
      {
        rounds: {
          some: {
            logs: {
              some: {
                userId,
              },
            },
          },
        },
      },
    ],
  }
}

const getUserEventStats = async (userId: string, slug?: string) => {
  const event = await prisma.event.findMany({
    where: getCondition(userId, slug),
    select: {
      id: true,
      slug: true,
      name: true,
      rounds: {
        select: {
          id: true,
          order: true,
          status: true,
          gameStack: {
            select: {
              stack: {
                select: {
                  slug: true,
                  name: true,
                  image: true,
                },
              },
              game: {
                select: {
                  image: true,
                  name: true,
                },
              },
            },
          },
          logs: {
            where: {
              userId,
            },
            select: {
              point: true,
              time: true,
            },
          },
        },
        orderBy: {
          order: 'asc',
        },
      },
    },
    orderBy: {
      slug: 'desc',
    },
    take: 1,
  })

  if (!event || event.length === 0) return null

  return eventTransformer.getUserStats(event[0] as UserStatsResponse)
}

export default {
  getAllEvents,
  getEventBySlug,
  getUserPlayedEventsList,
  getUserEventStats,
}
