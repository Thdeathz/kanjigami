import uniqueSlug from 'unique-slug'

import { bucketName, storage } from '@/configs/init.storage'

type UploadProps = {
  fileBuffer: Buffer
  prefix: string
  extension: string
}

const upload = async ({ fileBuffer, prefix, extension }: UploadProps) => {
  const bucket = storage.bucket(bucketName)

  const filename = prefix + uniqueSlug() + '.' + extension

  const fileRef = bucket.file(filename)

  await fileRef.save(fileBuffer)

  return fileRef.publicUrl()
}

export default {
  upload,
}
