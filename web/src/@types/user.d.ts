import { UserRole } from './auth'

export interface IUser {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface IUserData {
  id: string
  name: string
  email: string
  image: string
  score: number
}

export interface IUserStats {
  point: number
  time: string
  totalGame: number
}

export interface IUserProfile {
  user: IUserData
  stats: {
    event: IUserStats
    stack: IUserStats
  }
}
