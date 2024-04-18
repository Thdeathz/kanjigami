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
    if (round.status === BattleStatus.UPCOMING) {
      return {
        order: round.order,
        status: round.status,
        stack: round.gameStack.stack.name,
      }
    }

    const currentUserLog = currentUserLogs.find((log) => log.roundId === round.id)

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
      hightPoint: round.logs.length > 0 && round.logs[0],
      userPoint: currentUserLog && {
        point: currentUserLog.point,
        time: currentUserLog.time,
      },
    }
  }),
})

export default {
  getAllEvents,
  getEventBySlug,
}
