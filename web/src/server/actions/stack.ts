'use server'

import { ApiResponse } from '@/@types'
import { IStack } from '@/@types/stack'
import axiosAuth from '@/lib/axios-auth'

type GetAllStacksProps = {
  pageParam?: number
  filterOption?: string
  searchValue?: string
}

export const getAllStacks = async ({ pageParam = 1, filterOption = 'all', searchValue }: GetAllStacksProps) => {
  const endpoint = searchValue
    ? `/stacks?filter=${filterOption}&page=${pageParam}&offset=20&search=${searchValue}`
    : `/stacks?filter=${filterOption}&page=${pageParam}&offset=20`

  const { data: response } = await axiosAuth.get<ApiResponse<IStack[]>>(endpoint)

  return response.data
}
