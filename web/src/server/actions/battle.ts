'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

import { ApiResponse, PaginationApiResponse } from '@/@types'
import {
  BattleStatus,
  IBattle,
  IBattleDetail,
  IBattleInfo,
  IBattleUserStats,
  ICreateBattleRequest
} from '@/@types/battle'
import fetchBase from '@/lib/fetch-base'
import { makeEndpoint } from '@/lib/utils'

type GetAllBattlesProps = {
  status: BattleStatus
  page?: number
}

export const getAllBattles = async ({ status, page = 1 }: GetAllBattlesProps) => {
  const response = await fetchBase<ApiResponse<IBattle[]>>({
    method: 'GET',
    endpoint: `/events?status=${status}&page=${page}&offset=4`,
    tags: ['battles'],
    noCache: true
  })

  return response?.data || []
}

export const getBattleDetail = async (slug: string) => {
  const response = await fetchBase<ApiResponse<IBattleDetail>>({
    method: 'GET',
    endpoint: `/events/${slug}`,
    noCache: true
  })

  return response?.data
}

export const getUserPlayedBattles = async () => {
  const response = await fetchBase<ApiResponse<IBattleInfo[]>>({
    method: 'GET',
    endpoint: `/events/played`
  })

  return response?.data
}

export const getUserStats = async (slug?: string) => {
  const response = await fetchBase<ApiResponse<IBattleUserStats>>({
    method: 'GET',
    endpoint: makeEndpoint('/events/stats', {
      slug
    })
  })

  return response?.data
}

export const adminGetAllBattles = async (page?: string) => {
  const response = await fetchBase<PaginationApiResponse<IBattle[]>>({
    method: 'GET',
    endpoint: makeEndpoint('/events/creator', { page, offset: 10 }),
    noCache: true
  })

  return {
    data: response?.data,
    pagination: response?.pagination
  }
}

export const createNewBattle = async (data: ICreateBattleRequest) => {
  const response = await fetchBase<ApiResponse<IBattle>>({
    method: 'POST',
    endpoint: '/events',
    body: JSON.stringify({
      ...data,
      duration: Number(data.duration)
    })
  })

  revalidatePath('/admin/battles')
  revalidateTag('battles')

  return response?.data
}
