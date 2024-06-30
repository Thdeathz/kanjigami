'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { AiFillPlusCircle } from 'react-icons/ai'
import { toast } from 'sonner'

import { IGameStackRequest } from '@/@types/stack'
import EditGameStackModal from '@/components/admin/stacks/edit-game-stack-modal'
import { Button } from '@/components/ui/button'
import { SectionDivider } from '@/components/ui/separator'
import { editGameStack } from '@/server/actions/stack'

type Props = {
  availableWords: number
  stackSlug: string
  currentGames?: IGameStackRequest[]
}

export default function EditGameStack({ availableWords, stackSlug, currentGames }: Props) {
  const router = useRouter()
  const [gameStacks, setGameStacks] = useState<IGameStackRequest[]>(currentGames ?? [])
  const [isPending, startTransition] = useTransition()

  const onAddGame = () => {
    setGameStacks((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        game: {
          id: '',
          name: '',
          image: ''
        },
        numberOfWords: 0,
        timeLimit: 0
      }
    ])
  }

  const onSubmit = () => {
    if (gameStacks.length === 0) {
      toast.error('Please add at least one game')
      return
    }

    setGameStacks((prev) => prev.filter((gameStack) => gameStack.game.id !== ''))

    startTransition(async () => {
      try {
        await editGameStack(
          stackSlug,
          gameStacks.filter((gameStack) => gameStack.game.id !== '')
        )

        toast.success('Game stack updated successfully.')
        router.refresh()
      } catch (error) {
        toast.error('Failed to update game stack. Please try again later.')
      }
    })
  }

  return (
    <div className="mx-auto max-w-[80rem]">
      <SectionDivider title="Games" />

      <div className="mt-4 grid grid-cols-5 gap-12 pr-12">
        <button
          type="button"
          className="flex-center aspect-ratio mb-[5px] h-40 w-full gap-2 rounded-md border-2 border-dashed border-border transition-colors duration-200 hover:border-border-bright"
          onClick={onAddGame}
        >
          <AiFillPlusCircle className="text-3xl" />

          <span className="select-none text-lg font-medium">Add game</span>
        </button>

        {gameStacks.map((gameStack) => (
          <div
            key={gameStack.id}
            className="group relative h-40 rounded-2xl bg-stack p-2.5 shadow-stack-light transition-transform duration-200 hover:scale-105 dark:shadow-stack-dark"
          >
            <Image
              src={gameStack.game.image !== '' ? gameStack.game.image : '/images/lock.png'}
              alt="round-item"
              width={400}
              height={300}
              className="aspect-ratio block h-full w-full rounded-lg border-[3px] border-solid border-white object-cover dark:border-default-stack"
            />

            {gameStack.game.name && (
              <div className="font-secondary absolute right-4 top-4 rounded bg-black px-2 py-[0.2rem] text-sm font-semibold uppercase text-white">
                {gameStack.game.name}
              </div>
            )}

            <div className="flex-center invisible absolute left-0 top-0 z-10 h-full w-full flex-col gap-4 opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:visible group-hover:bg-underlay group-hover:opacity-100">
              <EditGameStackModal
                availableWords={availableWords}
                allGames={gameStacks}
                currentGame={gameStack}
                setAllGames={setGameStacks}
              />
              {/* <Button type="button">Delete</Button> */}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 flex justify-end">
        <Button
          type="button"
          variant="primary"
          disabled={gameStacks.length === 0}
          isLoading={isPending}
          onClick={onSubmit}
        >
          Save change
        </Button>
      </div>
    </div>
  )
}
