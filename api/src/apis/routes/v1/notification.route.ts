import { Router } from 'express'

import { getNewestNotification } from '@/apis/controllers/notification.controller'

const router = Router()

router.route('/').get(getNewestNotification)

export default router
