import { IImageContent, IMultipleChoiceContent, IWordContent } from '@/apis/@types/game'
import { IOngoingEvent } from '~/api/@types/event'

export interface IUserInfo {
  id: string
  name: string
  email: string
  image?: string
  score: number
  role: UserRole
  isPlus: boolean
}

export interface IJoinedUser {
  user: IUserInfo
  round: {
    order: string
    sessionId: string
    point: number
    time: number
  }[]
}

export interface IEventData {
  data: IOngoingEvent
  users: IJoinedUser[]
}

export interface IBattleRoundData {
  gameStack: {
    id: string
    numberOfWords: number
    timeLimit: number
    stack: {
      id: string
      slug: number
      name: string
    }
    game: {
      id: string
      name: string
      image: string
    }
  }
  words:
    | {
        id: string
        content: string
        romaji: string
      }[]
    | (IImageContent | IWordContent)[]
    | IMultipleChoiceContent[]
}

export interface IJoinRoundRequest {
  battleSlug: string
  roundIndex: string
  sessionId: string
  user: IUserInfo
}
