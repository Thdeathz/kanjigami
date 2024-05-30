/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'

import { IAccessToken, UserRole } from './auth'

interface IUserInfo {
  id: string
  role: UserRole
}

declare module 'next-auth' {
  interface Session {
    user: IUserInfo
    accessToken: string
    accessTokenExpires: number
    refreshToken: string
  }

  interface User {
    id: string
    accessToken: string
    refreshToken: string
  }

  interface Token {
    user: IUserInfo
    accessToken: string
    accessTokenExpires: number
    refreshToken: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: IUserInfo
    accessToken: string
    accessTokenExpires: number
    refreshToken: string
  }
}
