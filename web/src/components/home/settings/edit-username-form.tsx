import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormField, FormInput } from '@/components/ui/form'
import { EditUsernameSchema } from '@/schema/user-profile-schema'

export default function EditUsernameForm() {
  const form = useForm<z.infer<typeof EditUsernameSchema>>({
    resolver: zodResolver(EditUsernameSchema),
    defaultValues: {
      name: ''
    }
  })

  return (
    <Form {...form}>
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
                <Link href="/player" className="text-default-link underline">
                  http://localhost:3000/player/thdeathz
                </Link>
              </div>
            }
            prefix="kanjigami.play/player/"
            value="thdeathz"
          />
        )}
      />

      <Button type="submit" variant="primary" disabled>
        Save Username (Edit username above to enable this button)
      </Button>
    </Form>
  )
}
