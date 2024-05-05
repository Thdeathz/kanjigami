import { Router } from 'express'

import {
  getAllEvents,
  getEventBySlug,
  getUserEventStats,
  getUserPlayedEventsList,
} from '@/apis/controllers/event.controller'
import { getCurrentUser, verifyAccessToken } from '@/apis/middlewares/verify-jwt'

const router = Router()

router.route('/').get(getAllEvents)

router.route('/played').get(verifyAccessToken, getUserPlayedEventsList)

router.route('/stats').get(verifyAccessToken, getUserEventStats)

router.route('/:slug').get(getCurrentUser, getEventBySlug)

export default router
