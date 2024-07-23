/* eslint-disable sonarjs/no-duplicate-string */
import * as z from 'zod'

export const ReportSchema = z.object({
  comment: z.string().min(30, {
    message: 'Comment must be at least 30 characters long'
  })
})
