import { useMutation } from '@tanstack/react-query'
import * as z from 'zod'

import { IResetPasswordRequest } from '@/@types/auth'
import { ForgotPasswordSchema, LoginSchema, RegisterSchema } from '@/schema/auth-schema'
import {
  forgotPasswordRequest,
  loginRequest,
  loginWithSocial,
  registerRequest,
  resetPasswordRequest,
  signOutRequest
} from '@/server/actions/auth'

export const useRegisterMutation = () => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: async (data: z.infer<typeof RegisterSchema>) => registerRequest(data)
  })
}

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (data: z.infer<typeof LoginSchema>) => loginRequest(data)
  })
}

export const useLoginWithSocialMutation = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (provider: 'google') => loginWithSocial(provider)
  })
}

export const useLogoutMutation = () => {
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => signOutRequest()
  })
}

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationKey: ['forgot-password'],
    mutationFn: async (data: z.infer<typeof ForgotPasswordSchema>) => forgotPasswordRequest(data)
  })
}

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationKey: ['reset-password'],
    mutationFn: async (data: IResetPasswordRequest) => resetPasswordRequest(data)
  })
}
