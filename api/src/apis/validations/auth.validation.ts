import Joi from 'joi'

import { ILoginRequest, IRegisterRequest, IResetPasswordRequest } from '@/apis/@types/auth'

export const loginSchema = Joi.object<ILoginRequest>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

export const loginByGoogleSchema = Joi.object<{ token: string }>({
  token: Joi.string().required(),
})

export const registerSchema = Joi.object<IRegisterRequest>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
})

export const getResetPasswordTokenSchema = Joi.object<{ email: string }>({
  email: Joi.string().email().required(),
})

export const resetPasswordSchema = Joi.object<IResetPasswordRequest>({
  password: Joi.string().required(),
  token: Joi.string().required(),
})
