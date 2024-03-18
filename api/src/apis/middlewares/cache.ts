import type { RequestHandler } from 'express'

import redisService from '../services/redis.service'

export const clearCache: RequestHandler = async (req, res, next) => {
  const { key, type } = res.locals

  await redisService.deleteByKey(key, type)

  next()
}
