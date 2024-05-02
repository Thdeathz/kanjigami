import { useMutation, useQuery } from '@tanstack/react-query'

import { getGameResult, getGameStackDetail, startGame } from '@/server/actions/game'

export const useGetGameStackQuery = (id: string) =>
  useQuery({
    queryKey: ['game', id],
    queryFn: async () => getGameStackDetail(id)
  })

export const useStartGameMutation = () =>
  useMutation({
    mutationKey: ['start-game'],
    mutationFn: async (id: string) => startGame(id)
  })

export const useGetGameResultQuery = (id: string) =>
  useQuery({
    queryKey: ['stacks', 'game-result', id],
    queryFn: async () => getGameResult(id)
  })
