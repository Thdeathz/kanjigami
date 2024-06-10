import { IWordItem } from '@/@types/stack'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

import WordDetail from './word-detail'

type Props = {
  word: IWordItem
  isOpen?: boolean
}

export default function WordItem({ word, isOpen = false }: Props) {
  return (
    <Dialog defaultOpen={isOpen}>
      <DialogTrigger asChild>
        <Button>{word.content}</Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] xl:w-[70rem]">
        <DialogHeader>
          <DialogTitle>{word.content}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[60vh] p-8">
          <WordDetail wordId={word.id} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
