import redisClient from '@/apis/databases/init.redis'
import { convertExToSeconds } from '@/apis/utils/datetime'

const setex = async <T>(category: string, key: string, ex: string, value: T) => {
  return await redisClient.setex(`${category}:${key}`, convertExToSeconds(ex), JSON.stringify(value))
}

const get = async <T>(category: string, key: string): Promise<T | null> => {
  const result = await redisClient.get(`${category}:${key}`)

  if (!result) return null

  return JSON.parse(result)
}

const del = async (category: string, key: string) => {
  return await redisClient.del(`${category}:${key}`)
}

const hSet = async <T>(key: string, field: object, value: T) => {
  await redisClient.hset(key, JSON.stringify(field), JSON.stringify(value))
  await redisClient.expire(key, convertExToSeconds('1d'))

  return true
}

const hGet = async <T>(key: string, field: object): Promise<T | null> => {
  const result = await redisClient.hget(key, JSON.stringify(field))

  if (!result) return null

  return JSON.parse(result)
}

const deleteByKey = async (key: string, field: object) => {
  return await redisClient.hdel(key, JSON.stringify(field))
}

export default {
  setex,
  get,
  del,
  hSet,
  hGet,
  deleteByKey,
}
