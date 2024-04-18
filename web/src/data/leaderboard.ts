import { useQuery } from '@tanstack/react-query'

import { getBattleLeaderboard } from '@/server/actions/leaderboard'

export const useGetBattleLeaderboardQuery = (battleId?: string) => {
  return useQuery({
    queryKey: ['battleLeaderboard', battleId],
    queryFn: async () => getBattleLeaderboard(battleId)
  })
}
