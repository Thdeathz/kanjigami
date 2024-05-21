'use client'

import { useEffect, useState } from 'react'

const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState<boolean>(true)

  useEffect(() => {
    const handleSetStatus = () => {
      if (typeof window !== 'undefined') {
        setIsOnline(navigator.onLine)
      }
    }

    handleSetStatus()

    return () => {
      setIsOnline(true)
    }
  }, [])

  return { isOnline }
}

export default useIsOnline
