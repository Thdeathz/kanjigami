import type { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'

import HttpError from '@/apis/utils/http-error'

type ValidateRequest = (schema: Joi.ObjectSchema) => RequestHandler

const validateRequest: ValidateRequest = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body)

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message).join(', ')
    next(new HttpError(StatusCodes.BAD_REQUEST, errorMessages))
  }

  if (!(req as any).value) (req as any).value = {}
  ;(req as any).value.body = value

  next()
}

export default validateRequest
