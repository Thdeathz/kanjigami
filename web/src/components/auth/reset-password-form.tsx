'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useResetPasswordMutation } from '@/data/auth'
import { ResetPasswordSchema } from '@/schema/auth-schema'

import Loading from '../loading'
import { Button } from '../ui/button'

export default function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const router = useRouter()
  const { mutateAsync } = useResetPasswordMutation()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    startTransition(async () => {
      const response = await mutateAsync({
        token: token!,
        password: data.password
      })

      if (response?.error) {
        form.setError('password', {
          type: 'manual',
          message: response.error
        })

        return
      }

      form.reset()
      toast.success('Password reset successfully')
      router.push('/login')
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input {...field} placeholder="******" type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} type="submit" className="mt-6 w-full">
          {isPending ? <Loading /> : 'Reset password'}
        </Button>
      </form>
    </Form>
  )
}
