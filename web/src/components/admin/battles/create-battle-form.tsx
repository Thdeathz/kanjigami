'use client'

import { useForm } from 'react-hook-form'
import { AiFillPlusCircle } from 'react-icons/ai'

import BattleDetailsForm from '@/components/admin/battles/battles-detail-form'
import NewRoundItem from '@/components/admin/battles/new-round-item'
import SectionTitle from '@/components/admin/section-title'
import { Form } from '@/components/ui/form'
import { SectionDivider } from '@/components/ui/separator'

export default function CreateBattleForm() {
  const form = useForm()

  return (
    <Form {...form}>
      <form className="mx-auto w-[80rem] space-y-6">
        <SectionDivider title="Battle Details" />

        <div className="grid grid-cols-2 gap-12">
          <div>
            <SectionTitle title="Game mode" />
          </div>

          <BattleDetailsForm />
        </div>

        <SectionDivider title="Rounds" />

        <div>
          <SectionTitle title="Note: The kanjis stack you add for each round remain inaccessible to everyone until round start." />

          <div className="grid grid-cols-5 gap-12 pr-12">
            <button
              type="button"
              className="flex-center aspect-ratio mb-[5px] h-40 w-full gap-2 rounded-md border-2 border-dashed border-border transition-colors duration-200 hover:border-border-bright"
            >
              <AiFillPlusCircle className="text-3xl" />

              <span className="select-none text-lg font-medium">Add Round</span>
            </button>

            <NewRoundItem />
          </div>
        </div>
      </form>
    </Form>
  )
}
