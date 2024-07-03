'use client'

import { ICreateWordRequest } from '@/@types/stack'
import { Button } from '@/components/ui/button'

type Props = {
  words: ICreateWordRequest[]
}

export default function NewWordsList({ words }: Props) {
  if (words.length === 0) {
    return <p className="font-medium opacity-60">No word has been added.</p>
  }

  return (
    <>
      {words.map((word) => (
        <Button type="button" key={word.id}>
          {word.content}
        </Button>
      ))}
    </>
  )
}
