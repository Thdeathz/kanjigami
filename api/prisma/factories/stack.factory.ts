import { faker } from '@faker-js/faker'
import { Topic, User, UserRole, Word } from '@prisma/client'

type StackFactory = {
  name: string
  description: string
  image: string
  author: User
  words: Word[]
  topic: Topic[]
  followedUsers: User[]
}

const stacksNames = [
  'Sakura',
  'Hikaru',
  'Tsubasa',
  'Ryo',
  'Haruto',
  'Yuki',
  'Kaito',
  'Rina',
  'Hina',
  'Takumi',
  'Kenta',
  'Yuna',
  'Sora',
  'Ren',
  'Aoi',
  'Koharu',
  'Sho',
  'Rei',
  'Riku',
  'Mika',
  'Ayumi',
  'Shin',
  'Kaoru',
  'Eri',
  'Natsu',
  'Kazu',
  'Saya',
  'Jun',
  'Akira',
  'Mio',
  'Nao',
  'Tomo',
  'Nana',
  'Maki',
  'Rika',
  'Mao',
  'Haru',
  'Fumi',
  'Kira',
  'Yori',
  'Miki',
  'Emi',
  'Asuka',
  'Nori',
  'Suzu',
  'Mai',
  'Shiro',
  'Aya',
  'Rena',
  'Nao',
  'Hiro',
  'Kaede',
  'Aki',
  'Kana',
  'Yui',
  'Maya',
  'Tora',
  'Yori',
  'Sayo',
  'Kou',
  'Saori',
  'Yuto',
  'Masa',
  'Yoshi',
  'Kouki',
  'Shou',
  'Kei',
  'Riko',
  'Tatsu',
  'Mako',
  'Kai',
  'Saki',
  'Hanae',
  'Kouichi',
  'Hinata',
  'Satoshi',
  'Touma',
  'Takara',
  'Ken',
  'Nami',
  'Emiko',
  'Kiyoshi',
  'Airi',
  'Kanon',
  'Arata',
  'Tomoyo',
  'Shinobu',
  'Kairi',
  'Touya',
  'Suzume',
  'Shion',
  'Kazuki',
  'Ayaka',
  'Yuma',
  'Kouya',
  'Sae',
  'Shiki',
  'Yume',
  'Akemi',
  'Haruka',
  'Akio',
  'Chihiro',
  'Daisuke',
  'Eiko',
  'Fumiko',
  'Genji',
  'Hana',
  'Isamu',
  'Junko',
  'Kenta',
  'Makoto',
  'Nobu',
  'Osamu',
  'Riku',
  'Sachiko',
  'Takashi',
  'Umi',
  'Yasuo',
  'Zen',
  'Yoko',
]

const stackFactory = async (users: User[], words: Word[], topics: Topic[]) => {
  const stacks: StackFactory[] = []

  await Promise.all(
    stacksNames.map(async (name) => {
      const description = faker.lorem.words({ min: 6, max: 10 })
      const author = users.find((user) => user.role === UserRole.ADMIN)!
      const image = faker.image.url()
      const uniqueWords = faker.helpers.uniqueArray(words, faker.number.int({ min: 80, max: 120 }))
      const uniqueTopics = faker.helpers.uniqueArray(topics, faker.number.int({ min: 1, max: 2 }))

      const followedUsers = faker.helpers.uniqueArray(users, faker.number.int({ min: 10, max: 30 }))

      stacks.push({
        name,
        description,
        image,
        author,
        words: uniqueWords,
        topic: uniqueTopics,
        followedUsers,
      })
    }),
  )

  return stacks
}

export default stackFactory
