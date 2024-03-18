import dotenv from 'dotenv'
import { Redis } from 'ioredis'

dotenv.config()

const redisClient = new Redis(process.env.REDIS_URI as string)

redisClient.on('connect', () => {
  console.log('🔗 Redis connected')
})

redisClient.on('error', (error) => {
  console.error('Redis error', error)
})

export default redisClient
