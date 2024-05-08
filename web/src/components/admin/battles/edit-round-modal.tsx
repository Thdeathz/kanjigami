import React from 'react'

import { ISearchStackResult } from '@/@types/stack'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import NewRoundDetail from './new-round-detail'

type Props = {
  defaultStack?: ISearchStackResult
  onSelectGame: (gameStack: ISearchStackResult) => void
}

export default function EditRoundModal({ defaultStack, onSelectGame }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">Edit</Button>
      </DialogTrigger>
      <DialogContent className="w-[70rem]">
        <NewRoundDetail defaultStack={defaultStack} onSelectGame={onSelectGame} />
      </DialogContent>
    </Dialog>
  )
}
