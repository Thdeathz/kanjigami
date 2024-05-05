import { useQuery } from '@tanstack/react-query'

import { BattleStatus } from '@/@types/battle'
import { adminGetAllBattles, getAllBattles, getBattleDetail } from '@/server/actions/battle'

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

export const useAdminGetAllBattlesQuery = (page?: string) =>
  useQuery({
    queryKey: ['admin-battles', page],
    queryFn: async () => adminGetAllBattles(page)
  })
