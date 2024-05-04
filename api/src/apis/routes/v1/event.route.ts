import { Router } from 'express'

import { getAllEvents, getEventBySlug } from '@/apis/controllers/event.controller'
import { getCurrentUser } from '@/apis/middlewares/verify-jwt'

const router = Router()

router.route('/').get(getAllEvents)

router.route('/:slug').get(getCurrentUser, getEventBySlug)

export default router
