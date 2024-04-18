'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'

type ShowMoreButtonProps = {
  currentPage: string
}

export default function ShowMoreButton({ currentPage }: ShowMoreButtonProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleNextPage = () => {
    const params = new URLSearchParams(searchParams)

    const nextPage = Number(currentPage) + 1

    params.set('page', nextPage.toString())

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex-center">
      <Button variant="link" className="w-min" onClick={handleNextPage}>
        Show more
      </Button>
    </div>
  )
}
