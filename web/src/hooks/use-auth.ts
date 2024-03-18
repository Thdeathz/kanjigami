'use client'

import { redirect } from 'next/navigation'

import { auth } from '@/server/auth'

export default async function useAuth() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  return session
}
