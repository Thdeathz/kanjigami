import settingFactory from '../factories/setting.factory'

import prisma from './prism-client'

const settingSeeder = async () => {
  console.log('🌱 Seeding Settings...')
  const settingsData = settingFactory()

  for (const setting of settingsData) {
    await prisma.setting.create({
      data: {
        imageUrl: setting.src,
        alt: setting.alt,
      },
    })
  }

  console.log('🌱 Seeding Settings completed!')

  return []
}

export default settingSeeder
