import { QueryKey, useQueryClient } from '@tanstack/react-query'

export default function useInvalidateTag() {
  // Get QueryClient from the context
  const queryClient = useQueryClient()

  const invalidateTag = (queryKey: QueryKey) => queryClient.invalidateQueries({ queryKey })

  const invalidateTags = (queryKeys: QueryKey[]) => {
    queryKeys.forEach((queryKey) => {
      queryClient.invalidateQueries({ queryKey })
    })
  }

  return {
    invalidateTag,
    invalidateTags
  }
}
