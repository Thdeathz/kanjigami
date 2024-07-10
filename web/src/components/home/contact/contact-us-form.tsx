'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormField, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { ReportSchema } from '@/schema/report-schema'
import { addNewReport } from '@/server/actions/user'

export default function ContactUsForm() {
  const form = useForm<z.infer<typeof ReportSchema>>({
    resolver: zodResolver(ReportSchema),
    defaultValues: {
      comment: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof ReportSchema>) => {
    try {
      await addNewReport(data.comment)

      toast.success('We have received your report !')
      form.reset()
    } catch (error) {
      toast.error('Failed to submit report')
    }
  }

  return (
    <div className="mx-auto max-w-[30rem]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <>
                <FormLabel className="font-secondary mb-1 text-lg font-medium">Tell us more about your バグ</FormLabel>

                <Textarea
                  className="min-h-[15rem]"
                  placeholder="Note: Comment must be at least 30 characters"
                  {...field}
                />

                <div className="mt-0.5 h-[1.2rem]">
                  <FormMessage />
                </div>
              </>
            )}
          />

          <div className="flex-center">
            <Button type="submit" className="mt-2" variant="primary">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
