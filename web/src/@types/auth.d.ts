export type UserRole = 'USER' | 'ADMIN'

export interface IUserInfo {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface ILoginResponse {
  accessToken: string
  refreshToken: string
  user: IUserInfo
}

export interface IAccessToken {
  token: string
  exp: number
}

export interface IResetPasswordRequest {
  password: string
  token: string
}
