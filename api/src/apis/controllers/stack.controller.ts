import type { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'

import { JwtPayload } from '../@types/auth'
import { StacksFilterOption } from '../@types/stack'

import kanjiService from '@/apis/services/kanji.service'
import stackService from '@/apis/services/stack.service'
import wordService from '@/apis/services/word.service'
import makeResponse from '@/apis/utils/make-response'

/**
 * @desc Get all stacks
 * @route GET /stacks
 * @access Public
 */
export const getAllStacks: RequestHandler = async (req, res) => {
  const page = parseInt(<string>req.query.page) || 1
  const offset = parseInt(<string>req.query.offset) || 10
  const filter = req.query.filter as StacksFilterOption
  const search = req.query.search as string

  const user = req.user as JwtPayload

  const { stacks, total } = await stackService.getAllStacks(
    {
      page,
      offset,
    },
    user?.id,
    filter,
    search?.trim(),
  )

  res.json(makeResponse.pagination('Get all stacks success', StatusCodes.OK, stacks, total, offset, page))
}

/**
 * @desc Get stack by slug
 * @route GET /stacks/:slug
 * @access Private
 */
export const getStackBySlug: RequestHandler = async (req, res) => {
  const slug = req.params.slug
  const user = req.user as JwtPayload

  const stack = await stackService.getStackBySlug(slug, user?.id)

  res.json(makeResponse.defaultResponse('Get stack by slug success', StatusCodes.OK, stack))
}

/**
 * @desc Follow stack
 * @route POST /stacks/:id/follow
 * @access Private
 */
export const followStack: RequestHandler = async (req, res) => {
  const id = req.params.id
  const user = req.user as JwtPayload

  const returnMsg = await stackService.followStack(id, user.id)

  res.json(makeResponse.defaultResponse(`${returnMsg} stack success`, StatusCodes.OK))
}

/**
 * @desc Get word detail
 * @route GET /stacks/word/:id
 * @access Public
 */
export const getWordDetail: RequestHandler = async (req, res) => {
  const id = req.params.id

  const wordDetail = await wordService.getWordDetail(id)

  res.json(makeResponse.defaultResponse('Get word detail success', StatusCodes.OK, wordDetail))
}

/**
 * @desc Get kanji detail
 * @route GET /stacks/kanji?kanji=
 * @access Public
 */
export const getKanjiDetail: RequestHandler = async (req, res) => {
  const kanji = req.query.kanji as string

  if (!kanji) res.json(makeResponse.defaultResponse('Get kanji detail failed', StatusCodes.BAD_REQUEST))

  const kanjiDetail = await kanjiService.getKanjiDetail(kanji)

  res.json(makeResponse.defaultResponse('Get kanji detail success', StatusCodes.OK, kanjiDetail))
}
