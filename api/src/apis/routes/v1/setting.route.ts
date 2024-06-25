import { UserRole } from '@prisma/client'
import { Router } from 'express'

import { editThumbnail, getAllThumbnails } from '@/apis/controllers/setting.controller'
import { checkHasRole } from '@/apis/middlewares/check-role'
import { verifyAccessToken } from '@/apis/middlewares/verify-jwt'
import upload from '@/configs/init.multer'

const router = Router()

router
  .route('/')
  .get(getAllThumbnails)
  .post(verifyAccessToken, checkHasRole(UserRole.ADMIN), upload.array('images'), editThumbnail)

export default router
