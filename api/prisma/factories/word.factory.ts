import { faker } from '@faker-js/faker'
import { Kanji } from '@prisma/client'
import Kuroshiro from 'kuroshiro'
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji'
import wanakana from 'wanakana'

type WordFactory = {
  content: string
  hiragana: string
  romaji: string
  meaning: string
  image: string
  refKanjis: Kanji[]
}

const kuroshiro = new Kuroshiro()

const wordFactory = async (kanjis: Kanji[]) => {
  const words: WordFactory[] = []
  await kuroshiro.init(new KuromojiAnalyzer())

  await Promise.all(
    Array.from({ length: 750 }, async () => {
      const kanji = faker.helpers.uniqueArray(kanjis, faker.number.int({ min: 2, max: 4 }))
      const content = kanji.map((k) => k.content).join('')
      const hiragana = await kuroshiro.convert(content, { to: 'hiragana' })
      const romaji = wanakana.toRomaji(hiragana)
      const meaning = faker.lorem.words({ min: 6, max: 10 })
      const image = faker.image.url()

      words.push({
        content,
        hiragana,
        romaji,
        meaning,
        image,
        refKanjis: kanji,
      })
    }),
  )

  return words
}

export default wordFactory
