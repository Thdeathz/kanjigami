import axios from 'axios'

const axiosBase = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Access-Control-Allow-Origin': '*'
  },
  responseType: 'json'
})

export default axiosBase
