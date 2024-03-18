import { Router } from 'express'

import authRoutes from '@/apis/routes/v1/auth.route'
import userRoutes from '@/apis/routes/v1/user.route'

const router = Router()

router.use('/auth', authRoutes)

router.use('/users', userRoutes)

export default router
