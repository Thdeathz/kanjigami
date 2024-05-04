import { useForm } from 'react-hook-form'
import { FaArrowLeftLong } from 'react-icons/fa6'

import { Button } from '@/components/ui/button'
import { Form, FormField, FormInput } from '@/components/ui/form'

export default function NewExampleForm() {
  const form = useForm()

  return (
    <Form {...form}>
      <FormField name="example" render={({ field }) => <FormInput label="Example" {...field} />} />

      <FormField name="romaji" render={({ field }) => <FormInput label="Romaji" {...field} />} />

      <FormField name="meaning" render={({ field }) => <FormInput label="Meaning" {...field} />} />

      <Button variant="link" disabled>
        <FaArrowLeftLong className="mr-2" /> Add new word
      </Button>
    </Form>
  )
}
