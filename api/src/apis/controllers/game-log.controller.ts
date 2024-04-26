import type { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'

import gameLogService from '../services/game-log.service'
import makeResponse from '../utils/make-response'

/**
 * @desc Get all time leaderboard
 * @route GET /leaderboards/all-time
 * @access Public
 */
export const getAllTimeLeaderboard: RequestHandler = async (req, res) => {
  const leaderboard = await gameLogService.getAllTimeLeaderboard()

  return res
    .status(StatusCodes.OK)
    .json(makeResponse.defaultResponse('Get all time leaderboard success', StatusCodes.OK, leaderboard))
}

/**
 * @desc Get event leaderboard
 * @route GET /leaderboards/event
 * @access Public
 */
export const getEventsLeaderboard: RequestHandler = async (req, res) => {
  const id = req.query.id as string
  const offset = parseInt(<string>req.query.offset) || 10
  const leaderboard = await gameLogService.getEventRoundLeaderboard(offset, id)

  return res
    .status(StatusCodes.OK)
    .json(makeResponse.defaultResponse('Get event leaderboard success', StatusCodes.OK, leaderboard))
}

/**
 * @desc Get stack leaderboard
 * @route GET /leaderboards/stack
 * @access Public
 */
export const getStacksLeaderboard: RequestHandler = async (req, res) => {
  const slug = req.query.slug as string
  const offset = parseInt(<string>req.query.offset) || 50
  const leaderboard = await gameLogService.getStacksLeaderboard(offset, Number(slug))

  return res
    .status(StatusCodes.OK)
    .json(makeResponse.defaultResponse('Get stacks leaderboard success', StatusCodes.OK, leaderboard))
}
