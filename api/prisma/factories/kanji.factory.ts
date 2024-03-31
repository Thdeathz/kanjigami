import dotenv from 'dotenv'

dotenv.config()

type KanjiFactory = {
  content: string
  grade: number
  kunyomi: string
  onyomi: string
  meaning: string[]
  kakikata: string
}

const getKanjis = async () => {
  const result = await fetch(`https://kanjialive-api.p.rapidapi.com/api/public/kanji/all`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY || '',
      'X-RapidAPI-Host': process.env.RAPID_API_HOST || '',
    },
  })

  const data = await result.json()

  return data
}

const kanjiFactory = async () => {
  const kanjis: KanjiFactory[] = []

  const data = await getKanjis()

  await Promise.all(
    data.slice(0, 500).map(async ({ kanji, references }: any) => {
      kanjis.push({
        content: kanji.character,
        grade: references.grade,
        kunyomi: kanji.kunyomi.hiragana,
        onyomi: kanji.onyomi.katakana,
        meaning: kanji.meaning.english.split(', '),
        kakikata: kanji.video.webm,
      })
    }),
  )

  return kanjis
}

export default kanjiFactory
