import { Router } from 'express'

import { getAllKanjis, searchKanjis } from '@/apis/controllers/kanji.controller'
import { verifyAccessToken } from '@/apis/middlewares/verify-jwt'

const router = Router()

router.route('/').get(getAllKanjis)

router.route('/search').get(verifyAccessToken, searchKanjis)

export default router
