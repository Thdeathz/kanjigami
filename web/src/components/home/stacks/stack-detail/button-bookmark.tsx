'use client'

import { BsBookmarks, BsBookmarksFill } from 'react-icons/bs'

import { Button } from '@/components/ui/button'

type Props = {
  isFollowed?: boolean
}

export default function ButtonBookmark({ isFollowed = false }: Props) {
  return <Button shape="circle">{isFollowed ? <BsBookmarksFill /> : <BsBookmarks />}</Button>
}
