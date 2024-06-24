import type { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'

import uploadService from '../services/upload.service'

import settingService from '@/apis/services/setting.service'
import makeResponse from '@/apis/utils/make-response'

/**
 * @desc Get all thumbnails
 * @route GET /settings
 * @access Public
 */
export const getAllThumbnails: RequestHandler = async (req, res) => {
  const thumbnails = await settingService.getAllThumbnails()

  return res
    .status(StatusCodes.OK)
    .json(makeResponse.defaultResponse('Get all thumbnails success', StatusCodes.OK, thumbnails))
}

export const editThumbnail: RequestHandler = async (req, res) => {
  const { ids, alts } = req.body
  const images = req.files as Express.Multer.File[]

  console.log(ids, alts, images)

  const imageUrls: string[] = []
  if (images) {
    for (const image of images) {
      const extension = image?.originalname.split('.').pop()
      if (!extension) return

      const imageUrl = await uploadService.upload({ fileBuffer: image.buffer, prefix: 'thumbnail/', extension })
      imageUrls.push(imageUrl)
    }
  }

  console.log(ids, imageUrls, alts)

  const thumbnails = await settingService.editThumbnail(ids, imageUrls, alts)

  return res
    .status(StatusCodes.OK)
    .json(makeResponse.defaultResponse('Edit thumbnail success', StatusCodes.OK, thumbnails))
}
