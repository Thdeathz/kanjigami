export type BattleStatus = 'ongoing' | 'upcoming' | 'finished'

export interface IRemainingTime {
  days: number
  hours: number
  minutes: number
  seconds: number
}
