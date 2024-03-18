import { StatusCodes } from 'http-status-codes'

import HttpError from '../utils/http-error'

import jwtService from './jwt.service'
import mailService from './mail.service'
import userService from './user.service'

const generateVerifyToken = async (email: string) => {
  const foundUser = await userService.getUserByEmail(email)

  if (!foundUser || !foundUser.email) throw new HttpError(StatusCodes.NOT_FOUND, 'Email not found')

  const newVerifyToken = await jwtService.signVerifyToken(foundUser.id)

  if (!newVerifyToken) throw new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, 'Cannot generate verify token')

  await mailService.sendResetPasswordEmail(foundUser.email, newVerifyToken)

  return true
}

const resetPassword = async (userId: string, password: string) => {
  await userService.updateUserPassword(userId, password)

  await jwtService.revokeToken('verifyToken', userId)

  return true
}

export default {
  generateVerifyToken,
  resetPassword,
}
