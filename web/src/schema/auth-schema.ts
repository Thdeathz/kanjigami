/* eslint-disable sonarjs/no-duplicate-string */
import * as z from 'zod'

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required'
    })
    .email({
      message: 'Invalid email address'
    }),
  password: z.string({
    required_error: 'Password is required'
  })
})

export const RegisterSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required'
    })
    .email({
      message: 'Invalid email address'
    }),
  password: z
    .string({
      required_error: 'Password is required'
    })
    .min(6, {
      message: 'Minimum 6 characters required'
    }),
  name: z.string().min(1, {
    message: 'Nickname is required'
  })
})

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: 'Email is required'
  })
})

export const ResetPasswordSchema = z.object({
  password: z.string().min(6, {
    message: 'Minimum 6 characters required'
  })
})
