import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import { getAllStacks, getKanjiDetail, getStackDetail, getWordDetail } from '@/server/actions/stack'

export const useGetAllStacksQuery = (filterOption?: string, searchValue?: string) =>
  useInfiniteQuery({
    queryKey: ['stacks', filterOption, searchValue],
    queryFn: async ({ pageParam = 1 }) => getAllStacks({ pageParam, filterOption, searchValue }),
    getNextPageParam: (lastPage, allPages) => (lastPage.length ? allPages.length + 1 : undefined),
    initialPageParam: 1
  })

export const useGetStackDetailQuery = (slug: string) =>
  useQuery({
    queryKey: ['stack', slug],
    queryFn: async () => getStackDetail(slug)
  })

export const useGetWordDetailQuery = (id: string) =>
  useQuery({
    queryKey: ['word', id],
    queryFn: async () => getWordDetail(id)
  })

export const useGetKanjiDetailQuery = (kanji: string) =>
  useQuery({
    queryKey: ['kanji', kanji],
    queryFn: async () => getKanjiDetail(kanji)
  })
