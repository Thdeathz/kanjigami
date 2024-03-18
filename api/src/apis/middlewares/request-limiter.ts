import { rateLimit } from 'express-rate-limit'

const limitRequest = (maxRequest: number) =>
  rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: maxRequest, // limit each IP to 5 requests per windowMs
    message: {
      message: 'Unauthorize/TooManyRequests',
    },
    handler: (req, res, next, options) => {
      res.status(options.statusCode).send(options.message)
    },
  })

export default limitRequest
