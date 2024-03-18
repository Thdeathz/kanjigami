'use server'

import { ApiResponse } from '@/@types'
import { IUser } from '@/@types/user'
import axiosAuth from '@/lib/axios-auth'

export const getAllUsers = async () => {
  const { data: response } = await axiosAuth.get<ApiResponse<IUser[]>>('/users')

  return response.data
}
