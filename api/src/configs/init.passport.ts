import dotenv from 'dotenv'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptionsWithoutRequest } from 'passport-jwt'

import { JwtPayload } from '@/apis/@types/auth'
import userService from '@/apis/services/user.service'
import HttpError from '@/apis/utils/http-error'

dotenv.config()

const accessTokenOptions: StrategyOptionsWithoutRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET ?? 'secret',
}

const refreshTokenOptions: StrategyOptionsWithoutRequest = {
  jwtFromRequest: ExtractJwt.fromBodyField('token'),
  secretOrKey: process.env.REFRESH_TOKEN_SECRET ?? 'secret',
}

const resetPasswordOptions: StrategyOptionsWithoutRequest = {
  jwtFromRequest: ExtractJwt.fromBodyField('token'),
  secretOrKey: process.env.VERIFY_TOKEN_SECRET ?? 'secret',
}

passport.use(
  'jwt-access-token',
  new JwtStrategy(accessTokenOptions, async (payload, done) => {
    const { id } = payload as JwtPayload

    try {
      const foundedUser = await userService.getUserById(id)

      return done(null, foundedUser)
    } catch (error) {
      done(error, false)
    }
  }),
)

passport.use(
  'jwt-refresh-token',
  new JwtStrategy(refreshTokenOptions, async (payload, done) => {
    const { id } = payload as JwtPayload

    try {
      const foundedUser = await userService.getUserById(id)

      if (!foundedUser) return done(new HttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED), false)

      return done(null, foundedUser)
    } catch (error) {
      done(error, false)
    }
  }),
)

passport.use(
  'jwt-reset-password',
  new JwtStrategy(resetPasswordOptions, async (payload, done) => {
    const id = payload.id as string

    try {
      const foundedUser = await userService.getUserById(id)

      return done(null, foundedUser)
    } catch (error) {
      done(error, false)
    }
  }),
)

export default passport
