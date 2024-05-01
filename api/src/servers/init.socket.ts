import dotenv from 'dotenv'
import { Server } from 'socket.io'

import corsOptions from '@/configs/cors-options'
import app from '@/servers/init.express'

dotenv.config()
const PORT: string | 3500 = process.env.PORT || 3500

const io = new Server(
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
  }),
  {
    cors: corsOptions,
    path: '/api/socket/',
  },
)

export default io
