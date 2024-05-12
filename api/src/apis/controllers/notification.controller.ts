import type { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'

import notificationService from '@/apis/services/notification.service'
import makeResponse from '@/apis/utils/make-response'

/**
 * @desc Get newest notification
 * @route GET /notifications
 * @access Public
 */
export const getNewestNotification: RequestHandler = async (req, res) => {
  const newestLink = await notificationService.getNewestNotification()

  return res
    .status(StatusCodes.OK)
    .json(makeResponse.defaultResponse('Get newest notification success', StatusCodes.OK, newestLink))
}
