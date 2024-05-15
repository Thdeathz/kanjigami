import { useEffect, useState } from 'react'

import { IStackDetail } from '@/@types/stack'
import { Button } from '@/components/ui/button'
import useIndexedDb from '@/hooks/use-indexed-db'

type Props = {
  stack: IStackDetail
}

export default function ButtonDownLoad({ stack }: Props) {
  const [savedStack, setSavedStack] = useState<IStackDetail>()
  const { put, get } = useIndexedDb<IStackDetail>('local-data', 'stacks')

  const onDownload = async () => {
    await put(stack.slug, stack)
  }

  useEffect(() => {
    const loadLocalStack = async () => {
      const localStack = await get(stack.slug)
      setSavedStack(localStack)
    }

    loadLocalStack()

    return () => {
      setSavedStack(undefined)
    }
  }, [])

  return (
    <Button onClick={onDownload} disabled={!!savedStack}>
      Download
    </Button>
  )
}
