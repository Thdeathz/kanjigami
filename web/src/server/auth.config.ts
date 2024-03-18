import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'

import { LoginSchema } from '@/schema/auth-schema'
import axiosBase from '@/lib/axios-base'
import { ApiResponse } from '@/@types'
import { ILoginResponse } from '@/@types/auth'

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (!validatedFields.success) return null

        const { email, password } = validatedFields.data

        const { data: responseData } = await axiosBase.post<ApiResponse<ILoginResponse>>('/auth/login', {
          email,
          password
        })

        if (!responseData) return null

        return {
          ...responseData.data.user,
          accessToken: responseData.data.accessToken,
          refreshToken: responseData.data.refreshToken
        }
      }
    })
  ]
} satisfies NextAuthConfig
