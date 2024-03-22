'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormField, FormInput } from '@/components/ui/form'
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => <FormInput label="Nickname" {...field} placeholder="superman" type="name" />}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => <FormInput label="Email" {...field} placeholder="email" />}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => <FormInput label="Password" {...field} placeholder="password" type="password" />}
        />

        <Button type="submit" className="mt-2 w-full">
          Register
        </Button>
      </form>
    </Form>
  )
}
