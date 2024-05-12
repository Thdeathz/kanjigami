'use server'

import { ApiResponse } from '@/@types'
import { INotification } from '@/@types/notification'
import axiosBase from '@/lib/axios-base'

export const getNewestNotification = async () => {
  const { data: response } = await axiosBase.get<ApiResponse<INotification[]>>('/notifications')

  return response.data
}
