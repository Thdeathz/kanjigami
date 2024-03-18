'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
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
    router.push(DEFAULT_LOGIN_REDIRECT)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="superman@example.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="******" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="my-2 mb-2 flex w-full items-center justify-end">
          <Button type="button" variant="link">
            <Link href="/forgot-password">Forgot password ?</Link>
          </Button>
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? <Loading /> : 'Login'}
        </Button>
      </form>
    </Form>
  )
}
