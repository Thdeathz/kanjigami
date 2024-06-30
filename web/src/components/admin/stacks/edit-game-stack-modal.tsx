/* eslint-disable sonarjs/no-duplicate-string */

'use client'

import { DialogTitle } from '@radix-ui/react-dialog'
import React from 'react'
import { toast } from 'sonner'

import { IGame } from '@/@types/game'
import { IGameStackRequest } from '@/@types/stack'
import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useGetAllGamesQuery } from '@/data/game'

import GameItem from '../battles/game-item'

type Props = {
  availableWords: number
  allGames?: IGameStackRequest[]
  currentGame: IGameStackRequest
  setAllGames: React.Dispatch<React.SetStateAction<IGameStackRequest[]>>
}

function EditGameStack({ availableWords, allGames, currentGame, setAllGames }: Props) {
  const { data: games, isLoading } = useGetAllGamesQuery()
  const handleSelectGame = (game: IGame) => {
    if (game.name === 'Blind Flip Card' && availableWords < 12) {
      toast.error('You need at least 12 words to play Blind Flip Card.')
      return
    }

    if (game.name === 'Multiple Choice' && availableWords < 10) {
      toast.error('You need at least 10 words to play Multiple Choice.')
      return
    }

    if (game.name === 'Kanji Shooter' && availableWords < 50) {
      toast.error('You need at least 50 words to play Kanji Shooter.')
      return
    }

    setAllGames((prev) => {
      return prev.map((each) => {
        if (each.id === currentGame.id) {
          return {
            ...each,
            game,
            numberOfWords: game.name === 'Blind Flip Card' ? 12 : 100,
            timeLimit: 300
          }
        }
        return each
      })
    })
  }

  const handleChangeTimeLimit = (timeLimit: number) => {
    setAllGames((prev) => {
      return prev.map((each) => {
        if (each.id === currentGame.id) {
          return {
            ...each,
            timeLimit
          }
        }
        return each
      })
    })
  }

  const handleChangeNumberOfWords = (numberOfWords: number) => {
    setAllGames((prev) => {
      return prev.map((each) => {
        if (each.id === currentGame.id) {
          return {
            ...each,
            numberOfWords
          }
        }
        return each
      })
    })
  }

  if (!games || isLoading) {
    return <Loading />
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-6">
      <div className="space-y-2">
        {games.map((game) => (
          <GameItem
            key={game.id}
            name={game.name}
            image={game.image}
            disabled={!!allGames?.find((each) => each.game.id === game.id)}
            onClick={() => handleSelectGame(game)}
            active={currentGame?.game.id === game.id}
          />
        ))}
      </div>

      <form className="grid grid-cols-2 gap-4">
        <div>
          <p className="mb-2 text-base font-medium">Number of words</p>
          <Input
            type="number"
            value={currentGame?.numberOfWords}
            disabled={currentGame?.game.name === 'Blind Flip Card'}
            min={10}
            max={100}
            onChange={(e) => handleChangeNumberOfWords(Number(e.target.value))}
          />
        </div>

        <div>
          <p className="mb-2 text-base font-medium">Time limit</p>
          <Input
            type="number"
            value={currentGame?.timeLimit}
            min={60}
            max={600}
            onChange={(e) => handleChangeTimeLimit(Number(e.target.value))}
          />
        </div>
      </form>
    </div>
  )
}

export default function EditGameStackModal({ availableWords, allGames, currentGame, setAllGames }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">Edit</Button>
      </DialogTrigger>
      <DialogContent className="w-[50rem]">
        <DialogHeader>
          <DialogTitle>{'Game'}</DialogTitle>
        </DialogHeader>

        <EditGameStack
          availableWords={availableWords}
          allGames={allGames}
          currentGame={currentGame}
          setAllGames={setAllGames}
        />
      </DialogContent>
    </Dialog>
  )
}
