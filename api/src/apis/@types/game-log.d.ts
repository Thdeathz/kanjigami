export interface TopUser {
  id: string
  name: string
  image: string
  point: number
  time: number
  totalGame?: number
}

export interface IUserStats {
  point: number
  time: number
  totalGame: number
}

export interface EventsTopUser extends TopUser {
  eventId: string
}
