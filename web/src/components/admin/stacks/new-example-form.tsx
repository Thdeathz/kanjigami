import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { FaPlus } from 'react-icons/fa'
import * as z from 'zod'

import { INewWordExampleRequest } from '@/@types/stack'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormInput } from '@/components/ui/form'
import { NewExampleSchema } from '@/schema/admin/stack-schema'

type Props = {
  examples: INewWordExampleRequest[]
  setExamples: React.Dispatch<React.SetStateAction<INewWordExampleRequest[]>>
}

export default function NewExampleForm({ examples, setExamples }: Props) {
  const form = useForm<z.infer<typeof NewExampleSchema>>({
    resolver: zodResolver(NewExampleSchema),
    defaultValues: {
      content: '',
      romaji: '',
      meaning: ''
    }
  })

  const onSubmit = (data: z.infer<typeof NewExampleSchema>) => {
    setExamples((prev) => [...prev, { id: prev.length + 1, ...data }])
    form.reset()
  }

  return (
    <>
      <div className="mb-2 flex items-center gap-2">
        <Button
          shape="circle"
          variant="outline"
          type="button"
          className="border-2 border-dashed"
          onClick={form.handleSubmit(onSubmit)}
        >
          <FaPlus />
        </Button>

        {examples?.map((each) => (
          <Button type="button" shape="circle" key={each.id}>
            {each.id}
          </Button>
        ))}
      </div>

      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => <FormInput label="Example" {...field} />}
          />

          <FormField
            control={form.control}
            name="romaji"
            render={({ field }) => <FormInput label="Romaji" {...field} />}
          />

          <FormField
            control={form.control}
            name="meaning"
            render={({ field }) => <FormInput label="Meaning" {...field} />}
          />
        </form>
      </Form>
    </>
  )
}
