import { Router } from 'express'

import {
  createCheckoutSession,
  createSubscriptionManagementLink,
  stripeWebhook,
} from '@/apis/controllers/plus.controller'
import validateRequest from '@/apis/middlewares/validate-request'
import { verifyAccessToken } from '@/apis/middlewares/verify-jwt'
import { createCheckoutSessionSchema } from '@/apis/validations/plus.validation'

const router = Router()

router.route('/').post(verifyAccessToken, validateRequest(createCheckoutSessionSchema), createCheckoutSession)

router.route('/webhook').post(stripeWebhook)

router.route('/manage').get(verifyAccessToken, createSubscriptionManagementLink)

export default router
