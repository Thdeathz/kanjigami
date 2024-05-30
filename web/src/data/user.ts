import { useMutation, useQuery } from '@tanstack/react-query'

import { getAllUsers, getUserProfile, searchUserByUsername, updateUsername } from '@/server/actions/user'

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

export const useUpdateUsernameMutation = () =>
  useMutation({
    mutationKey: ['update-username'],
    mutationFn: async (username: string) => updateUsername(username)
  })

export const useSearchUserMutation = () =>
  useMutation({
    mutationKey: ['search-user'],
    mutationFn: async (username: string) => searchUserByUsername(username)
  })
