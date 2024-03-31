import topicFactory from '../factories/topic.factory'

import prisma from './prism-client'

const topicSeeder = async () => {
  console.log('🌱 Seeding Topics...')
  const topicsData = await topicFactory()

  const topics = await Promise.all(
    topicsData.map(
      async (topic) =>
        await prisma.topic.create({
          data: {
            name: topic.name,
          },
        }),
    ),
  )

  console.log('🌱 Seeding Topics completed!')

  return topics
}

export default topicSeeder
