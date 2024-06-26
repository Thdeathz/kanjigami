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
      message: 'Max player must in 1 to 60'
    })
    .max(60, {
      message: 'Max player must in 1 to 60'
    }),
  startAt: z.string().min(1, {
    message: 'Start date is required'
  })
})
