'use client'

// Error components must be Client Components

import { useEffect } from 'react'

import { Button } from '@/components/ui/button'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex-center font-secondary min-h-content flex-col gap-4 p-8 text-xl font-medium lg:p-12">
      <h2>Something went wrong!</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}
