import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'

import { LoginSchema } from '@/schema/auth-schema'
import { ApiResponse } from '@/@types'
import { ILoginResponse } from '@/@types/auth'
import fetchBase from '@/lib/fetch-base'

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (!validatedFields.success) return null

        const { email, password } = validatedFields.data

        const response = await fetchBase<ApiResponse<ILoginResponse>>({
          method: 'POST',
          endpoint: '/auth/login',
          body: JSON.stringify({
            email,
            password
          })
        })

        if (!response || !response.data) return null

        return {
          ...response.data.user,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken
        }
      }
    })
  ]
} satisfies NextAuthConfig
