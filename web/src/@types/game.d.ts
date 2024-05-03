export interface IGame {
  id: string
  name: string
  image: string
}

export interface IGameStackDetail {
  id: string
  stack: {
    id: string
    slug: number
    name: string
  }
  game: IGame
  numberOfWords: number
  timeLimit: number
}

export interface IGameResult {
  point: number
  time: number
  gameStack: {
    id: string
    stack: {
      id: string
      name: string
    }
    game: IGame
  }
}

// KANJI SHOOTER
export interface IKanjiShooterContent {
  id: string
  content: string
  romaji: string
}

export interface IKanjiShooterCalculateScore {
  score: number
}

export interface Position {
  x: number
  y: number
}

export interface ILayer {
  image: HTMLImageElement
  framesMax: number
  framesCurrent: number
  offset: Position
  imageSrc: string
}

export interface ISpriteState {
  [key: string]: ILayer[]
}

export interface ISprite {
  position: Position
  radius?: number
  scale?: number
  framesElapsed?: number
  framesHold?: number
  isRotatable?: boolean
  angle?: number
  sprites: ISpriteState
}

export interface IEnemy {
  sprites: ISpriteState
  radius: number
  speed?: number
  damage: number
  framesHold?: number
  id: number
  scale?: number
  maxLives?: number
}

// FLIP CARD GAME
export interface IFlipCardGameContent {
  id: string
  content: string
  hiragana: string
  image: string
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

export interface ActiveCard {
  card: EventTarget & HTMLDivElement
  word: IImageContent | IWordContent
}

export type FlipCardGameContent = IImageContent | IWordContent

// MULTIPLE CHOICE GAME
export interface IWordQuestion {
  id: string
  content: string
  type: 'word'
}

export interface IImageQuestion {
  id: string
  type: 'image'
  image: string
}

export interface Option {
  id: string
  hiragana: string
}

export interface IMultipleChoiceGameContent {
  question: IWordQuestion | IImageQuestion
  options: Option[]
  answer: Option
  selectedAnswer?: number
}
