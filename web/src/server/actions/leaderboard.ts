'use server'

import { ApiResponse } from '@/@types'
import { ITopUser, LeaderboardType } from '@/@types/leaderboard'
import fetchBase from '@/lib/fetch-base'
import { makeEndpoint } from '@/lib/utils'

export const getBattleLeaderboard = async (battleId?: string) => {
  const endpoint = battleId ? `/leaderboards/event/${battleId}` : '/leaderboards/event'

  const response = await fetchBase<ApiResponse<ITopUser[]>>({
    method: 'GET',
    endpoint
  })

  return response?.data
}

export const getAllTimeLeaderboard = async (type: LeaderboardType, slug?: string, offset?: number) => {
  let endpoint = type === 'all-time' ? '/leaderboards' : `/leaderboards/${type}`

  endpoint = makeEndpoint(endpoint, { slug, offset })

  const response = await fetchBase<ApiResponse<ITopUser[]>>({
    method: 'GET',
    endpoint,
    tags: ['leaderboard', slug ?? 'all-time']
  })

  return response?.data
}
