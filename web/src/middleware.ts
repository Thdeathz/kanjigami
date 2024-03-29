/* eslint-disable consistent-return */
import { NextResponse } from 'next/server'

import { auth } from '@/server/auth'

import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, protectedRoutes, publicRoutes } from './routes'

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}

export default auth(async (req) => {
  const { nextUrl } = req
  const token = req.auth

  const isAuthApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.find((each) => each.test(nextUrl.pathname))
  const isProtectedRoutes = protectedRoutes.find((each) => each.test(nextUrl.pathname))
  const isAuthRoute = authRoutes.find((each) => each.test(nextUrl.pathname))

  // no effect if is next-auth api route
  if (isAuthApiRoute) return

  // handle protected routes
  if (isAuthRoute) {
    if (token) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }

    return
  }

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }
})
