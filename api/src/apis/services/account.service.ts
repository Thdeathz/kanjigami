import { ICreateAccountRequest } from '@/apis/@types/auth'
import prisma from '@/apis/databases/init.prisma'
import HttpError from '@/apis/utils/http-error'

const getByProviderAccount = async (provider: string, providerAccountId: string) => {
  return await prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider,
        providerAccountId,
      },
    },
    select: {
      id: true,
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      },
    },
  })
}

const createNewAccount = async (provider: string, providerAccountId: string, user: ICreateAccountRequest) => {
  const newUser = await prisma.account.create({
    data: {
      type: 'oauth',
      provider,
      providerAccountId,
      user: {
        create: {
          email: user.email,
          name: user.name,
        },
      },
    },
    select: {
      id: true,
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      },
    },
  })

  if (!newUser) {
    throw new HttpError(500, 'Error creating new user')
  }

  return newUser
}

export default {
  getByProviderAccount,
  createNewAccount,
}
