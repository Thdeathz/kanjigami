/* eslint-disable import/no-cycle */
/* eslint-disable sonarjs/no-duplicate-string */

'use server'

import { AuthError, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import * as z from 'zod'

import { ActionError, ApiResponse, IFormItemError } from '@/@types'
import { IResetPasswordRequest } from '@/@types/auth'
import fetchBase from '@/lib/fetch-base'
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
    await fetchBase({
      method: 'POST',
      endpoint: '/auth/register',
      body: JSON.stringify(data)
    })
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

export async function loginWithSocial(provider: 'google' | 'facebook') {
  return signIn(provider, {
    callbackUrl: DEFAULT_LOGIN_REDIRECT
  })
}

export async function refresh(token: JWT | Session) {
  try {
    const response = await fetchBase<ApiResponse<{ accessToken: string; refreshToken: string }>>({
      method: 'POST',
      endpoint: '/auth/refresh',
      body: JSON.stringify({
        token: token.refreshToken
      })
    })

    if (!response || !response.data.accessToken) {
      return {
        ...token,
        error: 'RefreshAccessTokenError'
      }
    }

    const decodedToken = decode(response.data.accessToken)

    return {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
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
    await fetchBase({
      method: 'POST',
      endpoint: '/auth/password/token',
      body: JSON.stringify({ ...data })
    })

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
    await fetchBase({
      method: 'POST',
      endpoint: '/auth/password/reset',
      body: JSON.stringify({ token, password })
    })

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
  fetchBase({
    method: 'POST',
    endpoint: '/auth/logout'
  })

  return signOut({
    redirectTo: '/login'
  })
}
