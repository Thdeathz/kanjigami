export interface ITopUser {
  user: {
    id: string
    name: string
    image: string
  }
  point: number
  time: string
  totalGame?: number
}

export type LeaderboardType = 'all-time' | 'event' | 'stack'
