import type { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'

import { JwtPayload } from '../@types/auth'
import eventService from '../services/event.service'
import makeResponse from '../utils/make-response'

/**
 * @desc Get all events
 * @route GET /events
 * @access Public
 */
export const getAllEvents: RequestHandler = async (req, res) => {
  const page = parseInt(<string>req.query.page) || 1
  const offset = parseInt(<string>req.query.offset) || 6
  const status = req.query.status as string
  const search = req.query.search as string

  const { events, total } = await eventService.getAllEvents(
    {
      page,
      offset,
    },
    status,
    search,
  )

  res.json(makeResponse.pagination('Get all events success', StatusCodes.OK, events, total, offset, page))
}

/**
 * @desc Get event by slug
 * @route GET /events/:slug
 * @access Private
 */
export const getEventBySlug: RequestHandler = async (req, res) => {
  const slug = req.params.slug

  const user = req.user as JwtPayload

  const data = await eventService.getEventBySlug(slug, user?.id)

  res.json(makeResponse.defaultResponse('Get event by slug success', StatusCodes.OK, data))
}

/**
 * @desc Get all events played by user
 * @route GET /events/played
 * @access Private
 */
export const getUserPlayedEventsList: RequestHandler = async (req, res) => {
  const user = req.user as JwtPayload

  const data = await eventService.getUserPlayedEventsList(user.id)

  res.json(makeResponse.defaultResponse('Get user played events list success', StatusCodes.OK, data))
}

/**
 * @desc Get user played event stats
 * @route GET /events/:slug/stats
 * @access Private
 */
export const getUserEventStats: RequestHandler = async (req, res) => {
  const user = req.user as JwtPayload

  const slug = req.query.slug as string

  const data = await eventService.getUserEventStats(user.id, slug)

  res.json(makeResponse.defaultResponse('Get user event stats success', StatusCodes.OK, data))
}
