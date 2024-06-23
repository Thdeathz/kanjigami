import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient().$extends({
  query: {
    gameLog: {
      async upsert({ args, query }) {
        const { update, create } = args

        const userId = update.userId || create.userId || null
        const point = update.point || create.point || null

        if (typeof userId === 'string' && typeof point === 'number') {
          await prisma.user.update({
            where: {
              id: userId,
            },
            data: {
              score: {
                increment: Number(point),
              },
            },
          })
        }

        return query(args)
      },
    },
  },
})

export default prisma
