import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

prisma.$use(async (params, next) => {
  if (params.model === 'GameLog') {
    if (params.action === 'create' || params.action === 'update') {
      const { data } = params.args

      if (data?.point && data?.userId) {
        await prisma.user.update({
          where: {
            id: data.userId,
          },
          data: {
            score: {
              increment: Number(data.point),
            },
          },
        })
      }
    }
  }

  return next(params)
})

export default prisma
