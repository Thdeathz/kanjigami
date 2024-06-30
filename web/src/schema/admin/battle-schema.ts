/* eslint-disable sonarjs/no-duplicate-string */
import * as z from 'zod'

export const BattleDetailsSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: 'Title is required'
    })
    .max(36, {
      message: 'Title is too long'
    }),
  description: z
    .string()
    .min(1, {
      message: 'Description is required'
    })
    .max(128, {
      message: 'Description is too long'
    }),
  duration: z
    .string()
    .min(1, {
      message: 'Duration must in 1 to 60'
    })
    .max(60, {
      message: 'Duration must in 1 to 60'
    }),
  startAt: z
    .string()
    .min(1, {
      message: 'Start date is required'
    })
    .refine(
      (value) => {
        return new Date(value).getTime() - Date.now() > 1000 * 60 // 1 minute
      },
      {
        message: 'Start date must be at least 1 minute from now'
      }
    )
})
