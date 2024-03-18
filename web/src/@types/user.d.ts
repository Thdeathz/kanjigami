import { UserRole } from './auth'

export interface IUser {
  id: string
  name: string
  email: string
  role: UserRole
}
