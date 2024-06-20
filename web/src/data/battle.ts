import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'

import { BattleStatus, ICreateBattleRequest } from '@/@types/battle'
import {
  adminGetAllBattles,
  createNewBattle,
  getAllBattles,
  getBattleDetail,
  getUserPlayedBattles,
  getUserStats
} from '@/server/actions/battle'

export const useGetAllBattlesQuery = (status: BattleStatus) =>
  useInfiniteQuery({
    queryKey: ['stacks', status],
    queryFn: async ({ pageParam = 1 }) => getAllBattles({ status, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => (lastPage?.length ? allPages.length + 1 : undefined),
    initialPageParam: 1
  })

export const useGetBattleDetailQuery = (slug: string) =>
  useQuery({
    queryKey: ['battles', slug],
    queryFn: async () => getBattleDetail(slug)
  })

export const useGetUserPlayedBattlesQuery = () =>
  useQuery({
    queryKey: ['battles'],
    queryFn: async () => getUserPlayedBattles()
  })

export const useGetUserStatsQuery = (slug?: string) =>
  useQuery({
    queryKey: ['battles', slug],
    queryFn: async () => getUserStats(slug)
  })

export const useAdminGetAllBattlesQuery = (page?: string) =>
  useQuery({
    queryKey: ['admin-battles', page],
    queryFn: async () => adminGetAllBattles(page)
  })

export const useCreateNewBattleMutation = () =>
  useMutation({
    mutationKey: ['create-battle'],
    mutationFn: async (data: ICreateBattleRequest) => createNewBattle(data)
  })
