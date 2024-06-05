import { BattleStatus, Event, GameLog, User } from '@prisma/client'

export interface EventsResponse extends Event {
  rounds: {
    order: number
    status: BattleStatus
    gameStack: {
      stack: {
        slug: number
        name: string
      }
      game: {
        image: string
      }
    }
  }[]
}

interface EventsTopUser {
  user: {
    id: string
    image: string
    name: string
  }
  point: number
  time: string
  eventId: string
}

const getAllEvents = (events: EventsResponse[], topUsers: EventsTopUser[]) =>
  events.map((event) => ({
    id: event.id,
    name: event.name,
    slug: event.slug,
    description: event.description,
    type: event.type,
    status: event.status,
    startAt: event.startAt,
    rounds: event.rounds.map((round) => {
      if (round.status === BattleStatus.UPCOMING) {
        return {
          order: round.order,
          status: round.status,
        }
      }

      return {
        order: round.order,
        status: round.status,
        stack: {
          slug: round.gameStack.stack.slug,
          name: round.gameStack.stack.name,
        },
        game: {
          image: round.gameStack.game.image,
        },
      }
    }),
    topUsers: topUsers.filter((user) => user.eventId === event.id).sort((a, b) => b.point - a.point),
  }))

export interface EventDetailResponse extends Event {
  rounds: {
    id: string
    order: number
    status: BattleStatus
    gameStack: {
      stack: {
        slug: number
        name: string
      }
      game: {
        image: string
      }
    }
    logs: {
      point: number
      time: number
      user: User
    }[]
  }[]
}

const getEventBySlug = (event: EventDetailResponse, currentUserLogs: GameLog[]) => ({
  id: event.id,
  slug: event.slug,
  name: event.name,
  description: event.description,
  type: event.type,
  status: event.status,
  startAt: event.startAt,
  rounds: event.rounds.map((round) => {
    const startAt = new Date(new Date(event.startAt).getTime() + round.order * event.duration * 60 * 1000)

    if (round.status === BattleStatus.UPCOMING) {
      return {
        order: round.order,
        startAt,
        status: round.status,
        stack: round.gameStack.stack.name,
      }
    }

    const currentUserLog = currentUserLogs.find((log) => log.roundId === round.id)

    return {
      order: round.order,
      status: round.status,
      startAt,
      stack: {
        slug: round.gameStack.stack.slug,
        name: round.gameStack.stack.name,
      },
      game: {
        image: round.gameStack.game.image,
      },
      hightPoint: round.logs.length > 0 && round.logs[0],
      userPoint: currentUserLog && {
        point: currentUserLog.point,
        time: currentUserLog.time,
      },
    }
  }),
})

export interface UserStatsResponse extends Event {
  rounds: {
    id: string
    order: number
    status: BattleStatus
    gameStack: {
      stack: {
        slug: number
        name: string
        image: string
      }
      game: {
        image: string
        name: string
      }
    }
    logs: {
      point: number
      time: number
    }[]
  }[]
}

const getUserStats = (event: UserStatsResponse) => ({
  id: event.id,
  slug: event.slug,
  name: event.name,
  description: event.description,
  type: event.type,
  status: event.status,
  startAt: event.startAt,
  rounds: event.rounds.map((round) => ({
    order: round.order,
    status: round.status,
    stack: {
      slug: round.gameStack.stack.slug,
      name: round.gameStack.stack.name,
      image: round.gameStack.stack.image,
    },
    game: {
      image: round.gameStack.game.image,
      name: round.gameStack.game.name,
    },
    log: {
      point: round.logs.reduce((acc, log) => acc + log.point, 0),
      time: round.logs.reduce((acc, log) => acc + log.time, 0),
    },
  })),
})

export default {
  getAllEvents,
  getEventBySlug,
  getUserStats,
}
