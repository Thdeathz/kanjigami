export interface IGetGameContentRequest {
  userId: string
  sessionId: string
}

export interface IUpdateGameStatusRequest {
  userId: string
  sessionId: string
  wordId: string
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
