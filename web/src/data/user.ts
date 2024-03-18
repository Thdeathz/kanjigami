import { useQuery } from '@tanstack/react-query'

import { getAllUsers } from '@/server/actions/user'

export const useGetUsersQuery = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => getAllUsers()
  })
}
