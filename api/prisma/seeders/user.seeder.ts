import userFactory from '../factories/user.factory'

import prisma from './prism-client'

const userSeeder = async () => {
  console.log('🌱 Seeding Users...')
  const usersData = await userFactory()

  const users = await Promise.all(
    usersData.map(
      async (user) =>
        await prisma.user.create({
          data: {
            email: user.email,
            password: user.password,
            name: user.name,
            image: user.image,
            role: user.role,
            state: user.state,
          },
        }),
    ),
  )

  console.log('🌱 Seeding Users completed!')

  return users
}

export default userSeeder
