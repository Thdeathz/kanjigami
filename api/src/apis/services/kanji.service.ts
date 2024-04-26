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

export default {
  getKanjiDetail,
}
