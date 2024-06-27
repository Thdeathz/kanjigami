import { Router } from 'express'

import {
  createNewEvent,
  deleteEvent,
  getAllEvents,
  getEventByCreator,
  getEventBySlug,
  getUserEventStats,
  getUserPlayedEventsList,
} from '@/apis/controllers/event.controller'
import { checkHasRole } from '@/apis/middlewares/check-role'
import validateRequest from '@/apis/middlewares/validate-request'
import { getCurrentUser, verifyAccessToken } from '@/apis/middlewares/verify-jwt'
import { createNewEventSchema } from '@/apis/validations/event.validation'

const router = Router()

router.route('/').get(getAllEvents).post(verifyAccessToken, validateRequest(createNewEventSchema), createNewEvent)

router.route('/creator').get(verifyAccessToken, getEventByCreator)

router.route('/played').get(verifyAccessToken, getUserPlayedEventsList)

router.route('/stats').get(verifyAccessToken, getUserEventStats)

router
  .route('/:slug')
  .get(getCurrentUser, getEventBySlug)
  .delete(verifyAccessToken, checkHasRole('ADMIN'), validateRequest(createNewEventSchema), deleteEvent)

export default router
