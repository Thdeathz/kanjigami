import { UserRole } from '@prisma/client'
import { Router } from 'express'

import { getAllUsers, getUserProfile } from '@/apis/controllers/user.controller'
import { checkHasRole } from '@/apis/middlewares/check-role'
import { verifyAccessToken } from '@/apis/middlewares/verify-jwt'

const router = Router()

router.route('/').get(verifyAccessToken, checkHasRole(UserRole.ADMIN), getAllUsers)

router.route('/:id').get(getUserProfile)

export default router
