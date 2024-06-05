import { BattleStatus } from '@prisma/client'

export interface ICreateRoundRequest {
  index: number
  gameStackId: string
}

export interface ICreateEventRequest {
  title: string
  description: string
  duration: number
  startAt: Date
  rounds: ICreateRoundRequest[]
}

export interface IStartEventData {
  id: string
  slug: number
  startAt: Date
  duration: number
  rounds: {
    id: string
    order: number
    status: BattleStatus
  }[]
}

export interface IStartRoundData {
  id: string
  order: number
  statue: BattleStatus
  gameStack: {
    id: string
  }[]
}
