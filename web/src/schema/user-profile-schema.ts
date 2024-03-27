/* eslint-disable sonarjs/no-duplicate-string */
import * as z from 'zod'

export const EditUsernameSchema = z.object({
  name: z.string().min(1, {
    message: 'Username is required'
  })
})
