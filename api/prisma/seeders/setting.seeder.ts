import settingFactory from '../factories/setting.factory'

import prisma from './prism-client'

const settingSeeder = async () => {
  console.log('🌱 Seeding Settings...')
  const settingsData = settingFactory()

  const settings = await Promise.all(
    settingsData.map(
      async (setting) =>
        await prisma.setting.create({
          data: {
            imageUrl: setting.src,
            alt: setting.alt,
          },
        }),
    ),
  )

  console.log('🌱 Seeding Settings completed!')

  return settings
}

export default settingSeeder
