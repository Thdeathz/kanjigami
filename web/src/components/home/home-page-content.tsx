'use client'

import { Session } from 'next-auth'
import { useEffect, useState } from 'react'

import OfflineContent from '@/components/home/offline-content'
import OnlineContent from '@/components/home/online-content'

type Props = {
  session: Session | null
}

export default function HomePageContent({ session }: Props) {
  const [isOnline, setIsOnline] = useState<boolean>(true)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)

    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!isOnline) return <OfflineContent />

  return <OnlineContent session={session} />
}
