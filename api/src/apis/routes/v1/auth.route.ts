import { Router } from 'express'

import { login, loginByGoogle, logout, refresh, register } from '@/apis/controllers/auth.controller'
import { resetPassword, sendResetpasswordToken } from '@/apis/controllers/forgot-password'
import limitRequest from '@/apis/middlewares/request-limiter'
import validateRequest from '@/apis/middlewares/validate-request'
import {
  verifyAccessToken,
  verifyCachedToken,
  verifyRefreshToken,
  verifyResetPasswordToken,
} from '@/apis/middlewares/verify-jwt'
import {
  getResetPasswordTokenSchema,
  loginByGoogleSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from '@/apis/validations/auth.validation'

const router = Router()

router.route('/register').post(limitRequest(10), validateRequest(registerSchema), register)

router.route('/login').post(limitRequest(10), validateRequest(loginSchema), login)

router.route('/google').post(limitRequest(10), validateRequest(loginByGoogleSchema), loginByGoogle)

router.route('/refresh').post(verifyRefreshToken, verifyCachedToken('refreshToken'), refresh)

router.route('/logout').post(verifyAccessToken, logout)

router
  .route('/password/token')
  .post(limitRequest(10), validateRequest(getResetPasswordTokenSchema), sendResetpasswordToken)

router
  .route('/password/reset')
  .post(
    limitRequest(3),
    validateRequest(resetPasswordSchema),
    verifyResetPasswordToken,
    verifyCachedToken('verifyToken'),
    resetPassword,
  )

export default router
