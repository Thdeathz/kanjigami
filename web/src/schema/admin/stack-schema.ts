/* eslint-disable sonarjs/no-duplicate-string */
import * as z from 'zod'

export const StackDetailsSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Name is required'
    })
    .max(36, {
      message: 'Name is too long'
    }),
  description: z
    .string()
    .min(1, {
      message: 'Description is required'
    })
    .max(128, {
      message: 'Description is too long'
    })
})
