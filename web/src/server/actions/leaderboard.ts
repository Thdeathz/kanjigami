'use server'

import { ApiResponse } from '@/@types'
import { ITopUser } from '@/@types/leaderboard'
import axiosBase from '@/lib/axios-base'

export const getBattleLeaderboard = async (battleId?: string) => {
  const endpoint = battleId ? `/leaderboards/event/${battleId}` : '/leaderboards/event'

  const { data: response } = await axiosBase.get<ApiResponse<ITopUser[]>>(endpoint)

  return response.data
}
