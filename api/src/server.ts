import 'express-async-errors'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import errorHandler from '@/apis/middlewares/error-handler'
import APIs_V1 from '@/apis/routes/v1'
import socketEvent from '@/apis/sockets/socket'
import corsOptions from '@/configs/cors-options'
import passport from '@/configs/init.passport'
import app from '@/servers/init.express'
import transporter from '@/servers/init.mailer'
import io from '@/servers/init.socket'

dotenv.config()

console.log(process.env.NODE_ENV)

/* MIDDLEWARE */
app.set('trust proxy', 'loopback')
app.use(morgan('dev'))
app.use(helmet())
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())

/* ROUTES */
app.use('/api/v1', APIs_V1)

/* ERROR HANDLING */
app.use(errorHandler)

io.on('connection', socketEvent)

io.on('error', (error) => {
  console.log(`❌ Socket error: ${error}`)
})

// nodemailer transporter
transporter.verify((error) => {
  if (error) {
    console.log(error)
  } else {
    console.log('💌 Server ready to send emails')
  }
})
