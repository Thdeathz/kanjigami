'use server'

import { ApiResponse, PaginationApiResponse } from '@/@types'
import { IKanjiDetail, ISearchStackResult, IStack, IStackDetail, IWordDetail } from '@/@types/stack'
import axiosAuth from '@/lib/axios-auth'
import { makeEndpoint } from '@/lib/utils'

type GetAllStacksProps = {
  pageParam?: number
  filterOption?: string
  searchValue?: string
}

export const getAllStacks = async ({ pageParam = 1, filterOption = 'all', searchValue }: GetAllStacksProps) => {
  const endpoint = makeEndpoint('/stacks', {
    filter: filterOption,
    page: pageParam,
    offset: 20,
    search: searchValue
  })

  const { data: response } = await axiosAuth.get<ApiResponse<IStack[]>>(endpoint)

  return response.data
}

export const getStackDetail = async (slug: string) => {
  const { data: response } = await axiosAuth.get<ApiResponse<IStackDetail>>(`/stacks/${slug}`)

  return response.data
}

export const getWordDetail = async (id: string) => {
  const { data: response } = await axiosAuth.get<ApiResponse<IWordDetail>>(`/stacks/word/${id}`)

  return response.data
}

export const getKanjiDetail = async (kanji: string) => {
  const { data: response } = await axiosAuth.get<ApiResponse<IKanjiDetail>>(`/stacks/kanji?kanji=${kanji}`)

  return response.data
}

export const adminGetAllStacks = async (pageParam?: string) => {
  const { data: response } = await axiosAuth.get<PaginationApiResponse<IStack[]>>(
    makeEndpoint('/stacks', { page: pageParam })
  )

  return {
    data: response.data,
    pagination: response.pagination
  }
}

export const searchStack = async (searchValue: string) => {
  const { data: response } = await axiosAuth.get<ApiResponse<ISearchStackResult>>(
    `/stacks/search?search=${searchValue}`
  )

  return response.data
}
