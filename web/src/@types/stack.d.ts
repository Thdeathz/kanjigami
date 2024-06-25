export interface IStack {
  id: string
  name: string
  slug: number
  image: string
  createdAt: Date
  topic: string
  isFollowed: boolean
  userPoint: number
}

export interface IStackGame {
  id: string
  name: string
  image: string
  userPoint: number
}

export interface IWordItem {
  id: string
  content: string
}

export interface IStackDetail {
  id: string
  name: string
  slug: number
  description: string
  createdAt: Date
  topics: string[]
  isFollowed: boolean
  games: IStackGame[]
  words: IWordItem[]
}

export interface IKanji {
  id: string
  content: string
  meaning: string[]
  kakikata: string
}

export interface IExample {
  id: string
  content: string
  romaji: string
  meaning: string
}

export interface IWordDetail {
  id: string
  content: string
  hiragana: string
  romaji: string
  meaning: string
  image: string
  kanjis: IKanji[]
  examples: IExample[]
}

export interface IKanjiDetail extends IKanji {
  kunyomi: string
  onyomi: string
}

export interface ISearchStackResult {
  id: string
  name: string
  slug: number
  image: string
  createdAt: Date
  topics: {
    name: string
  }[]
  games: {
    id: string
    game: {
      name: string
      image: string
    }
    active?: boolean
  }[]
  numberWords: number
  numberFollowed: number
}

export interface ICreateWordRequest {}
