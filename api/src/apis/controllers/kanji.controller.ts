import type { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'

import kanjiService from '@/apis/services/kanji.service'
import makeResponse from '@/apis/utils/make-response'

/**
 * @desc Get all kanjis
 * @route GET /kanjis
 * @access Public
 */
export const getAllKanjis: RequestHandler = async (req, res) => {
  const page = parseInt(<string>req.query.page) || 1
  const offset = parseInt(<string>req.query.offset) || 100

  const { kanjis, total } = await kanjiService.getAllKanjis({
    page,
    offset,
  })

  res.json(makeResponse.pagination('Get all kanjis success', StatusCodes.OK, kanjis, total, offset, page))
}

/**
 * @desc Search kanjis
 * @route GET /kanjis/search
 * @access Private
 */
export const searchKanjis: RequestHandler = async (req, res) => {
  const query = <string>req.query.q

  console.log('query', query)

  const kanjis = await kanjiService.searchKanjis(query)

  res.json(makeResponse.defaultResponse('Search kanjis success', StatusCodes.OK, kanjis))
}
