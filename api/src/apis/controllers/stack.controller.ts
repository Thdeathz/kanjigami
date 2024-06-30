import type { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'

import { JwtPayload } from '../@types/auth'
import { ICreateStackRequest, IGameStackRequest, StacksFilterOption } from '../@types/stack'
import uploadService from '../services/upload.service'

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
  const topic = req.query.topic as string

  const user = req.user as JwtPayload

  const { stacks, total } = await stackService.getAllStacks({
    page,
    offset,
    currentUserId: user?.id,
    filter,
    search: search?.trim(),
    topic,
  })

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

/**
 * @desc Search stacks by name
 * @route GET /stacks/search
 * @access Private
 */
export const searchStacks: RequestHandler = async (req, res) => {
  const search = req.query.search as string

  const stacks = await stackService.searchStack(search)

  res.json(makeResponse.defaultResponse('Search stacks success', StatusCodes.OK, stacks))
}

/**
 * @desc Create stack
 * @route POST /stacks
 * @access Private
 */
export const createStack: RequestHandler = async (req, res) => {
  const user = req.user as JwtPayload

  const images = req.files as Express.Multer.File[]
  const data = req.body as ICreateStackRequest

  const imageUrl: string[] = []
  for (const image of images) {
    const extension = image?.originalname.split('.').pop()
    if (!extension) return

    const url = await uploadService.upload({ fileBuffer: image.buffer, prefix: 'thumbnail/', extension })
    imageUrl.push(url)
  }

  const stack = await stackService.createStack(data, imageUrl, user.id)

  res.json(makeResponse.defaultResponse('Create stack success', StatusCodes.CREATED, stack))
}

/**
 * @desc Get all stacks by author
 * @route GET /stacks/author
 * @access Private
 */
export const getStackByAuthor: RequestHandler = async (req, res) => {
  const page = parseInt(<string>req.query.page) || 1
  const offset = parseInt(<string>req.query.offset) || 10

  const user = req.user as JwtPayload

  const { stacks, total } = await stackService.getAllStacks({
    page,
    offset,
    authorId: user?.id,
  })

  res.json(makeResponse.pagination('Get all stacks success', StatusCodes.OK, stacks, total, offset, page))
}

/**
 * @desc Get stack detail to edit
 * @route GET /stacks/:slug/edit
 * @access Private
 */
export const getStackDetailToEdit: RequestHandler = async (req, res) => {
  const user = req.user as JwtPayload
  const slug = req.params.slug

  const stack = await stackService.getStackDetailToEdit(slug)

  if (stack.authorId !== user.id)
    return res.json(makeResponse.defaultResponse('You are not the author of this stack', StatusCodes.FORBIDDEN))

  res.json(makeResponse.defaultResponse('Get stack detail to edit success', StatusCodes.OK, stack))
}

/**
 * @desc Edit game stack
 * @route PUT /stacks/:slug/game
 * @access Private
 */
export const editGameStack: RequestHandler = async (req, res) => {
  const slug = req.params.slug
  const data = req.body as IGameStackRequest[]

  await stackService.editGameStack(slug, data)

  res.json(makeResponse.defaultResponse('Edit game stack success', StatusCodes.OK))
}
