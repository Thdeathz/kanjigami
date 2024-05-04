import { FormField, FormInput } from '@/components/ui/form'

export default function StackDetailsForm() {
  return (
    <form>
      <FormField
        // control={form.control}
        name="title"
        render={({ field }) => <FormInput label="Title" {...field} placeholder="An awesome stack" />}
      />

      <FormField name="description" render={({ field }) => <FormInput label="Description" {...field} />} />

      <FormField name="topic" render={({ field }) => <FormInput label="Topic" {...field} />} />

      <FormField
        name="thumbnail"
        render={({ field }) => (
          <FormInput
            label="Thumbnail"
            type="file"
            className="flex flex-col"
            inputClass="w-min"
            accept=".png,.jpg,.jpeg"
            {...field}
          />
        )}
      />
    </form>
  )
}
