import { useInfiniteQuery, useMutation } from '@tanstack/react-query'

import { getAllKanjis, searchKanjis } from '@/server/actions/kanji'

export const useGetAllKanjis = () =>
  useInfiniteQuery({
    queryKey: ['stacks'],
    queryFn: async ({ pageParam = 1 }) => getAllKanjis({ pageParam }),
    getNextPageParam: (lastPage, allPages) => (lastPage?.length ? allPages.length + 1 : undefined),
    initialPageParam: 1
  })

export const useSearchKanjisMutation = () =>
  useMutation({ mutationKey: ['search-kanjis'], mutationFn: async (query: string) => searchKanjis(query) })
