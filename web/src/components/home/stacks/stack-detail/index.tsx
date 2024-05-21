'use client'

import useIsOnline from '@/hooks/use-is-online'

import StackDetailOfflineContent from './offline-content'
import StackDetailOnlineContent from './online-content'

type Props = {
  slug: string
}

export default function StackDetail({ slug }: Props) {
  const { isOnline } = useIsOnline()

  if (!isOnline) return <StackDetailOfflineContent slug={slug} />

  return <StackDetailOnlineContent slug={slug} />
}
