'use client'

import { INotification } from '@/@types/notification'
import useIsOnline from '@/hooks/use-is-online'

import StackDetailOfflineContent from './offline-content'
import StackDetailOnlineContent from './online-content'

type Props = {
  slug: string
  notifications?: INotification[]
}

export default function StackDetail({ slug, notifications }: Props) {
  const { isOnline } = useIsOnline()

  if (!isOnline) return <StackDetailOfflineContent slug={slug} />

  return <StackDetailOnlineContent slug={slug} notifications={notifications} />
}
