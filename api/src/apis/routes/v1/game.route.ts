import { Router } from 'express'

import { getGameResult, getGameStackDetail, saveScore, startGame } from '@/apis/controllers/game.controller'
import validateRequest from '@/apis/middlewares/validate-request'
import { verifyAccessToken } from '@/apis/middlewares/verify-jwt'
import { saveScoreSchema } from '@/apis/validations/game.validation'

const router = Router()

router.route('/:id/start').post(verifyAccessToken, startGame)

router.route('/:id/log').get(verifyAccessToken, getGameResult)

router
  .route('/:id')
  .get(verifyAccessToken, getGameStackDetail)
  .post(verifyAccessToken, validateRequest(saveScoreSchema), saveScore)

export default router
