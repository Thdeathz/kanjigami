export interface IGetGameContentRequest {
  userId: string
  sessionId: string
  type: 'ONLINE' | 'OFFLINE'
}

export interface IUpdateGameStatusRequest {
  userId: string
  sessionId: string
  wordId: string
  type: 'ONLINE' | 'OFFLINE'
  battleSlug?: string
  roundIndex?: string
}

export interface ISaveGameScoreRequest {
  userId: string
  sessionId: string
  gameId: string
  stackId: string
  score: number
}

export interface IUserSelectAnswers {
  question: number
  selectedAnswer: number
}

export interface IUserSubmitAnswerRequest {
  userId: string
  sessionId: string
  gameContent: UserSelectAnswers[]
}
