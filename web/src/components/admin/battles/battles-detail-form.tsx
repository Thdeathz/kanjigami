import { FormField, FormInput } from '@/components/ui/form'

export default function BattleDetailsForm() {
  return (
    <div>
      <FormField
        // control={form.control}
        name="title"
        render={({ field }) => <FormInput label="Title" {...field} placeholder="An awesome battle" />}
      />

      <FormField name="description" render={({ field }) => <FormInput label="Description" {...field} />} />

      <div className="grid grid-cols-3 gap-6">
        <FormField
          name="maxPlayer"
          render={({ field }) => <FormInput label="Max player" type="number" min={0} max={100} {...field} />}
        />

        <FormField
          name="startAt"
          render={({ field }) => <FormInput label="Start at" type="date" className="col-span-2" {...field} />}
        />
      </div>
    </div>
  )
}
