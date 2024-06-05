import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormInput } from '@/components/ui/form'
import { useUpdateUsernameMutation } from '@/data/user'
import { EditUsernameSchema } from '@/schema/user-profile-schema'

type Props = {
  currentUsername: string
}

export default function EditUsernameForm({ currentUsername }: Props) {
  const { mutateAsync, isPending } = useUpdateUsernameMutation()

  const form = useForm<z.infer<typeof EditUsernameSchema>>({
    resolver: zodResolver(EditUsernameSchema),
    defaultValues: {
      name: currentUsername
    }
  })

  const onSubmit = async (data: z.infer<typeof EditUsernameSchema>) => {
    try {
      await mutateAsync(data.name)

      toast.success('Username updated successfully')
      window.location.reload()
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong. Please try again later.')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormInput
              label="Username (Your own sweet profile page)"
              {...field}
              placeholder="superman"
              helperText={
                <div>
                  Your profile page:{' '}
                  <Link href={`/player/${currentUsername}`} className="text-default-link underline">
                    https://kanjigami.pro/player/{currentUsername}
                  </Link>
                </div>
              }
              maxLength={15}
              prefix="kanjigami.play/player/"
            />
          )}
        />

        <Button
          type="submit"
          variant="primary"
          disabled={!form.getValues('name') || form.getValues('name') === currentUsername || isPending}
        >
          {isPending ? <Loading /> : 'Save Username (Edit username above to enable this button)'}
        </Button>
      </form>
    </Form>
  )
}
