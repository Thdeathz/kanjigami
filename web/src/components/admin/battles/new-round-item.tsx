import Image from 'next/image'
import React from 'react'

import { INewRound } from '@/@types/battle'
import { ISearchStackResult } from '@/@types/stack'
import EditRoundModal from '@/components/admin/battles/edit-round-modal'
import { Button } from '@/components/ui/button'

type Props = {
  round: INewRound
  setRounds: React.Dispatch<React.SetStateAction<INewRound[]>>
}

export default function NewRoundItem({ round, setRounds }: Props) {
  const onRemoveRound = () => {
    setRounds((prev) => prev.filter((r) => r.index !== round.index))
  }

  const onSelectGame = (gameStack: ISearchStackResult) => {
    setRounds((prev) =>
      prev.map((r) => {
        if (r.index === round.index) {
          return { ...r, gameStack }
        }
        return r
      })
    )
  }

  return (
    <div className="group relative h-40 rounded-2xl bg-stack p-2.5 shadow-stack-light transition-transform duration-200 hover:scale-105 dark:shadow-stack-dark">
      <Image
        src={round.gameStack?.games.find((each) => each.active)?.game.image ?? '/images/lock.png'}
        alt="round-item"
        width={400}
        height={300}
        className="aspect-ratio block h-full w-full rounded-lg border-[3px] border-solid border-white object-cover dark:border-default-stack"
      />

      {round.gameStack && (
        <div className="font-secondary absolute right-4 top-4 rounded bg-black px-2 py-[0.2rem] text-sm font-semibold uppercase text-white">
          #{round.gameStack?.slug}
        </div>
      )}

      <div className="flex-center invisible absolute left-0 top-0 z-10 h-full w-full flex-col gap-4 opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:visible group-hover:bg-underlay group-hover:opacity-100">
        <EditRoundModal defaultStack={round.gameStack} onSelectGame={onSelectGame} />

        <Button type="button" onClick={onRemoveRound}>
          Delete
        </Button>
      </div>
    </div>
  )
}
