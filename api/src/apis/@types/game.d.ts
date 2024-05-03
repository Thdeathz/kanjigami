import { GameLogType, Word } from '@prisma/client'

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
  image: string | null
}

export interface IGameData<T> {
  user: JwtPayload
  gameStack: IGameStack
  words: T[]
}

export interface IImageContent {
  type: 'image'
  id: string
  image: string
  hiragana: string
  isVisible: boolean
}

export interface IWordContent {
  type: 'word'
  id: string
  content: string
  isVisible: boolean
}

export type FlipCardGameContent = IImageContent | IWordContent

export interface IMultipleChoiceContent {
  answer: Pick<Word, 'id' | 'hiragana'>
  options: Pick<Word, 'id' | 'hiragana'>[]
  question: (Pick<Word, 'id' | 'content'> & { type: 'word' }) | (Pick<Word, 'id'> & { type: 'image'; image: string })
}
