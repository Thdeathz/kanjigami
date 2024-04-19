import { useInfiniteQuery } from '@tanstack/react-query'

import { getAllStacks } from '@/server/actions/stack'

export const useGetAllStacksQuery = (filterOption?: string, searchValue?: string) =>
  useInfiniteQuery({
    queryKey: ['stacks', filterOption, searchValue],
    queryFn: async ({ pageParam = 1 }) => getAllStacks({ pageParam, filterOption, searchValue }),
    getNextPageParam: (lastPage, allPages) => (lastPage.length ? allPages.length + 1 : undefined),
    initialPageParam: 1
  })
