import { jwtDecode } from 'jwt-decode'

import { IJwtPayload } from '@/@types/auth'

const decode = (token: string) => {
  const decodedData = jwtDecode(token) as IJwtPayload

  return {
    user: {
      id: decodedData.id,
      role: decodedData.role
    },
    exp: Number(decodedData.exp) * 1000
  }
}

export default decode
