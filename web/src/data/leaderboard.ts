import { useQuery } from '@tanstack/react-query'

import { LeaderboardType } from '@/@types/leaderboard'
import { getAllTimeLeaderboard, getBattleLeaderboard } from '@/server/actions/leaderboard'

export const useGetBattleLeaderboardQuery = (battleId?: string) => {
  return useQuery({
    queryKey: ['battleLeaderboard', battleId],
    queryFn: async () => getBattleLeaderboard(battleId)
  })
}

export const useGetAllTimeLeaderboardQuery = (type: LeaderboardType) => {
  return useQuery({
    queryKey: ['allTimeLeaderboard', type],
    queryFn: async () => getAllTimeLeaderboard(type)
  })
}
