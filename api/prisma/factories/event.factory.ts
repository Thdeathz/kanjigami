import { faker } from '@faker-js/faker'
import { BattleStatus, BattleType, GameLogType, GameStack, User } from '@prisma/client'

type GameLog = {
  point: number
  time: number
  type: GameLogType
  userId: string
}

type EventFactory = {
  name: string
  description: string
  type: BattleType
  status: BattleStatus
  startAt: Date
  joiners: User[]
  rounds: {
    order: number
    status: BattleStatus
    gameStackId: string
    gameLog: GameLog[]
  }[]
}

const eventFactory = async (users: User[], gameStacks: GameStack[]) => {
  const events: EventFactory[] = []

  Array.from({ length: 60 }).map(() => {
    const name = faker.lorem.words(2)
    const description = faker.lorem.sentences(1)
    const type = faker.helpers.arrayElement([BattleType.GOFT, BattleType.TIMEATTACK])
    const status = faker.helpers.arrayElement([BattleStatus.UPCOMING, BattleStatus.FINISHED])

    const maxPlayers = faker.number.int({ min: 10, max: 20 })
    const joinedUsers: User[] = faker.helpers.shuffle(users).slice(0, maxPlayers)

    let startAt = faker.date.future()
    if (status === BattleStatus.FINISHED) startAt = faker.date.past()

    const maxRounds = faker.number.int({ min: 6, max: 12 })

    const rounds = Array.from(Array(maxRounds)).map((_, index) => {
      const order = index
      const gameStackId = faker.helpers.arrayElement(gameStacks).id

      let roundStatus: BattleStatus = BattleStatus.UPCOMING
      const gameLog: GameLog[] = []
      if (status === BattleStatus.FINISHED) {
        roundStatus = BattleStatus.FINISHED

        joinedUsers.map((user) => {
          const point = faker.number.int({ min: 20, max: 100 })
          const time = faker.number.int({ min: 200, max: 300 })

          gameLog.push({
            point,
            time,
            type: GameLogType.ONLINE,
            userId: user.id,
          })
        })
      }

      return {
        order,
        status: roundStatus,
        gameStackId,
        gameLog,
      }
    })

    events.push({
      name,
      description,
      type,
      status,
      startAt,
      rounds,
      joiners: joinedUsers,
    })
  })

  return events
}

export default eventFactory
