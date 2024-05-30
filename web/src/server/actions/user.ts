'use server'

import { ApiResponse } from '@/@types'
import { IUserInfo } from '@/@types/auth'
import { IUser, IUserData, IUserProfile } from '@/@types/user'
import axiosAuth from '@/lib/axios-auth'
import { auth } from '@/server/auth'

export const getAllUsers = async () => {
  const { data: response } = await axiosAuth.get<ApiResponse<IUser[]>>('/users')

  return response.data
}

export const getUserProfile = async (name: string) => {
  const { data: response } = await axiosAuth.get<ApiResponse<IUserProfile>>(`/users/profile?player=${name}`)

  return response.data
}

export const getCurrentUserInfo = async () => {
  const session = await auth()

  if (!session) return null

  try {
    const { data: response } = await axiosAuth.get<ApiResponse<IUserInfo>>(`/users/me`)

    return response.data
  } catch (error) {
    return null
  }
}

export const updateUsername = async (username: string) => {
  const { data: response } = await axiosAuth.put<ApiResponse<IUser>>(`/users/username`, { username })

  return response.data
}

export const updateUserAvatar = async (formData: FormData) => {
  const { data: response } = await axiosAuth.put<ApiResponse<IUser>>(`/users/avatar`, formData)

  return response.data
}

export const searchUserByUsername = async (username: string) => {
  const { data: response } = await axiosAuth.get<ApiResponse<IUserData[]>>(`/users/search?username=${username}`)

  return response.data
}
