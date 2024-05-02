import { QueryKey, useQueryClient } from '@tanstack/react-query'

export default function useInvalidateTag() {
  // Get QueryClient from the context
  const queryClient = useQueryClient()

  const invalidateTag = (queryKey: QueryKey) => queryClient.invalidateQueries({ queryKey })

  return {
    invalidateTag
  }
}
