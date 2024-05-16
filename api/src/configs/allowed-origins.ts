import dotenv from 'dotenv'

dotenv.config()

export const allowedOrigins: string[] = [
  process.env.WEB_URL ?? 'http://localhost:3000',
  'http://project.localhost:3000',
]
