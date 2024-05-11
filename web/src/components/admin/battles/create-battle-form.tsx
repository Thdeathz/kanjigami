'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiFillPlusCircle } from 'react-icons/ai'
import { toast } from 'sonner'
import * as z from 'zod'

import { INewRound } from '@/@types/battle'
import BattleDetailsForm from '@/components/admin/battles/battles-detail-form'
import NewRoundItem from '@/components/admin/battles/new-round-item'
import SectionTitle from '@/components/admin/section-title'
import Loading from '@/components/loading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { SectionDivider } from '@/components/ui/separator'
import { useCreateNewBattleMutation } from '@/data/battle'
import { BattleDetailsSchema } from '@/schema/admin/battle-schema'

export default function CreateBattleForm() {
  // const [value, setValue, removeValue] = useLocalStorage<ICreateBattle>('create-new-event-form', {
  //   details: {
  //     title: '',
  //     description: '',
  //     maxPlayer: '',
  //     startAt: ''
  //   },
  //   rounds: []
  // })
  const { mutateAsync, isPending } = useCreateNewBattleMutation()

  const [rounds, setRounds] = useState<INewRound[]>([])

  const form = useForm<z.infer<typeof BattleDetailsSchema>>({
    resolver: zodResolver(BattleDetailsSchema),
    defaultValues: {
      title: '',
      description: '',
      maxPlayer: '',
      startAt: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof BattleDetailsSchema>) => {
    if (rounds.find((round) => !round.gameStack)) {
      toast.error('Please select a stack for all rounds.')
      return
    }

    try {
      await mutateAsync({
        ...data,
        startAt: new Date(data.startAt).toUTCString(),
        rounds: rounds.map((round) => ({
          index: round.index,
          gameStackId: round.gameStack?.games.find((game) => game.active)?.id ?? ''
        }))
      })
      // removeValue()
      // form.reset()
      // setRounds([])
      toast.success('Battle created successfully.')
    } catch (error) {
      toast.error('Something went wrong. Please try again later.')
    }
  }

  const onAddNewRound = () => {
    if (rounds.length >= 20) {
      toast.success('You can only add up to 20 rounds per battle.')
      return
    }

    setRounds((prev) => [
      ...prev,
      {
        index: rounds.length + 1
      }
    ])
  }

  // useUnmount(() => {
  //   setValue({
  //     details: form.getValues(),
  //     rounds
  //   })
  // })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-[80rem] space-y-6">
        <SectionDivider title="Battle Details" />

        <div className="grid grid-cols-2 gap-12">
          <div className="flex flex-col">
            <SectionTitle title="Game mode" />

            <div className="grid h-full grid-cols-2 gap-4">
              <div className="flex h-full cursor-pointer flex-col justify-between rounded-xl border-2 border-default-green bg-primary-title p-6 font-medium transition-colors hover:bg-primary-title-light">
                <div>
                  <Badge variant="ONGOING" className="mb-4">
                    CODE GOLF
                  </Badge>

                  <p className="font-secondary text-sm">
                    The classic mode where the players with the shortest code and a 100% match win!
                  </p>
                </div>

                <p className="font-secondary text-sm">Recommended for big battles (more than 24 hours)</p>
              </div>
            </div>
          </div>

          <BattleDetailsForm form={form} />
        </div>

        <SectionDivider title="Rounds" />

        <div>
          <SectionTitle title="Note: The kanjis stack you add for each round remain inaccessible to everyone until round start." />

          <div className="grid grid-cols-5 gap-12 pr-12">
            <button
              type="button"
              className="flex-center aspect-ratio mb-[5px] h-40 w-full gap-2 rounded-md border-2 border-dashed border-border transition-colors duration-200 hover:border-border-bright"
              onClick={onAddNewRound}
            >
              <AiFillPlusCircle className="text-3xl" />

              <span className="select-none text-lg font-medium">Add Round</span>
            </button>

            {rounds.map((round) => (
              <NewRoundItem key={round.index} round={round} setRounds={setRounds} />
            ))}
          </div>
        </div>

        <div className="flex w-full justify-end">
          <Button variant="primary" type="submit" disabled={isPending}>
            Create battle {isPending && <Loading className="ml-2" />}
          </Button>
        </div>
      </form>
    </Form>
  )
}
