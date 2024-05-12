import { useQuery } from '@tanstack/react-query'

import { getNewestNotification } from '@/server/actions/notification'

export const useGetNotificationQuery = () =>
  useQuery({
    queryKey: ['notifications'],
    queryFn: async () => getNewestNotification()
  })
