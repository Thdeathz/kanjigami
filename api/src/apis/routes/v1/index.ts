import { Router } from 'express'

import authRoutes from '@/apis/routes/v1/auth.route'
import eventRoutes from '@/apis/routes/v1/event.route'
import gameLogRoutes from '@/apis/routes/v1/game-log.route'
import gameRoutes from '@/apis/routes/v1/game.route'
import kanjiRoutes from '@/apis/routes/v1/kanji.route'
import notificationRoutes from '@/apis/routes/v1/notification.route'
import plusRoutes from '@/apis/routes/v1/plus.route'
import settingRoutes from '@/apis/routes/v1/setting.route'
import stackRoutes from '@/apis/routes/v1/stack.route'
import userRoutes from '@/apis/routes/v1/user.route'

const router = Router()

router.use('/auth', authRoutes)

router.use('/users', userRoutes)

router.use('/stacks', stackRoutes)

router.use('/events', eventRoutes)

router.use('/leaderboards', gameLogRoutes)

router.use('/games', gameRoutes)

router.use('/notifications', notificationRoutes)

router.use('/plus', plusRoutes)

router.use('/kanjis', kanjiRoutes)

router.use('/settings', settingRoutes)

export default router
