'use server'

import { ApiResponse } from '@/@types'
import { IGameResult, IGameStackDetail } from '@/@types/game'
import axiosAuth from '@/lib/axios-auth'

export const getGameStackDetail = async (id: string) => {
  const { data: response } = await axiosAuth.get<ApiResponse<IGameStackDetail>>(`/games/${id}`)

  return response.data
}

export const startGame = async (id: string) => {
  const { data: response } = await axiosAuth.post<ApiResponse<{ sessionId: string }>>(`/games/${id}/start`)

  return response.data
}

export const getGameResult = async (id: string) => {
  const { data: response } = await axiosAuth.get<ApiResponse<IGameResult>>(`/games/${id}/log`)

  return response.data
}
