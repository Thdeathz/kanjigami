export type BattleStatus = 'ONGOING' | 'UPCOMING' | 'FINISHED'

export type BattleType = 'GOFT' | 'TIMEATTACK'

export interface IRemainingTime {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export interface IRoundTopUser {
  user: {
    id: string
    image: string
    name: string
  }
  point: number
  time: string
}

export interface IRound {
  order: number
  status: BattleStatus
  startAt?: Date
  stack: {
    slug: number
    name: string
  }
  game: {
    image: string
  }
  hightPoint?: IRoundTopUser
}

export interface ITopUser {
  user: {
    id: string
    image: string
    name: string
  }
  point: number
  time: string
}

export interface IBattle {
  id: string
  name: string
  slug: number
  description: string
  type: BattleType
  status: BattleStatus
  startAt: Date
  rounds: IRound[]
  topUsers: ITopUser[]
}

export interface IBattleDetail extends Omit<IBattle, 'topUsers'> {
  playedUsers?: number
}
