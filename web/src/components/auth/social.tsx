'use client'

import { FcGoogle } from 'react-icons/fc'

import { Button } from '@/components/ui/button'
import { useLoginWithSocialMutation } from '@/data/auth'

export const Social = () => {
  const { mutateAsync } = useLoginWithSocialMutation()

  const onClick = async (provider: 'google' | 'facebook') => {
    await mutateAsync(provider)
  }

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button className="w-full" onClick={() => onClick('google')}>
        <FcGoogle className="h-5 w-5" />
        <span className="ml-2">Sign in with Google</span>
      </Button>
    </div>
  )
}
