import { faker } from '@faker-js/faker'
import { UserRole } from '@prisma/client'

type UserFactory = {
  email: string
  name: string
  password: string
  image: string
  role: UserRole
}
const userFactory = async () => {
  const users: UserFactory[] = []

  users.push({
    email: 'admin@gmail.com',
    password: '$2b$10$S1DyrPjcRntNMjTdhAyeXu5zfp9EB0xyvLOvy90/LQTmTd75zdfqa',
    name: 'admin',
    image: faker.image.avatar(),
    role: UserRole.ADMIN,
  })

  Array.from({ length: 50 }).forEach(() => {
    const email = faker.internet.email()
    const password = '$2b$10$S1DyrPjcRntNMjTdhAyeXu5zfp9EB0xyvLOvy90/LQTmTd75zdfqa'
    const name = faker.internet.userName()
    const image = faker.image.avatar()
    const role = UserRole.USER

    users.push({ email, password, name, image, role })
  })

  return users
}

export default userFactory
