import { useMutation, useQuery } from '@tanstack/react-query'

import { adminGetAllUsers, getAllUsers, searchUserByUsername, updateUsername } from '@/server/actions/user'

export const useGetUsersQuery = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => getAllUsers()
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

export const useAdminGetAllUsersQuery = (page: string) =>
  useQuery({
    queryKey: ['admin-users', page],
    queryFn: async () => adminGetAllUsers(page)
  })
