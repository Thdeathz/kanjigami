'use client'

import { useUnmount } from 'usehooks-ts'

import useGlobalContext from '@/hooks/use-global-context'

type Props = {
  id: string
}

export default function GameDetail({ id }: Props) {
  const { setValue } = useGlobalContext()

  useUnmount(() => {
    setValue(false)
  })

  return <p>{id}</p>
}
