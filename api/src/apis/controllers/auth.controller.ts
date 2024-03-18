import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'

import { ILoginRequest, JwtPayload } from '@/apis/@types/auth'
import { CACHE_KEY } from '@/apis/enum/cache-key'
import authService from '@/apis/services/auth.service'
import jwtService from '@/apis/services/jwt.service'
import redisService from '@/apis/services/redis.service'
import makeResponse from '@/apis/utils/make-response'

/**
 * @desc Login
 * @route POST /auth/login
 * @access Public
 */
export const login: RequestHandler = async (req, res) => {
  const { email, password } = <ILoginRequest>req.body

  const user = await authService.login({ email, password })

  const newAccessToken = await jwtService.signNewAccessToken(user)

  const newRefreshToken = await jwtService.signNewRefreshToken(user.id)

  return res.status(StatusCodes.OK).json(
    makeResponse.defaultResponse('Login successfully', StatusCodes.OK, {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user,
    }),
  )
}

/**
 * @desc Get new access token
 * @route POST /auth/refresh
 * @access Private
 */
export const refresh: RequestHandler = async (req, res) => {
  const user = req.user as JwtPayload

  const newAccessToken = await jwtService.signNewAccessToken(user)

  return res.status(StatusCodes.OK).json(
    makeResponse.defaultResponse('Get new token successfully', StatusCodes.OK, {
      accessToken: newAccessToken,
    }),
  )
}

/**
 * @desc Login by Google
 * @route POST /auth/google
 * @access Public
 */
export const loginByGoogle: RequestHandler = async (req, res) => {
  const token = req.body.token as string

  const user = await authService.loginByGoogle(token)

  const newAccessToken = await jwtService.signNewAccessToken(user)

  const newRefreshToken = await jwtService.signNewRefreshToken(user.id)

  return res.status(StatusCodes.OK).json(
    makeResponse.defaultResponse('Login by Google successfully', StatusCodes.OK, {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user,
    }),
  )
}

/**
 * @desc Logout
 * @route POST /auth/logout
 * @access Private
 */
export const logout: RequestHandler = async (req, res) => {
  const user = req.user as JwtPayload

  await jwtService.revokeToken('refreshToken', user.id)

  return res.status(StatusCodes.OK).json(makeResponse.defaultResponse('Logout successfully', StatusCodes.OK))
}

/**
 * @desc Register
 * @route POST /auth/register
 * @access Public
 */
export const register: RequestHandler = async (req, res) => {
  const { email, password, name } = req.body

  console.log('email', email)

  await authService.register({ email, password, name })

  // clear cache
  await redisService.deleteByKey(CACHE_KEY.USERS, { type: 'list' })

  res.status(StatusCodes.OK).json(makeResponse.defaultResponse('Register successfully', StatusCodes.OK))
}
