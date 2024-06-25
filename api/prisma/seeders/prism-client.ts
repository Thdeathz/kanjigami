import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient().$extends({
  query: {
    gameLog: {
      async update({ args, query }) {
        const { data, where } = args
        if (typeof data.userId !== 'string') return query(args)
        const oldGameLog = await prisma.gameLog.findUnique({
          where,
          select: {
            point: true,
          },
        })
        const realIncrement = Number(data.point) - Number(oldGameLog?.point || 0)
        await prisma.user.update({
          where: {
            id: data.userId,
          },
          data: {
            score: {
              increment: Number(realIncrement),
            },
          },
        })
      },
      async create({ args, query }) {
        const { data } = args
        if (!data.user?.connect?.id) return query(args)
        await prisma.user.update({
          where: {
            id: data.user.connect.id,
          },
          data: {
            score: {
              increment: Number(data.point),
            },
          },
        })
        return query(args)
      },

      async createMany({ args, query }) {
        const { data } = args

        if (Array.isArray(data)) {
          await Promise.all(
            data.map(async (gameLog) => {
              return await prisma.user.update({
                where: {
                  id: gameLog.userId,
                },
                data: {
                  score: {
                    increment: Number(gameLog.point),
                  },
                },
              })
            }),
          )

          return query(args)
        }

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
        return query(args)
      },
    },
  },
})

export default prisma
