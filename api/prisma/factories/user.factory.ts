import { faker } from '@faker-js/faker'
import { UserRole, UserState } from '@prisma/client'

type UserFactory = {
  email: string
  name: string
  password: string
  image: string
  role: UserRole
  state: UserState
}
const userFactory = async () => {
  const users: UserFactory[] = []

  users.push({
    email: 'admin@gmail.com',
    password: '$2b$10$S1DyrPjcRntNMjTdhAyeXu5zfp9EB0xyvLOvy90/LQTmTd75zdfqa',
    name: 'admin',
    image: faker.image.avatarGitHub(),
    role: UserRole.ADMIN,
    state: UserState.NORMAL,
  })

  Array.from({ length: 50 }).forEach(() => {
    const password = '$2b$10$S1DyrPjcRntNMjTdhAyeXu5zfp9EB0xyvLOvy90/LQTmTd75zdfqa'
    const name = faker.helpers.unique(faker.person.lastName)
    const email = faker.internet.email({
      lastName: name,
    })
    const image = faker.image.avatarGitHub()
    const role = UserRole.USER
    const state = Math.random() > 0.7 ? 'PLUS' : 'NORMAL'

    users.push({ email, password, name, image, role, state })
  })

  return users
}

export default userFactory
