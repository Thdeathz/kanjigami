'use client'

import { Session } from 'next-auth'

import OfflineContent from '@/components/home/offline-content'
import OnlineContent from '@/components/home/online-content'
import useIsOnline from '@/hooks/use-is-online'

type Props = {
  session: Session | null
}

export default function HomePageContent({ session }: Props) {
  const { isOnline } = useIsOnline()

  if (!isOnline) return <OfflineContent />

  return <OnlineContent session={session} />
}
