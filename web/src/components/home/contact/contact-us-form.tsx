'use client'

import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

export default function ContactUsForm() {
  const form = useForm()

  return (
    <div className="mx-auto max-w-[30rem]">
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <>
                <p className="font-secondary mb-1 text-lg font-medium">Tell us more about your バグ</p>

                <Textarea placeholder="Something went wrong >.<!" {...field} />
              </>
            )}
          />

          <div className="flex-center">
            <Button type="submit" className="mt-4" variant="primary">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
