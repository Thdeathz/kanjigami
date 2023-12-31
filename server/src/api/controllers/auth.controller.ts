import { type RequestHandler } from 'express'

import { LoginRequest } from '../@types/auth'
import authService from '../services/auth.service'
import jwtService from '../services/jwt.service'

/**
 * @desc Login
 * @route POST /auth
 * @access Public
 */
export const login: RequestHandler = async (req, res) => {
  const { email, password } = <LoginRequest>req.body

  const account = await authService.authenticateUser(email, password)

  const userData = {
    UserInfo: {
      id: account.userId,
      email: account.email,
      username: account.user.username,
      avatarUrl: account.user.avatarUrl ?? undefined,
      roles: account.user.roles
    }
  }

  // gen new token
  const accessToken: string = await jwtService.signNewAccessToken(userData)
  const refreshToken: string = await jwtService.signNewRefreshToken(userData)

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 7 // match to refresh token expiration
  })

  res.json({ accessToken })
}

/**
 * @desc Login with Google
 * @route POST /auth/google
 * @access Public
 */
export const loginWithGoogle: RequestHandler = async (req, res) => {
  const googleIdToken = req.body.googleIdToken

  const { uid, username, avatarUrl, email } = await authService.validateGoogleIdToken(googleIdToken)

  const jwtPayload = await authService.findOrCreateAccount({ id: uid, username, avatarUrl, email })

  return await jwtService.sendResWithTokens({ ...jwtPayload }, req.cookies, res)
}

/**
 * @desc Refresh
 * @route POST /auth/refresh
 * @access Public
 */
export const refresh: RequestHandler = async (req, res) => {
  const cookie = req.cookies
  if (!cookie.jwt) return res.status(403).json({ message: 'Unauthorized' })

  // clear current refresh token
  const refreshToken: string = cookie.jwt
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'none',
    secure: true
  })

  const currentUser = await authService.verifyRefreshToken(refreshToken)

  return await jwtService.sendResWithTokens(
    {
      UserInfo: {
        ...currentUser.userData
      }
    },
    cookie,
    res
  )
}

/**
 * @desc Logout
 * @route POST /auth/logout
 * @access Public
 */
export const logout: RequestHandler = async (req, res) => {
  const cookie = req.cookies
  if (!cookie.jwt) return res.status(204)

  // clear jwt cookie
  res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none' })

  // clear refresh token in database
  await jwtService.clearRefreshToken(cookie.jwt)

  res.json({ message: 'Logged out. Cookie cleared ><!' })
}
