import type { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'

import { CACHE_KEY } from '@/apis/enum/cache-key'
import redisService from '@/apis/services/redis.service'
import userService from '@/apis/services/user.service'
import makeResponse from '@/apis/utils/make-response'

/**
 * @desc Get all users
 * @route GET /users
 * @access Private
 */
export const getAllUsers: RequestHandler = async (req, res) => {
  let users = await redisService.hGet(CACHE_KEY.USERS, { type: 'list' })

  if (!users) {
    users = await userService.getAllUsers()
    await redisService.hSet(CACHE_KEY.USERS, { type: 'list' }, users)
  }

  return res.status(StatusCodes.OK).json(makeResponse.defaultResponse('Get all users success', StatusCodes.OK, users))
}

/**
 * @desc Get user profile
 * @route GET /users/:id
 * @access Private
 */
export const getUserProfile: RequestHandler = async (req, res) => {
  const { id } = req.params
  const data = await userService.getUserProfile(id)

  return res.status(StatusCodes.OK).json(makeResponse.defaultResponse('Get user profile success', StatusCodes.OK, data))
}
