/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RequestHandler } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import passport from 'passport'

import jwtService from '../services/jwt.service'
import redisService from '../services/redis.service'
import HttpError from '../utils/http-error'

// import redisService from '../services/redis.service'

export const verifyAccessToken = passport.authenticate('jwt-access-token', { session: false, failWithError: true })

export const verifyRefreshToken = passport.authenticate('jwt-refresh-token', { session: false, failWithError: true })

export const verifyResetPasswordToken = passport.authenticate('jwt-reset-password', {
  session: false,
  failWithError: true,
})

export const getCurrentUser: RequestHandler = async (req, res, next) => {
  const authHeader = (req.headers.authorization || req.headers.Authorization) as string | undefined

  if (authHeader?.startsWith('Bearer ')) {
    const token: string = authHeader.split(' ')[1]

    const decodedData = await jwtService.decodeAccessToken(token)

    ;(req as any).user = decodedData
  }

  next()
}

export const verifyCachedToken = (tokenCategory: string) => async (req, res, next) => {
  if (!req.user.id || !req.body.token) throw new HttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)

  const id = req.user.id as string
  const token = req.body.token as string

  const foundedToken = await redisService.get(tokenCategory, id)

  if (!foundedToken || foundedToken !== token) {
    throw new HttpError(StatusCodes.UNAUTHORIZED, 'Unauthorized/Invalid token')
  }

  return next()
}
