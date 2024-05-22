import type { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'

import { JwtPayload } from '@/apis/@types/auth'
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
 * @route GET /users/profile
 * @access Public
 */
export const getUserProfile: RequestHandler = async (req, res) => {
  const player = req.query.player as string
  const data = await userService.getUserProfile(player)

  return res.status(StatusCodes.OK).json(makeResponse.defaultResponse('Get user profile success', StatusCodes.OK, data))
}

/**
 * @desc Get current user data
 * @route GET /users/me
 * @access Private
 */
export const getCurrentUserData: RequestHandler = async (req, res) => {
  const user = req.user as JwtPayload

  const data = await userService.getCurrentUserInfo(user.id)

  return res
    .status(StatusCodes.OK)
    .json(makeResponse.defaultResponse('Get current user data success', StatusCodes.OK, data))
}

/**
 * @desc Update user name
 * @route PUT /users/username
 * @access Private
 */
export const updateUsername: RequestHandler = async (req, res) => {
  const user = req.user as JwtPayload

  const username = req.body.username

  await userService.updateUsername(user.id, username)

  return res.status(StatusCodes.OK).json(makeResponse.defaultResponse('Update username success', StatusCodes.OK))
}

/**
 * @desc Update user avatar
 * @route PUT /users/avatar
 * @access Private
 */
export const updateUserAvatar: RequestHandler = async (req, res) => {
  const user = req.user as JwtPayload

  const image = req.file?.buffer
  const extension = req.file?.originalname.split('.').pop()

  console.log(image, extension)

  if (!image || !extension)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(makeResponse.defaultResponse('Image is required', StatusCodes.BAD_REQUEST))

  // TODO: Upload image to google cloud storage
  const imageUrl = 'xxx'
  await userService.updateUserAvatar(user.id, imageUrl)

  return res.status(StatusCodes.OK).json(makeResponse.defaultResponse('Update user avatar success', StatusCodes.OK))
}
