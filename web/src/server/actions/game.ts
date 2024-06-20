'use server'

import { revalidateTag } from 'next/cache'

import { ApiResponse } from '@/@types'
import { IGameResult, IGameStackDetail } from '@/@types/game'
import fetchBase from '@/lib/fetch-base'

export const getGameStackDetail = async (id: string) => {
  const response = await fetchBase<ApiResponse<IGameStackDetail>>({
    method: 'GET',
    endpoint: `/games/${id}`
  })

  return response?.data
}

export const startGame = async (id: string) => {
  const response = await fetchBase<ApiResponse<{ sessionId: string }>>({
    method: 'POST',
    endpoint: `/games/${id}/start`,
    noCache: true
  })

  return response?.data
}

export const getGameResult = async (id: string) => {
  const response = await fetchBase<ApiResponse<IGameResult>>({
    method: 'GET',
    endpoint: `/games/${id}/log`,
    noCache: true
  })

  revalidateTag('leaderboard')

  return response?.data
}
