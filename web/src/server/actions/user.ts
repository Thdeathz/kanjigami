'use server'

import { revalidateTag } from 'next/cache'

import { ApiResponse } from '@/@types'
import { IUserInfo } from '@/@types/auth'
import { IUser, IUserData, IUserProfile } from '@/@types/user'
import fetchBase from '@/lib/fetch-base'
import { auth } from '@/server/auth'

export const getAllUsers = async () => {
  const response = await fetchBase<ApiResponse<IUser[]>>({
    method: 'GET',
    endpoint: '/users'
  })

  return response?.data
}

export const getUserProfile = async (name: string) => {
  const response = await fetchBase<ApiResponse<IUserProfile>>({
    method: 'GET',
    endpoint: `/users/profile?player=${name}`
  })

  return response?.data
}

export const getCurrentUserInfo = async () => {
  const session = await auth()

  if (!session) return null

  try {
    const response = await fetchBase<ApiResponse<IUserInfo>>({
      method: 'GET',
      endpoint: '/users/me',
      tags: ['me']
    })

    return response?.data
  } catch (error) {
    return null
  }
}

export const updateUsername = async (username: string) => {
  const response = await fetchBase<ApiResponse<IUser>>({
    method: 'PUT',
    endpoint: '/users/username',
    body: JSON.stringify({ username })
  })

  revalidateTag('me')

  return response?.data
}

export const updateUserAvatar = async (formData: FormData) => {
  const response = await fetchBase<ApiResponse<IUser>>({
    method: 'PUT',
    endpoint: '/users/avatar',
    body: formData
  })

  revalidateTag('me')

  return response?.data
}

export const searchUserByUsername = async (username: string) => {
  const response = await fetchBase<ApiResponse<IUserData[]>>({
    method: 'GET',
    endpoint: `/users/search?username=${username}`
  })

  return response?.data
}
