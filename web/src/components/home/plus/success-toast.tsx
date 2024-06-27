'use client'

import { useEffect } from 'react'
import Confetti from 'react-confetti'
import { toast } from 'sonner'
import { useWindowSize } from 'usehooks-ts'

import { checkoutSuccess } from '@/server/actions/plus'

type Props = {
  success?: string
  canceled?: string
  isPlus?: boolean
  userId?: string
}

export default function SuccessToast({ success, canceled, isPlus = false, userId }: Props) {
  const { width, height } = useWindowSize()

  useEffect(() => {
    const handleShowToast = async () => {
      if (success === 'true' && userId) {
        await checkoutSuccess(userId)
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

  if (success === 'true' || isPlus)
    return <Confetti numberOfPieces={800} gravity={0.05} recycle={false} width={width} height={height} />

  return null
}
