/* eslint-disable no-console */

'use client'

import React, { useEffect } from 'react'
import { io } from 'socket.io-client'

export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
  withCredentials: true,
  path: '/api/socket/',
  autoConnect: false
})

export default function ConnectSocket({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    socket.connect()

    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return children
}
