import prisma from '../databases/init.prisma'

const getKanjiDetail = async (kanji: string) => {
  return await prisma.kanji.findUnique({
    where: {
      content: kanji,
    },
    select: {
      id: true,
      content: true,
      kunyomi: true,
      onyomi: true,
      kakikata: true,
      meaning: true,
    },
  })
}

const getAllKanjis = async ({ page, offset }: { page: number; offset: number }) => {
  const total = await prisma.kanji.count()

  const kanjis = await prisma.kanji.findMany({
    skip: (page - 1) * offset,
    take: offset,
    select: {
      id: true,
      content: true,
      kunyomi: true,
      onyomi: true,
      kakikata: true,
      meaning: true,
    },
  })

  return { kanjis, total }
}

const searchKanjis = async (query: string) => {
  return await prisma.kanji.findMany({
    where: {
      OR: [
        {
          content: {
            contains: query,
          },
        },
        {
          kunyomi: {
            contains: query,
          },
        },
        {
          onyomi: {
            contains: query,
          },
        },
        {
          kakikata: {
            contains: query,
          },
        },
      ],
    },
    select: {
      id: true,
      content: true,
      kunyomi: true,
      onyomi: true,
      kakikata: true,
      meaning: true,
    },
  })
}

export default {
  getKanjiDetail,
  getAllKanjis,
  searchKanjis,
}
