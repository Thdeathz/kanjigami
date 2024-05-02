'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function useQueryParams() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const onSearch = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const onHardSearch = (key: string, value: string) => {
    const params = new URLSearchParams()

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return {
    onSearch,
    onHardSearch
  }
}
