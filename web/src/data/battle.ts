import { useQuery } from '@tanstack/react-query'

import { BattleStatus } from '@/@types/battle'
import { getAllBattles } from '@/server/actions/battle'

export const useGetAllBattlesQuery = (status: BattleStatus, page?: string) => {
  return useQuery({
    queryKey: ['battles', status, page],
    queryFn: async () => getAllBattles({ status, page }),
    placeholderData: (previousData) => previousData
  })
}
