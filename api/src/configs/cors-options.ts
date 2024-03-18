import { CorsOptions } from 'cors'
import { StatusCodes } from 'http-status-codes'

import HttpError from '@/apis/utils/http-error'
import { allowedOrigins } from '@/configs/allowed-origins'

const corsOptions: CorsOptions = {
  origin: (origin: any, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new HttpError(StatusCodes.FORBIDDEN, 'Not allowed by CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
}

export default corsOptions
