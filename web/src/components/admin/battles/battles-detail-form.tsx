import { UseFormReturn } from 'react-hook-form'
import * as z from 'zod'

import { FormField, FormInput } from '@/components/ui/form'
import { BattleDetailsSchema } from '@/schema/admin/battle-schema'

import SectionTitle from '../section-title'

type Props = {
  form: UseFormReturn<z.infer<typeof BattleDetailsSchema>>
}

export default function BattleDetailsForm({ form }: Props) {
  return (
    <div>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => <FormInput label="Title" {...field} placeholder="An awesome battle" />}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => <FormInput label="Description" {...field} />}
      />

      <div className="grid grid-cols-3 gap-6">
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => <FormInput label="Duration (minutes)" type="number" min={0} max={100} {...field} />}
        />

        <FormField
          control={form.control}
          name="startAt"
          render={({ field }) => <FormInput label="Start at" type="datetime-local" className="col-span-2" {...field} />}
        />
      </div>

      <SectionTitle title="Note: Duration of each round in minutes, choose based on the size of the battle you want. (should between 1 and 60 minutes)" />
    </div>
  )
}
