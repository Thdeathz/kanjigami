export type BattleStatus = 'ONGOING' | 'UPCOMING' | 'FINISHED'

export type BattleType = 'GOFT' | 'TIMEATTACK'

export interface IRemainingTime {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export interface IRound {
  order: number
  status: BattleStatus
  stack: {
    slug: number
    name: string
  }
  game: {
    image: string
  }
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
