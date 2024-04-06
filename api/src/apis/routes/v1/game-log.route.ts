import { Router } from 'express'

import {
  getAllTimeLeaderboard,
  getEventsLeaderboard,
  getStacksLeaderboard,
} from '@/apis/controllers/game-log.controller'

const router = Router()

router.route('/').get(getAllTimeLeaderboard)

router.route('/event').get(getEventsLeaderboard)

router.route('/stack').get(getStacksLeaderboard)

export default router
