'use server'

import { ApiResponse } from '@/@types'
import { INotification } from '@/@types/notification'
import fetchBase from '@/lib/fetch-base'

export const getNewestNotification = async () => {
  const { data: response } = await fetchBase<ApiResponse<INotification[]>>({
    method: 'GET',
    endpoint: '/notifications'
  })

  return response
}
