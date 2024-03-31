import { faker } from '@faker-js/faker'

type TopicFactory = {
  name: string
}

const topicFactory = async () => {
  const topics: TopicFactory[] = []

  await Promise.all(
    Array.from({ length: 25 }).map(async () => {
      const name = faker.word.noun()

      topics.push({
        name,
      })
    }),
  )

  return topics
}

export default topicFactory
