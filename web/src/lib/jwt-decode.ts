import { JwtPayload, jwtDecode } from 'jwt-decode'

import { IUserInfo } from '@/@types/auth'

const decode = (token: string) => {
  const decodedData = jwtDecode(token) as JwtPayload & IUserInfo

  return {
    user: {
      id: decodedData.id,
      name: decodedData.name,
      email: decodedData.email,
      role: decodedData.role
    },
    exp: Number(decodedData.exp) * 1000
  }
}

export default decode
