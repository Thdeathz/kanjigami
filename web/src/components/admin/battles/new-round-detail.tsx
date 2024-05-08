import Image from 'next/image'
import React, { useState } from 'react'
import { useDebounceCallback } from 'usehooks-ts'

import { ISearchStackResult } from '@/@types/stack'
import InputSearch from '@/components/home/input-search'
import Loading from '@/components/loading'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useAdminSearchStackMutation } from '@/data/stack'

import GameItem from './game-item'

function DetailItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-7 items-start gap-2">
      <div className="col-span-3 bg-table-header px-2 font-medium">{label}</div>
      <div className="col-span-4">{value}</div>
    </div>
  )
}

type StackDetailProps = {
  stack?: ISearchStackResult
  onSelectGame: (gameStack: ISearchStackResult) => void
}

function StackDetail({ stack, onSelectGame }: StackDetailProps) {
  const [selected, setSelected] = useState<ISearchStackResult['games'][0] | null>(
    stack?.games.find((each) => each.active) ?? null
  )

  const handleSelectGame = (selectedStack: ISearchStackResult, game: ISearchStackResult['games'][0]) => {
    setSelected(game)

    onSelectGame({
      ...selectedStack,
      games: selectedStack.games.map((e) => ({ ...e, active: e.id === game.id }))
    })
  }

  if (!stack) return null

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 grid grid-cols-2 gap-2">
        <Image src={stack.image} alt={stack.name} width={400} height={300} className="w-full rounded-md object-cover" />
        <div className="space-y-2">
          <DetailItem label="Stack name" value={stack.name} />
          <DetailItem label="Topics" value={stack.topics.map((each) => each.name).join(', ')} />
          <DetailItem label="Number words" value={`${stack.numberWords} 🚀`} />
          <DetailItem label="Number followed" value={`${stack.numberFollowed} ❤️`} />
        </div>
      </div>

      <div className="space-y-6">
        {stack.games.map((each) => (
          <GameItem
            key={each.id}
            name={each.game.name}
            image={each.game.image}
            onClick={() => handleSelectGame(stack, each)}
            active={each.active || each.id === selected?.id}
          />
        ))}
      </div>
    </div>
  )
}

type Props = {
  defaultStack?: ISearchStackResult
  onSelectGame: (gameStack: ISearchStackResult) => void
}

export default function NewRoundDetail({ defaultStack, onSelectGame }: Props) {
  const { mutateAsync, data: stack, isPending, isSuccess } = useAdminSearchStackMutation()

  const onSearch = async (value: string) => {
    if (value.trim() === '') return

    await mutateAsync(value)
  }

  const debounced = useDebounceCallback(onSearch, 500)

  return (
    <>
      <DialogHeader>
        <DialogTitle>{stack?.name ?? defaultStack?.name ?? 'Something new'}</DialogTitle>
      </DialogHeader>

      <div className="p-8">
        <InputSearch
          placeholder="面白い動画 。。。"
          defaultValue={defaultStack?.name}
          onChange={(e) => debounced(e.target.value)}
        />
        <div className="mt-6 min-h-[20rem]">
          {isPending ? (
            <Loading className="text-2xl" />
          ) : stack || (defaultStack && !isSuccess) ? (
            <StackDetail stack={stack ?? defaultStack} onSelectGame={onSelectGame} />
          ) : (
            <div className="w-full text-center font-medium opacity-50">No stack found</div>
          )}
        </div>
      </div>
    </>
  )
}
