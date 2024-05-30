'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormField, FormInput } from '@/components/ui/form'
import { useLoginMutation } from '@/data/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { LoginSchema } from '@/schema/auth-schema'

import Loading from '../loading'

export default function LoginForm() {
  const router = useRouter()
  const { mutateAsync, isPending } = useLoginMutation()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    const response = await mutateAsync(data)
    if (response?.error) {
      toast.error(response.error, {
        position: 'top-center'
      })

      form.setError('email', {
        type: 'manual',
        message: ''
      })

      form.setError('password', {
        type: 'manual',
        message: ''
      })

      return
    }

    form.reset()
    toast.success('Login successful')
    window.location.href = DEFAULT_LOGIN_REDIRECT
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => <FormInput label="Email" {...field} placeholder="superman@example.com" />}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => <FormInput label="Password" {...field} placeholder="******" type="password" />}
        />

        <div className="flex w-full items-center justify-end">
          <Button type="button" variant="link">
            <Link href="/forgot-password">Forgot password ?</Link>
          </Button>
        </div>

        <Button type="submit" variant="primary" className="w-full" disabled={isPending}>
          {isPending ? <Loading /> : 'Login'}
        </Button>
      </form>
    </Form>
  )
}
