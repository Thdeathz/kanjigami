import { UserRole } from '@/@types/auth'

const ROLE: {
  [key in UserRole]: UserRole
} = {
  ADMIN: 'ADMIN',
  USER: 'USER'
}

export default ROLE
