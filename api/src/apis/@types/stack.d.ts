export type StacksFilterOption = 'all' | 'not-played' | 'played' | 'followed'

export interface ICreateExampleRequest {
  content: string
  romaji: string
  meaning: string
}

export interface ICreateWordRequest {
  content: string
  hiragana: string
  romaji: string
  meaning: string
  examples: ICreateExampleRequest[]
}

export interface ICreateStackRequest {
  name: string
  description: string
  topic: string
  words: ICreateWordRequest[]
}

export interface IGameStackRequest {
  game: {
    id: string
    name: string
    image: string
  }
  numberOfWords: number
  timeLimit: number
}
