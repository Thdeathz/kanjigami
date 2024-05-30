import { UserRole } from '@prisma/client'
import { Router } from 'express'

import {
  getAllUsers,
  getCurrentUserData,
  getUserProfile,
  searchUserByUsername,
  updateUserAvatar,
  updateUsername,
} from '@/apis/controllers/user.controller'
import { checkHasRole } from '@/apis/middlewares/check-role'
import { verifyAccessToken } from '@/apis/middlewares/verify-jwt'
import upload from '@/configs/init.multer'

const router = Router()

router.route('/').get(verifyAccessToken, checkHasRole(UserRole.ADMIN), getAllUsers)

router.route('/search').get(searchUserByUsername)

router.route('/profile').get(getUserProfile)

router.route('/me').get(verifyAccessToken, getCurrentUserData)

router.route('/username').put(verifyAccessToken, updateUsername)

router.route('/avatar').put(verifyAccessToken, upload.single('file'), updateUserAvatar)

export default router
