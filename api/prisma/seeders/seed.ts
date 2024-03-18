import prisma from './prismaClient'
import userSeeder from './user.seeder'

async function seed() {
  await userSeeder()
}

seed()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
