/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'

import { IAccessToken, IUserInfo } from './auth'

declare module 'next-auth' {
  interface Session {
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
    accessToken: string
    accessTokenExpires: number
    refreshToken: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string
    accessTokenExpires: number
    refreshToken: string
  }
}
