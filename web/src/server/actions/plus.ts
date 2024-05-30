'use server'

import { ApiResponse } from '@/@types'
import axiosAuth from '@/lib/axios-auth'

export const createCheckoutSession = async (product: string, userId: string) => {
  const { data: response } = await axiosAuth.post<
    ApiResponse<{
      url: string
    }>
  >('/plus', { product, userId })

  return response.data
}
