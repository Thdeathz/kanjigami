/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import axios from 'axios'

import { auth } from '@/server/auth'

const axiosAuth = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Access-Control-Allow-Origin': '*'
  },
  responseType: 'json'
})

axiosAuth.interceptors.request.use(
  async (config) => {
    const session = await auth()

    if (session) {
      config.headers.Authorization = `Bearer ${session.accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosAuth
