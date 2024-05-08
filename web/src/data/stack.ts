import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'

import {
  adminGetAllStacks,
  getAllStacks,
  getKanjiDetail,
  getStackDetail,
  getWordDetail,
  searchStack
} from '@/server/actions/stack'

export const useGetAllStacksQuery = (filterOption?: string, searchValue?: string) =>
  useInfiniteQuery({
    queryKey: ['stacks', filterOption, searchValue],
    queryFn: async ({ pageParam = 1 }) => getAllStacks({ pageParam, filterOption, searchValue }),
    getNextPageParam: (lastPage, allPages) => (lastPage.length ? allPages.length + 1 : undefined),
    initialPageParam: 1
  })

export const useGetStackDetailQuery = (slug: string) =>
  useQuery({
    queryKey: ['stacks', slug],
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

export const useAdminGetAllStacksQuery = (page?: string) =>
  useQuery({ queryKey: ['admin-stacks', page], queryFn: async () => adminGetAllStacks(page) })

export const useAdminSearchStackMutation = () =>
  useMutation({
    mutationKey: ['admin-search-stacks'],
    mutationFn: async (searchValue: string) => searchStack(searchValue)
  })
