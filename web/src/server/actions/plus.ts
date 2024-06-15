'use server'

import { revalidateTag } from 'next/cache'

import { ApiResponse } from '@/@types'
import fetchBase from '@/lib/fetch-base'

export const createCheckoutSession = async (product: string, userId: string) => {
  const { data: response } = await fetchBase<
    ApiResponse<{
      url: string
    }>
  >({
    method: 'POST',
    endpoint: '/plus',
    body: JSON.stringify({ product, userId }),
    tags: ['checkout-session']
  })

  revalidateTag('me')
  revalidateTag('checkout-session')

  return response
}
