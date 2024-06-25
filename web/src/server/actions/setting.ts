'use server'

import { revalidateTag } from 'next/cache'

import { ApiResponse } from '@/@types'
import { IThumbnail } from '@/@types/setting'
import fetchBase from '@/lib/fetch-base'

export const getThumbnails = async () => {
  const response = await fetchBase<ApiResponse<IThumbnail[]>>({
    method: 'GET',
    endpoint: '/settings',
    revalidate: 60 * 60 * 24 * 30, // 30 days
    tags: ['home-thumbnails']
  })

  return response?.data
}

export const editThumbnail = async (formData: FormData) => {
  const response = await fetchBase<ApiResponse<IThumbnail[]>>({
    method: 'POST',
    endpoint: '/settings',
    body: formData
  })

  revalidateTag('home-thumbnails')

  return response?.data
}
