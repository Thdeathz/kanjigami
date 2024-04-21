'use server'

import { ApiResponse } from '@/@types'
import { ITopUser, LeaderboardType } from '@/@types/leaderboard'
import axiosBase from '@/lib/axios-base'

export const getBattleLeaderboard = async (battleId?: string) => {
  const endpoint = battleId ? `/leaderboards/event/${battleId}` : '/leaderboards/event'

  const { data: response } = await axiosBase.get<ApiResponse<ITopUser[]>>(endpoint)

  return response.data
}

export const getAllTimeLeaderboard = async (type: LeaderboardType) => {
  const endpoint = type === 'all-time' ? '/leaderboards' : `/leaderboards/${type}`

  const { data: response } = await axiosBase.get<ApiResponse<ITopUser[]>>(endpoint)

  return response.data
}
