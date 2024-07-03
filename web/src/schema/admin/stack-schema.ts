/* eslint-disable sonarjs/no-duplicate-string */
import * as z from 'zod'

export const StackDetailsSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Name is required'
    })
    .max(24, {
      message: 'Name is too long'
    }),
  description: z
    .string()
    .min(1, {
      message: 'Description is required'
    })
    .max(128, {
      message: 'Description is too long'
    }),
  topic: z.string().min(1, {
    message: 'Topic is required'
  })
})

export const NewWordSchema = z.object({
  content: z.string().min(1, {
    message: 'Word is required'
  }),
  hiragana: z.string().min(1, {
    message: 'Hiragana is required'
  }),
  romaji: z.string().min(1, {
    message: 'Romaji is required'
  }),
  meaning: z.string().min(1, {
    message: 'Meaning is required'
  })
})

export const NewExampleSchema = z.object({
  content: z.string().min(1, {
    message: 'Content is required'
  }),
  romaji: z.string().min(1, {
    message: 'Romanji is required'
  }),
  meaning: z.string().min(1, {
    message: 'Meaning is required'
  })
})
