/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import NextAuth from 'next-auth'

import { ApiResponse } from '@/@types'
import { ILoginResponse } from '@/@types/auth'
import fetchBase from '@/lib/fetch-base'
import decode from '@/lib/jwt-decode'

import authConfig from './auth.config'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account && account.provider === 'google') {
        const { data: responseData } = await fetchBase<ApiResponse<ILoginResponse>>({
          method: 'POST',
          endpoint: '/auth/google',
          body: JSON.stringify({
            token: account.id_token
          })
        })

        if (!responseData) return false

        user.id = responseData.user.id
        user.accessToken = responseData.accessToken
        user.refreshToken = responseData.refreshToken
      }

      return true
    },

    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        const decodedToken = decode(user.accessToken)

        return {
          ...token,
          accessToken: user.accessToken,
          accessTokenExpires: decodedToken.exp,
          user: decodedToken.user
        }
      }

      /**
       * This config bellow still not working as expected
       * should be fixed in the future
       * check the issue here: https://github.com/nextauthjs/next-auth/discussions/6642
       */
      // Token still valid
      if (Date.now() < token.accessTokenExpires) {
        return token
      }

      // TODO: uncomment this when the refresh token rotation is working
      // const { accessToken, accessTokenExpires } = await refresh(token)

      // return {
      //   ...token,
      //   accessToken,
      //   accessTokenExpires
      // }

      return null
    },

    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        accessTokenExpires: token.accessTokenExpires,
        refreshToken: token.refreshToken,
        user: token.user
      }
    }
  },
  trustHost: true,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30
  },
  ...authConfig
})
