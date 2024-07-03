/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import * as z from 'zod'

import { Form, FormField, FormInput } from '@/components/ui/form'
import { StackDetailsSchema } from '@/schema/admin/stack-schema'

type Props = {
  form: UseFormReturn<z.infer<typeof StackDetailsSchema>, any, undefined>
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (data: z.infer<typeof StackDetailsSchema>) => void
}

export default function StackDetailsForm({ form, handleFileChange, onSubmit }: Props) {
  return (
    <Form {...form}>
      <form id="stack-detail-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => <FormInput label="Name" {...field} placeholder="An awesome stack" />}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => <FormInput label="Description" {...field} />}
        />

        <FormField control={form.control} name="topic" render={({ field }) => <FormInput label="Topic" {...field} />} />

        <FormField
          name="thumbnail"
          render={() => (
            <FormInput
              label="Thumbnail"
              type="file"
              className="flex flex-col"
              inputClass="w-min"
              accept=".png, .jpg, .jpeg, .webp"
              onChange={handleFileChange}
            />
          )}
        />
      </form>
    </Form>
  )
}
