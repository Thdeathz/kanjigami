'use client'

import { useEffect } from 'react'
import Confetti from 'react-confetti'
import { toast } from 'sonner'
import { useWindowSize } from 'usehooks-ts'

type Props = {
  success?: string
  canceled?: string
}

export default function SuccessToast({ success, canceled }: Props) {
  const { width, height } = useWindowSize()

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

  if (success === 'true')
    return <Confetti numberOfPieces={800} gravity={0.05} recycle={false} width={width} height={height} />

  return null
}
