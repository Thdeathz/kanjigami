import kanjiFactory from '../factories/kanji.factory'

import prisma from './prism-client'

const kanjiSeeder = async () => {
  console.log('🌱 Seeding Kanjis...')
  const kanjisData = await kanjiFactory()

  const kanjis = await Promise.all(
    kanjisData.map(
      async (kanji) =>
        await prisma.kanji.create({
          data: {
            content: kanji.content,
            meaning: [...kanji.meaning],
            onyomi: kanji.onyomi,
            kunyomi: kanji.kunyomi,
            kakikata: kanji.kakikata,
            grade: kanji.grade,
          },
        }),
    ),
  )

  console.log('🌱 Seeding Kanjis completed!')

  return kanjis
}

export default kanjiSeeder
