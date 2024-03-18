/* eslint-disable @typescript-eslint/no-unused-vars */
import dotenv from 'dotenv'
import type { ErrorRequestHandler } from 'express'

import makeResponse from '@/apis/utils/make-response'

dotenv.config()

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const status: number = err.statusCode || res.statusCode || 500

  if (process.env.NODE_ENV === 'development') console.error(err)

  res.status(status).json(makeResponse.defaultResponse(err.message, status))
}

export default errorHandler
