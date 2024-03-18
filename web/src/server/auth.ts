/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import NextAuth from 'next-auth'

import { ApiResponse } from '@/@types'
import { ILoginResponse } from '@/@types/auth'
import axiosBase from '@/lib/axios-base'
import decode from '@/lib/jwt-decode'

import { refresh } from './actions/auth'
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
        const { data: responseData } = await axiosBase.post<ApiResponse<ILoginResponse>>('/auth/google', {
          token: account.id_token
        })

        if (!responseData) return false

        user.id = responseData.data.user.id
        user.accessToken = responseData.data.accessToken
        user.refreshToken = responseData.data.refreshToken
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
          refreshToken: user.refreshToken,
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

      const { accessToken, accessTokenExpires } = await refresh(token)

      return {
        ...token,
        accessToken,
        accessTokenExpires
      }
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
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  ...authConfig
})
