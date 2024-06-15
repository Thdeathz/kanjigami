import { Storage } from '@google-cloud/storage'

export const bucketName = process.env.GOOGLE_STORAGE_BUCKET || ''

export const storage = new Storage({
  projectId: process.env.GOOGLE_PROJECT_ID,
  keyFilename: process.env.GOOGLE_SERVICE_ACCOUNT_PATH,
})
