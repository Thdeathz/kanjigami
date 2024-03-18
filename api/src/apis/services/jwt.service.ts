import jwt from 'jsonwebtoken'

import redisService from './redis.service'

import { JwtPayload } from '@/apis/@types/auth'

const signNewAccessToken = async (payload: JwtPayload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        id: payload.id,
        email: payload.email,
        name: payload.name,
        role: payload.role,
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES as string,
      },
      (error, token) => {
        if (error || !token) reject(error)

        resolve(token)
      },
    )
  })
}

const signNewRefreshToken = async (userId: string) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        id: userId,
      },
      process.env.REFRESH_TOKEN_SECRET as string,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES as string,
      },
      async (error, token) => {
        if (error || !token) reject(error)

        await redisService.setex('refreshToken', userId, process.env.REFRESH_TOKEN_EXPIRES as string, token)

        resolve(token)
      },
    )
  })
}

const revokeToken = async (category: string, key: string) => {
  return redisService.del(category, key)
}

const signVerifyToken = async (id: string): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        id,
      },
      process.env.VERIFY_TOKEN_SECRET as string,
      {
        expiresIn: process.env.VERIFY_TOKEN_EXPIRES as string,
      },
      async (error, token) => {
        if (error || !token) reject(error)

        await redisService.setex('verifyToken', id, process.env.VERIFY_TOKEN_EXPIRES as string, token)

        resolve(token)
      },
    )
  })
}

export default {
  signNewAccessToken,
  signNewRefreshToken,
  revokeToken,
  signVerifyToken,
}
