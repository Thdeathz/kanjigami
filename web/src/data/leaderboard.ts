import { useQuery } from '@tanstack/react-query'

import { LeaderboardType } from '@/@types/leaderboard'
import { getAllTimeLeaderboard, getBattleLeaderboard } from '@/server/actions/leaderboard'

export const useGetBattleLeaderboardQuery = (battleId?: string) => {
  return useQuery({
    queryKey: ['battleLeaderboard', battleId],
    queryFn: async () => getBattleLeaderboard(battleId)
  })
}

export const useGetAllTimeLeaderboardQuery = (type: LeaderboardType, slug?: string, offset?: number) => {
  return useQuery({
    queryKey: ['allTimeLeaderboard', type, slug, offset],
    queryFn: async () => getAllTimeLeaderboard(type, slug, offset)
  })
}
