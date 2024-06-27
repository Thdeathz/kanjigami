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
  topic?: string
}

export const getAllStacks = async ({ pageParam = 1, filterOption = 'all', searchValue, topic }: GetAllStacksProps) => {
  const endpoint = makeEndpoint('/stacks', {
    filter: filterOption,
    page: pageParam,
    offset: 20,
    search: searchValue,
    topic
  })

  const response = await fetchBase<ApiResponse<IStack[]>>({
    method: 'GET',
    endpoint,
    noCache: true
  })

  return response?.data
}

export const getStackDetail = async (slug: string) => {
  const response = await fetchBase<ApiResponse<IStackDetail>>({
    method: 'GET',
    endpoint: `/stacks/${slug}`,
    noCache: true
  })

  return response?.data
}

export const getWordDetail = async (id: string) => {
  const response = await fetchBase<ApiResponse<IWordDetail>>({
    method: 'GET',
    endpoint: `/stacks/word/${id}`
  })

  return response?.data
}

export const getKanjiDetail = async (kanji: string) => {
  const response = await fetchBase<ApiResponse<IKanjiDetail>>({
    method: 'GET',
    endpoint: `/stacks/kanji?kanji=${kanji}`
  })

  return response?.data
}

export const adminGetAllStacks = async (pageParam?: string) => {
  const response = await fetchBase<PaginationApiResponse<IStack[]>>({
    method: 'GET',
    endpoint: makeEndpoint('/stacks', { page: pageParam }),
    tags: ['stacks']
  })

  return {
    data: response?.data,
    pagination: response?.pagination
  }
}

export const searchStack = async (searchValue: string) => {
  const response = await fetchBase<ApiResponse<ISearchStackResult>>({
    method: 'GET',
    endpoint: `/stacks/search?search=${searchValue}`
  })

  return response?.data
}

export const followStack = async (id: string) => {
  const response = await fetchBase<ApiResponse<string>>({
    method: 'POST',
    endpoint: `/stacks/${id}/follow`
  })

  revalidateTag('stacks')

  return response?.data
}
