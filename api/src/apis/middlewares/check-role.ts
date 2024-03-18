/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserRole } from '@prisma/client'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import HttpError from '@/apis/utils/http-error'

export const checkHasRole = (role: UserRole) => (req, res, next) => {
  if (req.user.role !== role) {
    next(new HttpError(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN))
  }

  next()
}
