'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useRegisterMutation } from '@/data/auth'
import { RegisterSchema } from '@/schema/auth-schema'

export default function RegisterForm() {
  const router = useRouter()
  const { mutateAsync } = useRegisterMutation()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    const res = await mutateAsync(values)
    if (res?.error) {
      if (res.error.field === '') {
        toast.error(res.error.message, {
          position: 'top-center'
        })
      }

      form.setError(res.error.field as keyof z.infer<typeof RegisterSchema>, {
        type: 'manual',
        message: res.error.message
      })

      return
    }

    form.reset()
    toast.success('Registration successfully')
    router.push('/login')
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nickname</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="superman" type="name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="email" />
                </FormControl>
                <FormMessage defaultValue="x" />
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
                  <Input {...field} placeholder="password" type="password" />
                </FormControl>
                <FormMessage defaultValue="x" />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
    </Form>
  )
}
