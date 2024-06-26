import { UserState } from '@prisma/client'
import bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'

import prisma from '@/apis/databases/init.prisma'
import gameLogService from '@/apis/services/game-log.service'
import rankService from '@/apis/services/rank.service'
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
      image: true,
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

const getUserProfile = async (name: string) => {
  const user = await prisma.user.findUnique({
    where: {
      name,
    },
    select: {
      id: true,
      name: true,
      image: true,
      email: true,
      score: true,
    },
  })

  if (!user) throw new HttpError(StatusCodes.NOT_FOUND, 'User not found')

  const userRank = await rankService.getUserRank(user.score)

  const stats = await gameLogService.getUserStats(user.id)

  return {
    user: {
      ...user,
      rank: userRank,
    },
    stats,
  }
}

const getCurrentUserInfo = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      image: true,
      email: true,
      score: true,
      role: true,
      state: true,
    },
  })

  if (!user) throw new HttpError(StatusCodes.NOT_FOUND, 'User not found')

  const userRank = await rankService.getUserRank(user.score)

  return {
    ...user,
    isPlus: user.state === UserState.PLUS,
    rank: userRank,
  }
}

const updateUsername = async (id: string, username: string) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      name: username,
    },
  })
}

const updateUserAvatar = async (id: string, imageUrl: string) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      image: imageUrl,
    },
  })
}

const updateUserPlan = async (id: string) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      state: UserState.PLUS,
    },
  })
}

const searchUserByUsername = async (username: string) => {
  return await prisma.user.findMany({
    where: {
      name: {
        contains: username,
      },
    },
    select: {
      id: true,
      name: true,
      image: true,
      email: true,
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
  getUserProfile,
  getCurrentUserInfo,
  updateUsername,
  updateUserAvatar,
  updateUserPlan,
  searchUserByUsername,
}
