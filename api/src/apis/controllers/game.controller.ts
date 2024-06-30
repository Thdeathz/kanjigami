import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import uniqueSlug from 'unique-slug'

import { JwtPayload } from '@/apis/@types/auth'
import { ISaveScoreRequest } from '@/apis/@types/game'
import gameService from '@/apis/services/game.service'
import redisService from '@/apis/services/redis.service'
import makeResponse from '@/apis/utils/make-response'

/**
 * @desc Get game stack detail
 * @route POST /games/:id
 * @access Private
 */
export const getGameStackDetail: RequestHandler = async (req, res) => {
  const { id } = req.params

  const gameStack = await gameService.getGameStackDetail(id)

  return res
    .status(StatusCodes.OK)
    .json(makeResponse.defaultResponse('Get game stack success', StatusCodes.OK, gameStack))
}

/**
 * @desc Start game
 * @route POST /games/:id/start
 * @access Private
 */
export const startGame: RequestHandler = async (req, res) => {
  const { id } = req.params

  const user = req.user as JwtPayload

  const sessionId = uniqueSlug()

  const { gameStack, words } = await gameService.getGameData(id)

  await redisService.setex('game', sessionId, gameStack.timeLimit.toString(), { user, gameStack, words })

  return res
    .status(StatusCodes.OK)
    .json(makeResponse.defaultResponse('Start game success', StatusCodes.OK, { sessionId }))
}

/**
 * @desc Save user score
 * @route POST /games/:id
 * @access Private
 */
export const saveScore: RequestHandler = async (req, res) => {
  const { id: gameStackId } = req.params
  const { score, time, type } = req.body as ISaveScoreRequest

  const user = req.user as JwtPayload

  const data = await gameService.saveScoreOfflineGame(gameStackId, user.id, { score, time, type })

  return res.status(StatusCodes.OK).json(makeResponse.defaultResponse('Save score success', StatusCodes.OK, data))
}

/**
 * @desc Get game log detail
 * @route GET /games/:id/log
 * @access Private
 */
export const getGameResult: RequestHandler = async (req, res) => {
  const { id } = req.params

  const result = await gameService.getResult(id)

  return res
    .status(StatusCodes.OK)
    .json(makeResponse.defaultResponse('Get game result success', StatusCodes.OK, result))
}

/**
 * @desc Get all game
 * @route GET /games
 * @access Public
 */
export const getAllGame: RequestHandler = async (req, res) => {
  const games = await gameService.getAllGame()

  return res.status(StatusCodes.OK).json(makeResponse.defaultResponse('Get all game success', StatusCodes.OK, games))
}
