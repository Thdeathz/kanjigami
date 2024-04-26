import prisma from '../databases/init.prisma'

const getWordDetail = async (id: string) => {
  return await prisma.word.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      content: true,
      hiragana: true,
      romaji: true,
      meaning: true,
      image: true,
      kanjis: {
        select: {
          id: true,
          content: true,
          meaning: true,
          kakikata: true,
        },
      },
      examples: {
        select: {
          id: true,
          content: true,
          romaji: true,
          meaning: true,
        },
      },
    },
  })
}

export default {
  getWordDetail,
}
