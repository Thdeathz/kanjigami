'use server'

import { revalidateTag } from 'next/cache'

import { ApiResponse } from '@/@types'
import fetchBase from '@/lib/fetch-base'

export const createCheckoutSession = async (product: string, userId: string) => {
  const response = await fetchBase<
    ApiResponse<{
      url: string
    }>
  >({
    method: 'POST',
    endpoint: '/plus',
    body: JSON.stringify({ product, userId }),
    noCache: true
  })

  revalidateTag('me')

  return response?.data
}
