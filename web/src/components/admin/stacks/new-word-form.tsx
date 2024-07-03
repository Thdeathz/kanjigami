import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { toast } from 'sonner'
import * as z from 'zod'

import { ICreateWordRequest } from '@/@types/stack'
import NewExampleForm from '@/components/admin/stacks/new-example-form'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormInput } from '@/components/ui/form'
import { SectionDivider } from '@/components/ui/separator'
import useUploadImage from '@/hooks/use-upload-image'
import { NewWordSchema } from '@/schema/admin/stack-schema'

type Props = {
  setWords: React.Dispatch<React.SetStateAction<ICreateWordRequest[]>>
}

export default function NewWordForm({ setWords }: Props) {
  const form = useForm<z.infer<typeof NewWordSchema>>({
    resolver: zodResolver(NewWordSchema),
    defaultValues: {
      content: '',
      hiragana: '',
      romaji: '',
      meaning: ''
    }
  })
  const [image, handleFileChange, resetImage] = useUploadImage()
  const [examples, setExamples] = useState<ICreateWordRequest['examples']>([])

  const onSubmit = (data: z.infer<typeof NewWordSchema>) => {
    if (!image) {
      toast.error('Please upload word image')
      return
    }

    if (examples.length === 0) {
      toast.error('Please add examples')
      return
    }

    setWords((prev) => [...prev, { id: prev.length + 1, ...data, image, examples }])
    form.reset()
    setExamples([])
    resetImage()
  }

  return (
    <>
      <Form {...form}>
        <form id="word-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="image"
            render={() => (
              <FormInput
                label="Image"
                type="file"
                className="flex flex-col"
                inputClass="w-min"
                accept=".png, .jpg, .jpeg, .webp"
                onChange={handleFileChange}
              />
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => <FormInput label="Word" {...field} />}
          />

          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="hiragana"
              render={({ field }) => <FormInput label="Hiragana" {...field} />}
            />

            <FormField
              control={form.control}
              name="romaji"
              render={({ field }) => <FormInput label="Romaji" {...field} />}
            />
          </div>

          <FormField
            control={form.control}
            name="meaning"
            render={({ field }) => <FormInput label="Meaning" {...field} />}
          />
        </form>
      </Form>

      <SectionDivider title="Examples" className="mb-4" />

      <NewExampleForm examples={examples} setExamples={setExamples} />

      <Button variant="link" type="submit" form="word-form">
        <FaArrowLeftLong className="mr-2" /> Add new word
      </Button>
    </>
  )
}
