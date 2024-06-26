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

const getAllRanks = async () => {
  return await prisma.rank.findMany({
    select: {
      id: true,
      icon: true,
      name: true,
      score: true,
    },
    orderBy: {
      score: 'desc',
    },
  })
}

type EditRankProps = {
  ids: string[]
  names: string[]
  scores: number[]
  icons: string[]
  newIconsUrl: string[]
}

const editRank = async ({ ids, names, scores, icons, newIconsUrl }: EditRankProps) => {
  for (let i = 0; i < ids.length; i++) {
    let icon = ''
    if (icons?.length > 0 && icons[i]) {
      icon = icons[i]
    } else {
      icon = newIconsUrl.shift() as string
    }

    await prisma.rank.update({
      where: {
        id: ids[i],
      },
      data: {
        name: names[i],
        score: Number(scores[i]),
        icon,
      },
    })
  }
}

export default {
  getUserRank,
  getAllRanks,
  editRank,
}
