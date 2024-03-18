import bcrypt from 'bcrypt'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { ILoginRequest, IRegisterRequest } from '@/apis/@types/auth'
import accountService from '@/apis/services/account.service'
import userService from '@/apis/services/user.service'
import HttpError from '@/apis/utils/http-error'
import oAuthClient from '@/configs/init.google-auth'

const login = async ({ email, password }: ILoginRequest) => {
  const foundedUser = await userService.getUserByEmail(email)

  if (!foundedUser) throw new HttpError(StatusCodes.UNAUTHORIZED, 'Unauthorized/InvalidCredentials')

  const comparePassword = await bcrypt.compare(password, foundedUser.password ?? '')

  if (!comparePassword) throw new HttpError(StatusCodes.UNAUTHORIZED, 'Unauthorized/InvalidCredentials')

  return {
    id: foundedUser.id,
    name: foundedUser.name,
    email: foundedUser.email,
    role: foundedUser.role,
  }
}

const loginByGoogle = async (token: string) => {
  try {
    const ticket = await oAuthClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()

    if (!ticket || !payload) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
    }

    const foundedUser = await accountService.getByProviderAccount('google', payload.sub)

    if (!foundedUser) {
      const newUser = await accountService.createNewAccount('google', payload.sub, {
        email: payload.email ?? '',
        name: payload.name ?? '',
      })

      return newUser.user
    }

    return foundedUser.user
  } catch (error) {
    throw new HttpError(StatusCodes.BAD_REQUEST, (error as any).message)
  }
}

const register = async ({ email, password, name }: IRegisterRequest) => {
  await userService.checkDuplicateEmail(email, name)

  const user = await userService.createNewUser(email, name, password)

  return user
}

export default {
  login,
  loginByGoogle,
  register,
}
