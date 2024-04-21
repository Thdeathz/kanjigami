'use server'

import { ApiResponse } from '@/@types'
import { IUser, IUserProfile } from '@/@types/user'
import axiosAuth from '@/lib/axios-auth'

export const getAllUsers = async () => {
  const { data: response } = await axiosAuth.get<ApiResponse<IUser[]>>('/users')

  return response.data
}

export const getUserProfile = async (name: string) => {
  const { data: response } = await axiosAuth.get<ApiResponse<IUserProfile>>(`/users/profile?player=${name}`)

  return response.data
}
