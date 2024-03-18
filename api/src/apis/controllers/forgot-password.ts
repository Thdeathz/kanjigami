import type { RequestHandler } from 'express'

import { JwtPayload } from '../@types/auth'
import passwordService from '../services/password.service'

/**
 * @desc Get verify token
 * @route GET /auth/password/token
 * @access Public
 */
export const sendResetpasswordToken: RequestHandler = async (req, res) => {
  await passwordService.generateVerifyToken(req.body.email)

  return res.status(200).json({ message: 'Reset password email sent' })
}

/**
 * @desc Reset password
 * @route POST /auth/password/reset
 * @access Public
 */
export const resetPassword: RequestHandler = async (req, res) => {
  const { id } = req.user as JwtPayload
  const { password } = req.body

  await passwordService.resetPassword(id, password)

  return res.status(200).json({ message: 'Password reset successfully' })
}
