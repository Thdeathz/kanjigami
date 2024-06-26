'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'

interface BackButtonProps {
  label: string
  href: string
}

export const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <div className="flex-center mt-2 w-full">
      <Button size="sm" className="w-min whitespace-nowrap font-normal" variant="link">
        <Link href={href}>{label}</Link>
      </Button>
    </div>
  )
}
