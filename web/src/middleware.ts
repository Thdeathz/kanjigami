/* eslint-disable consistent-return */
import { NextResponse } from 'next/server'

import { auth } from '@/server/auth'

import {
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_LOGIN_REDIRECT_ADMIN,
  adminRoutesPrefix,
  apiAuthPrefix,
  authRoutes,
  publicRoutes
} from './routes'

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}

export default auth(async (req) => {
  const { nextUrl } = req
  const token = req.auth
  const isAdmin = token?.user.role === 'ADMIN'

  if (nextUrl.pathname === '/' && !isAdmin) return

  const isAuthApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.find((each) => each.test(nextUrl.pathname))
  const isAdminRoute = nextUrl.pathname.startsWith(adminRoutesPrefix)
  const isAuthRoute = authRoutes.find((each) => each.test(nextUrl.pathname))

  // no effect if is next-auth api route
  if (isAuthApiRoute) return

  // handle auth routes
  if (isAuthRoute) {
    if (!token) return

    if (token.user.role === 'ADMIN') return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT_ADMIN, nextUrl))

    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
  }

  if (isAdminRoute && !isAdmin) return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))

  if (!isAdminRoute && isAdmin) return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT_ADMIN, nextUrl))

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }
})
