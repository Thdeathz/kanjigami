'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormInput } from '@/components/ui/form'
import { useForgotPasswordMutation } from '@/data/auth'
import { ForgotPasswordSchema } from '@/schema/auth-schema'

export default function ForgotPasswordForm() {
  const { mutateAsync } = useForgotPasswordMutation()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
    startTransition(async () => {
      const response = await mutateAsync(data)
      if (response?.error) {
        form.setError('email', {
          type: 'manual',
          message: response.error
        })
        return
      }
      form.reset()
      toast.success('Reset password email sent')
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => <FormInput label="Email" {...field} placeholder="superman@example.com" type="email" />}
        />

        <Button disabled={isPending} type="submit" className="mt-2 w-full">
          {isPending ? <Loading /> : 'Send reset password email'}
        </Button>
      </form>
    </Form>
  )
}
