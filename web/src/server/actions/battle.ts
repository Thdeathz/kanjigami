'use server'

import { ApiResponse, PaginationApiResponse } from '@/@types'
import {
  BattleStatus,
  IBattle,
  IBattleDetail,
  IBattleInfo,
  IBattleUserStats,
  ICreateBattleRequest
} from '@/@types/battle'
import axiosAuth from '@/lib/axios-auth'
import { makeEndpoint } from '@/lib/utils'

type GetAllBattlesProps = {
  status: BattleStatus
  page?: string
}

export const getAllBattles = async ({ status, page = '1' }: GetAllBattlesProps) => {
  const { data: response } = await axiosAuth.get<ApiResponse<IBattle[]>>(
    `/events?status=${status}&page=${page}&offset=4`
  )

  return response.data
}

export const getBattleDetail = async (slug: string) => {
  const { data: response } = await axiosAuth.get<ApiResponse<IBattleDetail>>(`/events/${slug}`)

  return response.data
}

export const getUserPlayedBattles = async () => {
  const { data: response } = await axiosAuth.get<ApiResponse<IBattleInfo[]>>(`/events/played`)

  return response.data
}

export const getUserStats = async (slug?: string) => {
  const { data: response } = await axiosAuth.get<ApiResponse<IBattleUserStats>>(
    makeEndpoint('/events/stats', {
      slug
    })
  )

  return response.data
}

export const adminGetAllBattles = async (page?: string) => {
  const { data: response } = await axiosAuth.get<PaginationApiResponse<IBattle[]>>(
    makeEndpoint('/events', { page, offset: 10 })
  )

  return {
    data: response.data,
    pagination: response.pagination
  }
}

export const createNewBattle = async (data: ICreateBattleRequest) => {
  const { data: response } = await axiosAuth.post<ApiResponse<IBattle>>(`/events`, data)

  return response.data
}
