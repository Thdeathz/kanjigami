'use client'

import { useContext } from 'react'

import { GlobalContext } from '@/contexts/global-context'

export default function useGlobalContext() {
  return useContext(GlobalContext)
}
