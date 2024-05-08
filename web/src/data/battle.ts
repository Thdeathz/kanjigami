import { useMutation, useQuery } from '@tanstack/react-query'
import * as z from 'zod'

import { BattleStatus } from '@/@types/battle'
import { BattleDetailsSchema } from '@/schema/admin/battle-schema'
import {
  adminGetAllBattles,
  createNewBattle,
  getAllBattles,
  getBattleDetail,
  getUserPlayedBattles,
  getUserStats
} from '@/server/actions/battle'

export const useGetAllBattlesQuery = (status: BattleStatus, page?: string) =>
  useQuery({
    queryKey: ['battles', status, page],
    queryFn: async () => getAllBattles({ status, page }),
    placeholderData: (previousData) => previousData
  })

export const useGetBattleDetailQuery = (slug: string) =>
  useQuery({
    queryKey: ['battle', slug],
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
    mutationFn: async (data: { details: z.infer<typeof BattleDetailsSchema>; rounds: string[] }) =>
      createNewBattle(data)
  })
