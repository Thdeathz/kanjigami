import { GameLogType } from '@prisma/client'

export interface ISaveScoreRequest {
  score: number
  time: number
  type: GameLogType
}
