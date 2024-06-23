'use server'

import { ApiResponse } from '@/@types'
import { IKanji } from '@/@types/kanji'
import fetchBase from '@/lib/fetch-base'
import { makeEndpoint } from '@/lib/utils'

type GetAllKanjisProps = {
  pageParam?: number
  offset?: number
}

export const getAllKanjis = async ({ pageParam = 1, offset = 100 }: GetAllKanjisProps) => {
  const endpoint = makeEndpoint('/kanjis', {
    page: pageParam,
    offset
  })

  const response = await fetchBase<ApiResponse<IKanji[]>>({
    method: 'GET',
    endpoint
  })

  return response?.data
}

export const searchKanjis = async (query: string) => {
  const endpoint = makeEndpoint('/kanjis/search', {
    q: query
  })

  const response = await fetchBase<ApiResponse<IKanji[]>>({
    method: 'GET',
    endpoint
  })

  return response?.data
}
