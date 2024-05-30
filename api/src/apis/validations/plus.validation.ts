import Joi from 'joi'

import { ICheckoutSessionRequest } from '@/apis/@types/plus'

export const createCheckoutSessionSchema = Joi.object<ICheckoutSessionRequest>({
  product: Joi.string().required(),
  userId: Joi.string().required(),
})
