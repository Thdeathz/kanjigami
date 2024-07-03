'use server'

import { revalidateTag } from 'next/cache'

import { ApiResponse } from '@/@types'
import fetchBase from '@/lib/fetch-base'

import { auth } from '../auth'

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

  revalidateTag(userId)

  return response?.data
}

export const checkoutSuccess = async (userId: string) => {
  revalidateTag(userId)

  return null
}

export const createSubscriptionManagementLink = async () => {
  const session = await auth()

  if (!session) return null

  const response = await fetchBase<
    ApiResponse<{
      url: string
    }>
  >({
    method: 'GET',
    endpoint: '/plus/manage',
    noCache: true
  })

  revalidateTag(session.user.id)

  return response?.data
}
