import { useMutation } from '@tanstack/react-query'

import { createCheckoutSession } from '@/server/actions/plus'

export const useCreateCheckoutSessionMutation = () =>
  useMutation({
    mutationKey: ['create-checkout-session'],
    mutationFn: async ({ product, userId }: { product: string; userId: string }) =>
      createCheckoutSession(product, userId)
  })
