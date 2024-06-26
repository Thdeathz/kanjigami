import type { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'

import rankService from '@/apis/services/rank.service'
import settingService from '@/apis/services/setting.service'
import uploadService from '@/apis/services/upload.service'
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

/**
 * @desc Edit thumbnail
 * @route PUT /settings
 * @access Public
 */
export const editThumbnail: RequestHandler = async (req, res) => {
  const { ids, imageUrls, alts } = req.body
  const images = req.files as Express.Multer.File[]

  const newImageUrls: string[] = []
  if (images) {
    for (const image of images) {
      const extension = image?.originalname.split('.').pop()
      if (!extension) return

      const imageUrl = await uploadService.upload({ fileBuffer: image.buffer, prefix: 'thumbnail/', extension })
      newImageUrls.push(imageUrl)
    }
  }

  const thumbnails = await settingService.editThumbnail({ ids, imageUrls, alts, newImageUrls })

  return res
    .status(StatusCodes.OK)
    .json(makeResponse.defaultResponse('Edit thumbnail success', StatusCodes.OK, thumbnails))
}

/**
 * @desc Get all thumbnails
 * @route GET /settings/ranks
 * @access Private
 */
export const getAllRanks: RequestHandler = async (req, res) => {
  const thumbnails = await rankService.getAllRanks()

  return res
    .status(StatusCodes.OK)
    .json(makeResponse.defaultResponse('Get all thumbnails success', StatusCodes.OK, thumbnails))
}

/**
 * @desc Edit rank
 * @route POST /settings/ranks
 * @access Private
 */
export const editRank: RequestHandler = async (req, res) => {
  const { ids, icons, names, scores } = req.body

  const images = req.files as Express.Multer.File[]

  const newIconsUrl: string[] = []
  if (images) {
    for (const image of images) {
      const extension = image?.originalname.split('.').pop()
      if (!extension) return

      const imageUrl = await uploadService.upload({ fileBuffer: image.buffer, prefix: 'rank/', extension })
      newIconsUrl.push(imageUrl)
    }
  }

  const ranks = await rankService.editRank({ ids, names, scores, icons, newIconsUrl })

  return res.status(StatusCodes.OK).json(makeResponse.defaultResponse('Edit rank success', StatusCodes.OK, ranks))
}
