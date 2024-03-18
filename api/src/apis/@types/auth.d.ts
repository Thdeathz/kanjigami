import { UserRole } from '@prisma/client'

export interface ILoginRequest {
  email: string
  password: string
}

export interface JwtPayload {
  id: string
  email: string | null
  name: string | null
  role: UserRole | null
}

export interface ICreateAccountRequest {
  email: string
  name: string
}

export interface IRegisterRequest {
  email: string
  password: string
  name: string
}

export interface IResetPasswordRequest {
  email: string
  password: string
  token: string
}
