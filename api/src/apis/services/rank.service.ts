import prisma from '../databases/init.prisma'

const getUserRank = async (score: number) => {
  const data = await prisma.rank.findFirst({
    where: {
      score: {
        lte: score,
      },
    },
    select: {
      icon: true,
      name: true,
      score: true,
    },
    orderBy: {
      score: 'desc',
    },
  })

  return data
}

export default {
  getUserRank,
}
