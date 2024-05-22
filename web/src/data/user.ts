import { useMutation, useQuery } from '@tanstack/react-query'

import { getAllUsers, getCurrentUserInfo, getUserProfile, updateUsername } from '@/server/actions/user'

export const useGetUsersQuery = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => getAllUsers()
  })
}

export const useGetUserProfileQuery = (name: string) => {
  return useQuery({
    queryKey: ['user-profile', name],
    queryFn: async () => getUserProfile(name)
  })
}

export const useGetCurrentUserInfoQuery = () =>
  useQuery({
    queryKey: ['current-user-info'],
    queryFn: async () => getCurrentUserInfo()
  })

export const useUpdateUsernameMutation = () =>
  useMutation({
    mutationKey: ['update-username'],
    mutationFn: async (username: string) => updateUsername(username)
  })
