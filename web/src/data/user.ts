import { useQuery } from '@tanstack/react-query'

import { getAllUsers, getUserProfile } from '@/server/actions/user'

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
