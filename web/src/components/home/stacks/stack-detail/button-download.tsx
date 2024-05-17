import { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'

import { IStackDetail } from '@/@types/stack'
import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import useIndexedDb from '@/hooks/use-indexed-db'

type Props = {
  stack: IStackDetail
}

export default function ButtonDownLoad({ stack }: Props) {
  const [savedStack, setSavedStack] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()
  const { put, get } = useIndexedDb<IStackDetail>('local-data', 'stacks')

  const onDownload = () => {
    startTransition(async () => {
      const result = await put(stack.slug, stack)

      if (result) {
        toast.success('Saved stack successfully')
        setSavedStack(true)
      }
    })
  }

  useEffect(() => {
    const loadLocalStack = async () => {
      const localStack = await get(stack.slug)
      if (localStack) setSavedStack(true)
    }

    loadLocalStack()

    return () => {
      setSavedStack(false)
    }
  }, [])

  return (
    <Button onClick={onDownload} disabled={!!savedStack || isPending} className="space-x-2">
      <span>Download</span>
      {isPending && <Loading />}
    </Button>
  )
}
