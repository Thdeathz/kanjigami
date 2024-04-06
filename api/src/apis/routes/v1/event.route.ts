import { Router } from 'express'

import { getAllEvents, getEventBySlug } from '@/apis/controllers/event.controller'
import { verifyAccessToken } from '@/apis/middlewares/verify-jwt'

const router = Router()

router.route('/').get(getAllEvents)

router.route('/:slug').get(verifyAccessToken, getEventBySlug)

export default router
