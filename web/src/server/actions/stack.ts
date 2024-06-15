'use server'

import { revalidateTag } from 'next/cache'

import { ApiResponse, PaginationApiResponse } from '@/@types'
import { IKanjiDetail, ISearchStackResult, IStack, IStackDetail, IWordDetail } from '@/@types/stack'
import fetchBase from '@/lib/fetch-base'
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

  const { data: response } = await fetchBase<ApiResponse<IStack[]>>({
    method: 'GET',
    endpoint,
    tags: ['stacks']
  })

  return response
}

export const getStackDetail = async (slug: string) => {
  const { data: response } = await fetchBase<ApiResponse<IStackDetail>>({
    method: 'GET',
    endpoint: `/stacks/${slug}`,
    noCache: true
  })

  return response
}

export const getWordDetail = async (id: string) => {
  const { data: response } = await fetchBase<ApiResponse<IWordDetail>>({
    method: 'GET',
    endpoint: `/stacks/word/${id}`
  })

  return response
}

export const getKanjiDetail = async (kanji: string) => {
  const { data: response } = await fetchBase<ApiResponse<IKanjiDetail>>({
    method: 'GET',
    endpoint: `/stacks/kanji?kanji=${kanji}`
  })

  return response
}

export const adminGetAllStacks = async (pageParam?: string) => {
  const response = await fetchBase<PaginationApiResponse<IStack[]>>({
    method: 'GET',
    endpoint: makeEndpoint('/stacks', { page: pageParam }),
    tags: ['stacks']
  })

  return {
    data: response.data,
    pagination: response.pagination
  }
}

export const searchStack = async (searchValue: string) => {
  const { data: response } = await fetchBase<ApiResponse<ISearchStackResult>>({
    method: 'GET',
    endpoint: `/stacks/search?search=${searchValue}`
  })

  return response
}

export const followStack = async (id: string) => {
  const { data: response } = await fetchBase<ApiResponse<string>>({
    method: 'POST',
    endpoint: `/stacks/${id}/follow`
  })

  revalidateTag('stacks')

  return response
}
