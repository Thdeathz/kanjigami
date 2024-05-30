'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'

type Props = {
  success?: string
  canceled?: string
}

export default function SuccessToast({ success, canceled }: Props) {
  useEffect(() => {
    const handleShowToast = () => {
      if (success === 'true') {
        toast.success('Payment successful! 🎉', {
          id: 'success-toast'
        })
      }

      if (canceled === 'true') {
        toast.error('Payment failed! 😢', {
          id: 'error-toast'
        })
      }
    }

    handleShowToast()
  }, [])

  return null
}
