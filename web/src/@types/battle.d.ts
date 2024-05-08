import * as z from 'zod'

import { BattleDetailsSchema } from '@/schema/admin/battle-schema'

import { ISearchStackResult } from './stack'

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

export interface IBattleInfo {
  id: string
  slug: number
  name: string
}

export interface IBattle extends IBattleInfo {
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

export interface IBattleUserStats extends IBattleInfo {
  rounds: {
    order: string
    status: BattleStatus
    stack: {
      slug: number
      name: string
      image: string
    }
    game: {
      image: string
      name: string
    }
    log: {
      point: number
      time: number
    }
  }[]
}

export interface INewRound {
  index: number
  gameStack?: ISearchStackResult
}

export interface ICreateBattle {
  details: z.infer<typeof BattleDetailsSchema>
  rounds: INewRound[]
}
