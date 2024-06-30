import { Router } from 'express'

import {
  followStack,
  getAllStacks,
  getWordDetail,
  getStackBySlug,
  getKanjiDetail,
  searchStacks,
  createStack,
  getStackByAuthor,
  getStackDetailToEdit,
  editGameStack,
} from '@/apis/controllers/stack.controller'
import limitRequest from '@/apis/middlewares/request-limiter'
import { getCurrentUser, verifyAccessToken } from '@/apis/middlewares/verify-jwt'
import upload from '@/configs/init.multer'

const router = Router()

router.route('/').get(getCurrentUser, getAllStacks).post(verifyAccessToken, upload.array('images'), createStack)

router.route('/word/:id').get(getWordDetail)

router.route('/kanji').get(getKanjiDetail)

router.route('/author').get(verifyAccessToken, getStackByAuthor)

router.route('/search').get(verifyAccessToken, searchStacks)

router.route('/:slug').get(getCurrentUser, getStackBySlug)

router.route('/:slug/game').post(verifyAccessToken, editGameStack)

router.route('/:slug/edit').get(verifyAccessToken, getStackDetailToEdit)

router.route('/:id/follow').post(limitRequest(20), verifyAccessToken, followStack)

export default router
