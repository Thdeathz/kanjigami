import { faker } from '@faker-js/faker'

type TopicFactory = {
  name: string
}

const topicFactory = async () => {
  const topics: TopicFactory[] = []

  await Promise.all(
    Array.from({ length: 25 }).map(async () => {
      const name = faker.helpers.uniqueArray(faker.lorem.words, 1)

      topics.push({
        name: name[0],
      })
    }),
  )

  return topics
}

export default topicFactory
