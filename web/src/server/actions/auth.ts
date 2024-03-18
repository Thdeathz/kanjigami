/* eslint-disable import/no-cycle */
/* eslint-disable sonarjs/no-duplicate-string */

'use server'

import { AuthError } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import * as z from 'zod'

import { ActionError, ApiResponse, IFormItemError } from '@/@types'
import { IResetPasswordRequest } from '@/@types/auth'
import axiosAuth from '@/lib/axios-auth'
import axiosBase from '@/lib/axios-base'
import decode from '@/lib/jwt-decode'
import { getErrorString } from '@/lib/utils'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { ForgotPasswordSchema, LoginSchema, RegisterSchema } from '@/schema/auth-schema'

import { signIn, signOut } from '../auth'

const errorResponse = (field: string, message: string) => ({ error: { field, message } })

export async function registerRequest(
  data: z.infer<typeof RegisterSchema>
): Promise<ActionError<IFormItemError> | null> {
  try {
    await axiosBase.post('/auth/register', data)
    return null
  } catch (error) {
    const errorMessage = getErrorString(error)

    if (errorMessage === 'Conflict/EmailExisted') {
      return errorResponse('email', 'Email already existed!')
    }

    if (errorMessage === 'Conflict/UsernameExisted') {
      return errorResponse('name', 'Username already existed!')
    }

    return errorResponse('', 'Something went wrong! Please try again later.')
  }
}

export async function loginRequest(data: z.infer<typeof LoginSchema>): Promise<ActionError<string> | null> {
  try {
    await signIn('credentials', {
      ...data,
      redirect: false
    })
    return null
  } catch (error) {
    if (error instanceof AuthError) {
      const errorMessage = getErrorString(error.cause?.err)

      if (errorMessage === 'Unauthorized/InvalidCredentials') {
        return { error: 'Invalid email or password!' }
      }

      if (errorMessage === 'Unauthorize/TooManyRequests') {
        return { error: 'Too many request! Please try again later.' }
      }
    }

    return { error: 'Something went wrong! Please try again later.' }
  }
}

export async function loginWithSocial(provider: 'google') {
  return signIn(provider, {
    callbackUrl: DEFAULT_LOGIN_REDIRECT
  })
}

export async function refresh(token: JWT) {
  try {
    const { data: responseData } = await axiosBase.post<ApiResponse<{ accessToken: string }>>('/auth/refresh', {
      token: token.refreshToken
    })

    if (!responseData.data.accessToken) {
      return {
        ...token,
        error: 'RefreshAccessTokenError'
      }
    }

    const decodedToken = decode(responseData.data.accessToken)

    return {
      accessToken: responseData.data.accessToken,
      accessTokenExpires: decodedToken.exp
    }
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}

export async function forgotPasswordRequest(
  data: z.infer<typeof ForgotPasswordSchema>
): Promise<ActionError<string> | null> {
  try {
    await axiosBase.post('/auth/password/token', { ...data })

    return null
  } catch (error) {
    return { error: getErrorString(error) }
  }
}

export async function resetPasswordRequest({
  token,
  password
}: IResetPasswordRequest): Promise<ActionError<string> | null> {
  try {
    await axiosBase.post('/auth/password/reset', { password, token })

    return null
  } catch (error) {
    const errorMessage = getErrorString(error)

    if (errorMessage === 'Unauthorized') {
      return { error: 'Invalid token!' }
    }

    return { error: 'Something went wrong! Please try again later.' }
  }
}

export async function signOutRequest() {
  axiosAuth.post('/auth/logout')

  return signOut({
    redirectTo: '/login'
  })
}
