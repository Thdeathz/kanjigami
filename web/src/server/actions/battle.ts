'use server'

import { ApiResponse } from '@/@types'
import { BattleStatus, IBattle } from '@/@types/battle'
import axiosAuth from '@/lib/axios-auth'

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
