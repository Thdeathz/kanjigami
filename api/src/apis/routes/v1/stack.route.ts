import { Router } from 'express'

import {
  followStack,
  getAllStacks,
  getWordDetail,
  getStackBySlug,
  getKanjiDetail,
} from '@/apis/controllers/stack.controller'
import limitRequest from '@/apis/middlewares/request-limiter'
import { getCurrentUser, verifyAccessToken } from '@/apis/middlewares/verify-jwt'

const router = Router()

router.route('/').get(getCurrentUser, getAllStacks)

router.route('/word/:id').get(getWordDetail)

router.route('/kanji').get(getKanjiDetail)

router.route('/:slug').get(verifyAccessToken, getStackBySlug)

router.route('/:id/follow').post(limitRequest(20), verifyAccessToken, followStack)

export default router
