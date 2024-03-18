/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import passport from 'passport'

import redisService from '../services/redis.service'
import HttpError from '../utils/http-error'

// import redisService from '../services/redis.service'

export const verifyAccessToken = passport.authenticate('jwt-access-token', { session: false, failWithError: true })

export const verifyRefreshToken = passport.authenticate('jwt-refresh-token', { session: false, failWithError: true })

export const verifyResetPasswordToken = passport.authenticate('jwt-reset-password', {
  session: false,
  failWithError: true,
})

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
