import bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'

import prisma from '@/apis/databases/init.prisma'
import HttpError from '@/apis/utils/http-error'

const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      password: true,
      name: true,
      role: true,
    },
  })
}

const getUserById = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  })

  if (!result) throw new HttpError(StatusCodes.NOT_FOUND, 'User not found')

  return result
}

const getAllUsers = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  })

  if (!result) throw new HttpError(StatusCodes.NOT_FOUND, 'Users not found')

  return result
}

const checkDuplicateEmail = async (email: string, name: string) => {
  const result = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email,
        },
        {
          name,
        },
      ],
    },
  })

  if (result) {
    if (result.email === email) throw new HttpError(StatusCodes.CONFLICT, 'Conflict/EmailExisted')

    if (result.name === name) throw new HttpError(StatusCodes.CONFLICT, 'Conflict/UsernameExisted')
  }

  return true
}

const createNewUser = async (email: string, name: string, password: string) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  return await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  })
}

const updateUserPassword = async (id: string, password: string) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      password: hashedPassword,
    },
  })
}

export default {
  getUserByEmail,
  getUserById,
  getAllUsers,
  checkDuplicateEmail,
  createNewUser,
  updateUserPassword,
}
