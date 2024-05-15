import { useForm } from 'react-hook-form'
import { FaPlus } from 'react-icons/fa'

import NewExampleForm from '@/components/admin/stacks/new-example-form'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormInput } from '@/components/ui/form'
import { SectionDivider } from '@/components/ui/separator'

export default function NewWordForm() {
  const form = useForm()

  return (
    <Form {...form}>
      <form>
        <FormField
          name="image"
          render={({ field }) => (
            <FormInput label="Image" type="file" className="flex flex-col" inputClass="w-min" {...field} />
          )}
        />

        <FormField name="word" render={({ field }) => <FormInput label="Word" {...field} />} />

        <div className="grid grid-cols-2 gap-6">
          <FormField name="hiragana" render={({ field }) => <FormInput label="Hiragana" {...field} />} />

          <FormField name="romaji" render={({ field }) => <FormInput label="Romaji" {...field} />} />
        </div>

        <FormField name="meaning" render={({ field }) => <FormInput label="Meaning" {...field} />} />

        <SectionDivider title="Examples" className="mb-4" />

        <div className="mb-2 flex items-center gap-2">
          <Button shape="circle" variant="outline" type="button" className="border-2 border-dashed">
            <FaPlus />
          </Button>

          <Button shape="circle" type="button">
            1
          </Button>

          <Button shape="circle" type="button">
            2
          </Button>

          <Button shape="circle" type="button">
            3
          </Button>
        </div>

        <NewExampleForm />
      </form>
    </Form>
  )
}
