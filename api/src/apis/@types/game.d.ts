import { GameLogType } from '@prisma/client'

import { JwtPayload } from './auth'

export interface ISaveScoreRequest {
  score: number
  time: number
  type: GameLogType
}

export interface IGameStack {
  id: string
  stack: {
    id: string
    name: string
  }
  game: {
    id: string
    name: string
    image: string
  }
  numberOfWords: number
  timeLimit: number
}

export interface IWord {
  id: string
  content: string
  hiragana: string
  romaji: string
  image: string
}

export interface IGameData {
  user: JwtPayload
  gameStack: IGameStack
  words: IWord[]
}
